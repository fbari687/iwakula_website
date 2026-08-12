import type { Achievement } from '~~/server/database/schema'

export const useAdminAchievements = () => {
  const achievements = ref<Achievement[]>([])
  const isLoading = ref(false)
  const error = ref<any>(null)
  
  const toast = useToast()

  const fetchAchievements = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await $fetch<{ success: boolean; data: Achievement[] }>('/api/achievements')
      achievements.value = data
    } catch (err: any) {
      error.value = err
      toast.add({ title: 'Gagal', description: 'Gagal memuat daftar pencapaian', color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  const fetchAchievement = async (id: number) => {
    try {
      const { data } = await $fetch<{ success: boolean; data: Achievement }>(`/api/admin/achievements/${id}`)
      return data
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: 'Gagal memuat detail pencapaian', color: 'error' })
      return null
    }
  }

  const createAchievement = async (payload: Partial<Achievement>) => {
    try {
      await $fetch('/api/admin/achievements', {
        method: 'POST',
        body: payload
      })
      toast.add({ title: 'Berhasil', description: 'Pencapaian baru disimpan', color: 'success' })
      await fetchAchievements()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  const updateAchievement = async (id: number, payload: Partial<Achievement>) => {
    try {
      await $fetch(`/api/admin/achievements/${id}`, {
        method: 'PUT',
        body: payload
      })
      toast.add({ title: 'Berhasil', description: 'Pencapaian diperbarui', color: 'success' })
      await fetchAchievements()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  const deleteAchievement = async (id: number) => {
    try {
      await $fetch(`/api/admin/achievements/${id}`, {
        method: 'DELETE'
      })
      toast.add({ title: 'Berhasil', description: 'Pencapaian dihapus permanen', color: 'success' })
      achievements.value = achievements.value.filter(a => a.id !== id)
      await fetchAchievements()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  return {
    achievements,
    isLoading,
    error,
    fetchAchievements,
    fetchAchievement,
    createAchievement,
    updateAchievement,
    deleteAchievement
  }
}
