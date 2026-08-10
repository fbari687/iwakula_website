import { useState } from '#imports'

export const useAuth = () => {
  const user = useState<any | null>('admin-user', () => null)
  const loading = useState<boolean>('admin-auth-loading', () => false)

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const response = await $fetch<any>('/api/admin/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      if (response && response.success) {
        user.value = response.data
        return { success: true }
      }
      
      return { success: false, message: response.message || 'Login gagal' }
    } catch (e: any) {
      return { success: false, message: e.data?.statusMessage || e.message || 'Login gagal' }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      await $fetch('/api/admin/auth/logout', { method: 'POST' })
      user.value = null
      return { success: true }
    } catch (e: any) {
      return { success: false, message: e.message }
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    loading.value = true
    try {
      const response = await $fetch<any>('/api/admin/auth/me')
      if (response && response.success) {
        user.value = response.data
      } else {
        user.value = null
      }
    } catch (e) {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    login,
    logout,
    fetchUser
  }
}
