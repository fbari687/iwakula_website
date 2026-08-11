<template>
  <div class="space-y-6 lg:space-y-8 pb-12 max-w-3xl mx-auto">
    <!-- Header Halaman -->
    <div>
      <UButton 
        to="/admin/contacts" 
        icon="i-heroicons-arrow-left" 
        class="mb-4 bg-transparent text-[#6B7280] hover:text-[#24324A] hover:bg-[#E7E1D8]/50 transition-colors"
        variant="ghost"
      >
        Kembali
      </UButton>
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Tambah Kontak</h1>
      <p class="text-sm text-[#6B7280] mt-1">Pilih jenis kontak atau media sosial di bawah ini untuk ditambahkan.</p>
    </div>

    <!-- Card Form Utama -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden"
      :ui="{ body: 'p-0 ring-1 ring-[#E7E1D8]' }"
    >
      <form @submit.prevent="handleSubmit" class="flex flex-col">
        
        <div class="p-6 sm:p-8 space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-lg font-semibold text-[#24324A]">Informasi Kontak</h2>
            <p class="text-sm text-[#6B7280]">Pilih media sosial yang belum pernah didaftarkan sebelumnya.</p>
          </div>

          <UFormField label="Kunci Kontak (Platform)" required description="Setiap jenis media sosial hanya dapat didaftarkan satu kali." :ui="formFieldUi">
            <USelect 
              v-model="form.key" 
              :items="availableKeyOptions"
              placeholder="Pilih Media Sosial / Kontak" 
              class="w-full"
              :ui="selectUi"
              @update:model-value="onKeyChange"
            />
          </UFormField>

          <UFormField label="Nilai Kontak (Value)" required description="Nomor telepon (misal: 628119844941), alamat email, atau username/handle media sosial." :ui="formFieldUi">
            <UInput 
              v-model="form.value" 
              placeholder="Misal: 628119844941 atau iwakulafood" 
              class="w-full"
              :ui="inputUi"
            />
          </UFormField>

          <UFormField label="Nama Ikon (Icon Name)" description="Otomatis diisi sesuai platform, dapat diedit manual jika perlu." :ui="formFieldUi">
            <UInput 
              v-model="form.icon" 
              placeholder="i-ic-baseline-whatsapp" 
              class="w-full"
              :ui="inputUi"
            />
          </UFormField>
        </div>

        <!-- FOOTER: Aksi -->
        <div class="p-6 sm:p-8 border-t border-[#E7E1D8] bg-[#F7F6F2]/50 flex justify-end gap-3 rounded-b-[20px]">
          <UButton 
            to="/admin/contacts" 
            variant="soft" 
            :class="secondaryButtonClass"
          >
            Batal
          </UButton>
          <UButton 
            type="submit" 
            :loading="isSubmitting" 
            :class="primaryButtonClass"
          >
            Simpan Kontak
          </UButton>
        </div>

      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const { contacts, fetchContacts, createContact } = useAdminContacts()
const toast = useToast()

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

const formFieldUi = {
  label: 'text-[#24324A] font-medium',
  description: 'text-[#6B7280] text-sm mt-1'
}

const inputUi = { 
  rounded: 'rounded-[14px]',
  placeholder: 'placeholder:text-[#9CA3AF]',
  base: 'bg-[#FBFAF8] text-[#24324A] transition-colors disabled:bg-[#F7F6F2] disabled:text-[#9CA3AF]',
  color: { 
    white: { 
      outline: 'shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]' 
    } 
  } 
}

const selectUi = { 
  rounded: 'rounded-[14px]',
  placeholder: 'placeholder:text-[#9CA3AF]',
  base: 'bg-[#FBFAF8] text-[#24324A] transition-colors disabled:bg-[#F7F6F2] disabled:text-[#9CA3AF]',
  color: { 
    white: { 
      outline: 'shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]' 
    } 
  },
  content: 'bg-[#FBFAF8] border border-[#E7E1D8] rounded-[14px] shadow-lg p-1.5 text-[#24324A] z-50',
  item: 'text-[#24324A] hover:!bg-[#C65A3A] hover:!text-white data-[highlighted]:!bg-[#C65A3A] data-[highlighted]:!text-white data-[disabled]:!text-[#9CA3AF] data-[disabled]:!opacity-50 data-[disabled]:!bg-transparent cursor-pointer rounded-lg px-3 py-2 transition-colors font-medium'
}
const primaryButtonClass = 'bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-[14px] px-7 py-2.5 shadow-sm border-0 font-medium transition-colors disabled:opacity-50'
const secondaryButtonClass = 'bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] rounded-[14px] px-7 py-2.5 transition-colors disabled:opacity-50'

const form = ref({
  key: '',
  value: '',
  icon: ''
})

const isSubmitting = ref(false)

onMounted(() => {
  fetchContacts()
})

const availableKeyOptions = computed(() => {
  const existingKeys = new Set(contacts.value.map(c => c.key.toLowerCase()))
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
    const success = await createContact({
      key: form.value.key.trim().toLowerCase(),
      value: form.value.value.trim(),
      icon: form.value.icon.trim() || null
    })
    if (success) {
      router.push('/admin/contacts')
    }
  } catch (error: any) {
    toast.add({ title: 'Error', description: error.message || 'Terjadi kesalahan saat menyimpan kontak', color: 'error' })
  } finally {
    isSubmitting.value = false
  }
}
</script>
