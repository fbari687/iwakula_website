import type { Category } from '~~/server/database/schema'

export const useAdminCategories = () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<any>(null)
  
  const toast = useToast()

  // Ambil daftar kategori dari endpoint publik (Single Source of Truth)
  const fetchCategories = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await $fetch<{ success: boolean; data: Category[] }>('/api/categories')
      categories.value = data
    } catch (err: any) {
      error.value = err
      toast.add({ title: 'Gagal', description: 'Gagal memuat daftar kategori', color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  // Mengambil kategori tunggal
  const fetchCategory = async (id: number) => {
    if (!categories.value.length) {
      await fetchCategories()
    }
    return categories.value.find(c => c.id === id) || null
  }

  // Operasi CUD (Create, Update, Delete)
  const createCategory = async (payload: Partial<Category>) => {
    try {
      await $fetch('/api/admin/categories', {
        method: 'POST',
        body: payload
      })
      toast.add({ title: 'Berhasil', description: 'Kategori baru disimpan', color: 'success' })
      await fetchCategories() // UI Sync Reflux
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  const updateCategory = async (id: number, payload: Partial<Category>) => {
    try {
      await $fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        body: payload
      })
      toast.add({ title: 'Berhasil', description: 'Kategori diperbarui', color: 'success' })
      await fetchCategories() // UI Sync Reflux
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  const deleteCategory = async (id: number) => {
    try {
      await $fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE'
      })
      toast.add({ title: 'Berhasil', description: 'Kategori dihapus permanen', color: 'success' })
      await fetchCategories() // UI Sync Reflux
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory
  }
}
