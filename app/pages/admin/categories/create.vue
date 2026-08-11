<template>
  <div class="space-y-6 lg:space-y-8 pb-12 max-w-3xl mx-auto">
    <!-- Header Halaman -->
    <div>
      <UButton 
        to="/admin/categories" 
        icon="i-heroicons-arrow-left" 
        class="mb-4 bg-transparent text-[#6B7280] hover:text-[#24324A] hover:bg-[#E7E1D8]/50 transition-colors"
        variant="ghost"
      >
        Kembali
      </UButton>
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Tambah Kategori</h1>
      <p class="text-sm text-[#6B7280] mt-1">Isi detail di bawah ini untuk mendaftarkan kategori baru.</p>
    </div>

    <!-- Card Form Utama -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden"
      :ui="{ body: 'p-0 ring-1 ring-[#E7E1D8]' }"
    >
      <form @submit.prevent="handleSubmit" class="flex flex-col">
        
        <!-- SECTION 1: Informasi Kategori -->
        <div class="p-6 sm:p-8 space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-lg font-semibold text-[#24324A]">Informasi Kategori</h2>
            <p class="text-sm text-[#6B7280]">Identitas utama kategori yang ditampilkan di katalog.</p>
          </div>

          <UFormField label="Nama Kategori" required :ui="formFieldUi">
            <UInput 
              v-model="form.name" 
              placeholder="Misal: Ikan Asap" 
              class="w-full"
              :ui="inputUi"
            />
          </UFormField>

          <UFormField label="Slug URL" description="Dihasilkan otomatis dari nama kategori, atau edit manual untuk SEO." :ui="formFieldUi">
            <UInput 
              v-model="form.slug" 
              placeholder="ikan-asap" 
              class="w-full"
              :ui="inputUi"
              @input="handleSlugInput"
            />
          </UFormField>
        </div>

        <!-- SECTION 2: Media -->
        <div class="p-6 sm:p-8 border-t border-[#E7E1D8] space-y-6 bg-[#F7F6F2]/30">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-lg font-semibold text-[#24324A]">Media</h2>
            <p class="text-sm text-[#6B7280]">Visual pendukung yang merepresentasikan kategori.</p>
          </div>

          <UFormField label="Gambar Kategori" required description="Unggah gambar kategori (Max 5MB). Format akan dikonversi ke WebP otomatis." :ui="formFieldUi">
            <div class="flex flex-col gap-4 w-full">
              <div 
                v-if="imagePreview || form.image"
                class="relative w-40 h-40 rounded-[14px] border border-[#E7E1D8] overflow-hidden shadow-sm group"
              >
                <img :src="imagePreview || form.image" class="w-full h-full object-cover" alt="Preview Gambar" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <UButton color="neutral" variant="ghost" icon="i-heroicons-trash" @click="removeMainImage" />
                </div>
              </div>
              <div v-else class="w-full">
                <label 
                  class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#D6CEC2] hover:border-[#C65A3A] hover:bg-[#F3EEE8] rounded-[14px] cursor-pointer transition-colors"
                  :class="{ 'opacity-50 cursor-not-allowed': isUploading }"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <UIcon v-if="isUploading" name="i-heroicons-arrow-path" class="w-8 h-8 mb-3 text-[#C65A3A] animate-spin" />
                    <UIcon v-else name="i-heroicons-cloud-arrow-up" class="w-8 h-8 mb-3 text-[#9CA3AF]" />
                    <p class="mb-2 text-sm text-[#6B7280]">
                      <span v-if="isUploading">Mengunggah...</span>
                      <span v-else class="font-semibold text-[#C65A3A]">Klik untuk unggah</span> atau seret dan lepas
                    </p>
                    <p v-if="!isUploading" class="text-xs text-[#9CA3AF]">JPG, PNG, WEBP (Maks. 5MB)</p>
                  </div>
                  <input 
                    type="file" 
                    class="hidden" 
                    accept="image/jpeg,image/png,image/webp"
                    @change="handleFileUpload"
                    :disabled="isUploading"
                  />
                </label>
              </div>
            </div>
          </UFormField>
        </div>

        <!-- SECTION 3: Deskripsi -->
        <div class="p-6 sm:p-8 border-t border-[#E7E1D8] space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-lg font-semibold text-[#24324A]">Deskripsi</h2>
            <p class="text-sm text-[#6B7280]">Penjelasan naratif mengenai cakupan produk di kategori ini.</p>
          </div>

          <UFormField label="Deskripsi Kategori" required :ui="formFieldUi">
            <UTextarea 
              v-model="form.description" 
              placeholder="Jelaskan secara singkat dan menarik..." 
              :rows="5" 
              class="w-full"
              :ui="inputUi"
            />
          </UFormField>
        </div>

        <!-- FOOTER: Aksi -->
        <div class="p-6 sm:p-8 border-t border-[#E7E1D8] bg-[#F7F6F2]/50 flex justify-end gap-3 rounded-b-[20px]">
          <UButton 
            to="/admin/categories" 
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
            Simpan Kategori
          </UButton>
        </div>

      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const { createCategory } = useAdminCategories()
const toast = useToast()

// Objek Reusable Konfigurasi Tema (Anti-Duplikasi)
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
const primaryButtonClass = 'bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-[14px] px-7 py-2.5 shadow-sm border-0 font-medium transition-colors disabled:opacity-50'
const secondaryButtonClass = 'bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] rounded-[14px] px-7 py-2.5 transition-colors disabled:opacity-50'

const form = ref({
  name: '',
  slug: '',
  image: '',
  description: ''
})

const isSubmitting = ref(false)
const isSlugEdited = ref(false)
const isUploading = ref(false)
const imageFile = ref<File | null>(null)
const imagePreview = ref<string>('')

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return
  
  const file = target.files[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) {
    toast.add({ title: 'Gagal', description: 'Ukuran file melebihi 5MB', color: 'error' })
    return
  }

  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }

  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
  form.value.image = '' // Clear existing URL if any
  target.value = ''
}

const removeMainImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  imageFile.value = null
  imagePreview.value = ''
  form.value.image = ''
}

// Auto-Slug Logic (Hanya jika user belum pernah mengedit field slug manual)
watch(() => form.value.name, (newName) => {
  if (!isSlugEdited.value) {
    form.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }
})

// Fungsi mematikan Auto-Slug jika user intervensi
const handleSlugInput = () => {
  isSlugEdited.value = true
}

const handleSubmit = async () => {
  if (!form.value.image && !imageFile.value) {
    toast.add({ title: 'Gagal', description: 'Gambar kategori wajib diisi', color: 'error' })
    return
  }

  isSubmitting.value = true
  
  const { slug, ...rest } = form.value
  const payload = slug ? { ...form.value } : rest

  try {
    if (imageFile.value) {
      isUploading.value = true
      const formData = new FormData()
      formData.append('image', imageFile.value)
      
      const uploadRes = await $fetch<any>('/api/admin/upload', {
        method: 'POST',
        body: formData
      })
      
      if (uploadRes.success && uploadRes.data?.url) {
        payload.image = uploadRes.data.url
      } else {
        throw new Error('Gagal mengunggah gambar kategori')
      }
    }
    
    const success = await createCategory(payload as any)
    if (success) {
      router.push('/admin/categories')
    }
  } catch (error: any) {
    toast.add({ title: 'Error', description: error.message || 'Terjadi kesalahan saat menyimpan kategori', color: 'error' })
  } finally {
    isSubmitting.value = false
    isUploading.value = false
  }
}
</script>
