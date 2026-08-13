import type { Product, Category } from '~~/server/database/schema'

export interface AdminProduct extends Omit<Product, 'mainImage'> {
  image: string
  category?: Category
  extraImages?: string[]
}

export const useAdminProducts = () => {
  const products = ref<AdminProduct[]>([])
  const product = ref<AdminProduct | null>(null)
  const categories = ref<Category[]>([])
  
  const isLoading = ref(false)
  const error = ref<any>(null)
  
  const toast = useToast()

  const fetchCategories = async () => {
    try {
      const { data } = await $fetch<{ success: boolean; data: Category[] }>('/api/admin/categories')
      categories.value = data
    } catch (err: any) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const fetchProducts = async (filters?: { categoryId?: number; search?: string; isAvailable?: boolean }) => {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await $fetch<{ success: boolean; data: AdminProduct[] }>('/api/admin/products', {
        query: filters
      })
      products.value = data
    } catch (err: any) {
      error.value = err
      toast.add({ title: 'Gagal', description: 'Gagal memuat daftar produk', color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  const fetchProduct = async (id: number) => {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await $fetch<{ success: boolean; data: AdminProduct }>(`/api/admin/products/${id}`)
      product.value = data
      return data
    } catch (err: any) {
      error.value = err
      toast.add({ title: 'Gagal', description: 'Gagal memuat data produk', color: 'error' })
      return null
    } finally {
      isLoading.value = false
    }
  }

  const createProduct = async (payload: any) => {
    try {
      await $fetch('/api/admin/products', {
        method: 'POST',
        body: payload
      })
      toast.add({ title: 'Berhasil', description: 'Produk baru disimpan', color: 'success' })
      await fetchProducts()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  const updateProduct = async (id: number, payload: any) => {
    try {
      await $fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        body: payload
      })
      toast.add({ title: 'Berhasil', description: 'Produk diperbarui', color: 'success' })
      await fetchProducts()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      await $fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
      })
      toast.add({ title: 'Berhasil', description: 'Produk dihapus permanen', color: 'success' })
      // Pembaruan state lokal secara parsial & sinkronisasi ulang agar UI langsung terbarui tanpa refresh
      products.value = products.value.filter(p => p.id !== id)
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  return {
    products,
    product,
    categories,
    isLoading,
    error,
    fetchProducts,
    fetchProduct,
    fetchCategories,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
