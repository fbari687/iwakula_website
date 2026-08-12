import type { Contact } from '~~/server/database/schema'

export const useAdminContacts = () => {
  const contacts = ref<Contact[]>([])
  const isLoading = ref(false)
  const error = ref<any>(null)
  
  const toast = useToast()

  const fetchContacts = async () => {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await $fetch<{ success: boolean; data: Contact[] }>('/api/contacts')
      contacts.value = data
    } catch (err: any) {
      error.value = err
      toast.add({ title: 'Gagal', description: 'Gagal memuat daftar kontak', color: 'error' })
    } finally {
      isLoading.value = false
    }
  }

  const fetchContact = async (id: number) => {
    try {
      const { data } = await $fetch<{ success: boolean; data: Contact }>(`/api/admin/contacts/${id}`)
      return data
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: 'Gagal memuat detail kontak', color: 'error' })
      return null
    }
  }

  const createContact = async (payload: Partial<Contact>) => {
    try {
      await $fetch('/api/admin/contacts', {
        method: 'POST',
        body: payload
      })
      toast.add({ title: 'Berhasil', description: 'Kontak baru disimpan', color: 'success' })
      await fetchContacts()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  const updateContact = async (id: number, payload: Partial<Contact>) => {
    try {
      await $fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        body: payload
      })
      toast.add({ title: 'Berhasil', description: 'Kontak diperbarui', color: 'success' })
      await fetchContacts()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  const deleteContact = async (id: number) => {
    try {
      await $fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE'
      })
      toast.add({ title: 'Berhasil', description: 'Kontak dihapus permanen', color: 'success' })
      contacts.value = contacts.value.filter(c => c.id !== id)
      await fetchContacts()
      return true
    } catch (err: any) {
      toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message, color: 'error' })
      return false
    }
  }

  return {
    contacts,
    isLoading,
    error,
    fetchContacts,
    fetchContact,
    createContact,
    updateContact,
    deleteContact
  }
}
