<template>
  <div class="space-y-6 sm:space-y-8 pb-12 max-w-3xl mx-auto">
    <!-- Header Halaman -->
    <div>
      <UButton 
        to="/admin/categories" 
        icon="i-heroicons-arrow-left" 
        color="neutral"
        variant="ghost"
        class="mb-4 text-[#6B7280] hover:text-[#24324A] hover:bg-[#F3EEE8] -ml-2 rounded-[12px] font-medium transition-colors cursor-pointer"
      >
        Kembali ke Daftar
      </UButton>
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Tambah Kategori</h1>
      <p class="text-sm text-[#6B7280] mt-1">Lengkapi rincian formulir di bawah ini untuk mendaftarkan kategori produk baru.</p>
    </div>

    <!-- Card Form Utama -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden"
      :ui="{ body: 'p-0 ring-1 ring-[#E7E1D8]' }"
    >
      <form @submit.prevent="handleSubmit" class="flex flex-col">
        
        <!-- SECTION 1: Informasi Kategori -->
        <div class="p-5 sm:p-8 space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-base sm:text-lg font-semibold text-[#24324A]">Informasi Kategori</h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">Identitas utama kategori yang ditampilkan di katalog publik.</p>
          </div>

          <UFormField label="Nama Kategori" required :ui="adminFormFieldUi">
            <UInput 
              v-model="form.name" 
              placeholder="Misal: Ikan Asap" 
              class="w-full"
              :ui="adminInputUi"
            />
          </UFormField>

          <UFormField label="Slug URL" description="Dihasilkan otomatis dari nama kategori, atau sesuaikan secara manual." :ui="adminFormFieldUi">
            <UInput 
              v-model="form.slug" 
              placeholder="ikan-asap" 
              class="w-full"
              :ui="adminInputUi"
              @input="handleSlugInput"
            />
          </UFormField>
        </div>

        <!-- SECTION 2: Media -->
        <div class="p-5 sm:p-8 border-t border-[#E7E1D8] space-y-6 bg-[#F7F6F2]/40">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-base sm:text-lg font-semibold text-[#24324A]">Media Visual</h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">Gambar utama yang merepresentasikan kategori produk.</p>
          </div>

          <UFormField label="Gambar Kategori" required description="Unggah fail gambar (Max 5MB). Format akan dikonversi ke WebP otomatis." :ui="adminFormFieldUi">
            <div class="flex flex-col gap-4 w-full">
              <div 
                v-if="imagePreview || form.image"
                class="relative w-40 h-40 rounded-[14px] border border-[#E7E1D8] overflow-hidden shadow-sm group bg-white"
              >
                <img :src="imagePreview || form.image" class="w-full h-full object-cover" alt="Preview Gambar Kategori" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <UButton color="error" variant="soft" icon="i-heroicons-trash" class="bg-white/90 hover:bg-white text-rose-600 rounded-xl cursor-pointer" @click="removeMainImage" />
                </div>
              </div>
              <div v-else class="w-full">
                <label 
                  class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#E7E1D8] hover:border-[#C65A3A] hover:bg-[#F3EEE8]/60 bg-[#FBFAF8] rounded-[14px] cursor-pointer transition-colors"
                  :class="{ 'opacity-50 cursor-not-allowed': isUploading }"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <UIcon v-if="isUploading" name="i-heroicons-arrow-path" class="w-8 h-8 mb-3 text-[#C65A3A] animate-spin" />
                    <UIcon v-else name="i-heroicons-cloud-arrow-up" class="w-8 h-8 mb-3 text-[#9CA3AF]" />
                    <p class="mb-1 text-sm text-[#6B7280]">
                      <span v-if="isUploading" class="font-medium text-[#24324A]">Mengunggah fail...</span>
                      <span v-else><span class="font-semibold text-[#C65A3A]">Klik untuk unggah</span> atau seret gambar</span>
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
        <div class="p-5 sm:p-8 border-t border-[#E7E1D8] space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-base sm:text-lg font-semibold text-[#24324A]">Deskripsi Naratif</h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">Penjelasan lengkap mengenai jenis produk yang ada di dalam kategori ini.</p>
          </div>

          <UFormField label="Deskripsi Kategori" required :ui="adminFormFieldUi">
            <UTextarea 
              v-model="form.description" 
              placeholder="Jelaskan karakteristik atau rasa olahan pada kategori ini..." 
              :rows="4" 
              class="w-full"
              :ui="adminInputUi"
            />
          </UFormField>
        </div>

        <!-- FOOTER: Tombol Aksi -->
        <div class="p-5 sm:p-8 border-t border-[#E7E1D8] bg-[#F7F6F2]/50 flex items-center justify-end gap-3 rounded-b-[20px]">
          <UButton 
            to="/admin/categories" 
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
  form.value.image = ''
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

watch(() => form.value.name, (newName) => {
  if (!isSlugEdited.value) {
    form.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }
})

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
