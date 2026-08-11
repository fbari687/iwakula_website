<template>
  <div class="space-y-6 sm:space-y-8 pb-12 max-w-3xl mx-auto">
    <!-- Header Halaman -->
    <div>
      <UButton 
        to="/admin/contacts" 
        icon="i-heroicons-arrow-left" 
        color="neutral"
        variant="ghost"
        class="mb-4 text-[#6B7280] hover:text-[#24324A] hover:bg-[#F3EEE8] -ml-2 rounded-[12px] font-medium transition-colors cursor-pointer"
      >
        Kembali ke Daftar
      </UButton>
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Edit Kontak</h1>
      <p class="text-sm text-[#6B7280] mt-1">Ubah rincian informasi kontak atau saluran komunikasi.</p>
    </div>

    <!-- Spinner Loading Data Awal -->
    <div v-if="isFetching" class="flex flex-col items-center justify-center p-16">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-[#C65A3A] mb-3" />
      <p class="text-sm font-medium text-[#6B7280]">Memuat data kontak...</p>
    </div>

    <!-- Card Form Utama -->
    <UCard 
      v-else
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden"
      :ui="{ body: 'p-0 ring-1 ring-[#E7E1D8]' }"
    >
      <form @submit.prevent="handleSubmit" class="flex flex-col">
        
        <div class="p-5 sm:p-8 space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-base sm:text-lg font-semibold text-[#24324A]">Informasi Saluran Kontak</h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">Konfigurasi kunci identifikasi platform dan nilai kontak.</p>
          </div>

          <UFormField label="Platform / Saluran Kontak" required :description="isPrimaryContact ? 'Kunci kontak utama (WhatsApp & Email) bersifat permanen dan tidak dapat diubah.' : 'Setiap jenis platform hanya dapat didaftarkan satu kali.'" :ui="adminFormFieldUi">
            <USelect 
              v-model="form.key" 
              :items="availableKeyOptions"
              :disabled="isPrimaryContact"
              placeholder="Pilih Media Sosial / Platform Kontak" 
              class="w-full"
              :ui="adminSelectUi"
              @update:model-value="onKeyChange"
            />
          </UFormField>

          <UFormField label="Nilai Kontak (Value)" required description="Nomor telepon (misal: 628119844941), alamat email, atau handle media sosial." :ui="adminFormFieldUi">
            <UInput 
              v-model="form.value" 
              placeholder="Misal: 628119844941 atau iwakulafood" 
              class="w-full"
              :ui="adminInputUi"
            />
          </UFormField>

          <UFormField label="Nama Ikon (Iconify Class)" description="Nama ikon Iconify (Opsional, Misal: i-ic-baseline-whatsapp, i-ic-baseline-email)." :ui="adminFormFieldUi">
            <UInput 
              v-model="form.icon" 
              placeholder="i-ic-baseline-whatsapp" 
              class="w-full"
              :ui="adminInputUi"
            />
          </UFormField>
        </div>

        <!-- FOOTER: Tombol Aksi -->
        <div class="p-5 sm:p-8 border-t border-[#E7E1D8] bg-[#F7F6F2]/50 flex items-center justify-end gap-3 rounded-b-[20px]">
          <UButton 
            to="/admin/contacts" 
            variant="soft" 
            :class="adminSecondaryBtnClass"
          >
            Batal
          </UButton>
          <UButton 
            type="submit" 
            :loading="isSubmitting" 
            :class="adminPrimaryBtnClass"
          >
            Simpan Perubahan
          </UButton>
        </div>

      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const { contacts, fetchContacts, fetchContact, updateContact } = useAdminContacts()
const toast = useToast()

const contactId = parseInt(route.params.id as string)

const CONTACT_PLATFORMS = [
  { label: 'WhatsApp', value: 'whatsapp', icon: 'i-ic-baseline-whatsapp' },
  { label: 'Email', value: 'email', icon: 'i-ic-baseline-email' },
  { label: 'Instagram', value: 'instagram', icon: 'i-mdi-instagram' },
  { label: 'TikTok', value: 'tiktok', icon: 'i-ic-baseline-tiktok' },
  { label: 'YouTube', value: 'youtube', icon: 'i-mdi-youtube' },
  { label: 'Facebook', value: 'facebook', icon: 'i-mdi-facebook' },
  { label: 'Twitter / X', value: 'twitter', icon: 'i-ri-twitter-x-fill' },
  { label: 'LinkedIn', value: 'linkedin', icon: 'i-mdi-linkedin' },
  { label: 'Website / Portofolio', value: 'website', icon: 'i-heroicons-globe-alt' },
  { label: 'Telepon / HP', value: 'phone', icon: 'i-heroicons-phone' }
]

const form = ref({
  key: '',
  value: '',
  icon: ''
})

const initialKey = ref('')
const isFetching = ref(true)
const isSubmitting = ref(false)

const isPrimaryContact = computed(() => {
  return initialKey.value === 'whatsapp' || initialKey.value === 'email'
})

onMounted(async () => {
  if (isNaN(contactId)) {
    router.push('/admin/contacts')
    return
  }

  await fetchContacts()
  const data = await fetchContact(contactId)
  if (!data) {
    router.push('/admin/contacts')
    return
  }

  initialKey.value = data.key
  form.value = {
    key: data.key,
    value: data.value,
    icon: data.icon || ''
  }

  isFetching.value = false
})

const availableKeyOptions = computed(() => {
  const existingKeys = new Set(contacts.value.filter(c => c.id !== contactId).map(c => c.key.toLowerCase()))
  return CONTACT_PLATFORMS.map(p => ({
    label: existingKeys.has(p.value) ? `${p.label} (Sudah terdaftar)` : p.label,
    value: p.value,
    disabled: existingKeys.has(p.value)
  }))
})

const onKeyChange = (selectedKey: string) => {
  const platform = CONTACT_PLATFORMS.find(p => p.value === selectedKey)
  if (platform && platform.icon) {
    form.value.icon = platform.icon
  }
}

const handleSubmit = async () => {
  if (!form.value.key) {
    toast.add({ title: 'Gagal', description: 'Silakan pilih jenis kontak / media sosial', color: 'error' })
    return
  }
  if (!form.value.value.trim()) {
    toast.add({ title: 'Gagal', description: 'Kolom Nilai Kontak wajib diisi', color: 'error' })
    return
  }

  isSubmitting.value = true

  try {
    const success = await updateContact(contactId, {
      key: form.value.key.trim().toLowerCase(),
      value: form.value.value.trim(),
      icon: form.value.icon.trim() || null
    })
    if (success) {
      router.push('/admin/contacts')
    }
  } catch (error: any) {
    toast.add({ title: 'Error', description: error.message || 'Terjadi kesalahan saat menyimpan perubahan', color: 'error' })
  } finally {
    isSubmitting.value = false
  }
}
</script>
