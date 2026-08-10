import type { Product, Category } from '~~/server/database/schema'

export interface AdminProduct extends Omit<Product, 'mainImage'> {
  image: string
  category?: Category
}

export const useAdminProducts = () => {
  const products = ref<AdminProduct[]>([])
  const isLoading = ref(false)
  const error = ref<any>(null)
  
  const toast = useToast()

  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await $fetch<{ success: boolean; data: AdminProduct[] }>('/api/products')
      products.value = data
    } catch (err: any) {
      error.value = err
      toast.add({ title: 'Gagal', description: 'Gagal memuat daftar produk', color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  const fetchProduct = async (id: number) => {
    if (!products.value.length) {
      await fetchProducts()
    }
    return products.value.find(p => p.id === id) || null
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
      await fetchProducts()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct
  }
}
