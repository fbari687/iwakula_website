<template>
  <div class="space-y-6 sm:space-y-8 pb-12 max-w-4xl mx-auto">
    <!-- Header Halaman -->
    <div>
      <UButton 
        to="/admin/products" 
        icon="i-heroicons-arrow-left" 
        color="neutral"
        variant="ghost"
        class="mb-4 text-[#6B7280] hover:text-[#24324A] hover:bg-[#F3EEE8] -ml-2 rounded-[12px] font-medium transition-colors cursor-pointer"
      >
        Kembali ke Katalog
      </UButton>
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Tambah Produk Baru</h1>
      <p class="text-sm text-[#6B7280] mt-1">Lengkapi rincian informasi, media, dan tautan e-commerce untuk produk baru.</p>
    </div>

    <!-- Card Form Utama -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden"
      :ui="{ body: 'p-0 ring-1 ring-[#E7E1D8]' }"
    >
      <form @submit.prevent="handleSubmit" class="flex flex-col">
        
        <!-- SECTION 1: Informasi Dasar -->
        <div class="p-5 sm:p-8 space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-base sm:text-lg font-semibold text-[#24324A]">Informasi Dasar</h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">Identitas utama produk yang ditampilkan di katalog publik.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Nama Produk" required :ui="adminFormFieldUi">
              <UInput 
                v-model="form.name" 
                placeholder="Misal: Ikan Asap Cakalang" 
                class="w-full"
                :ui="adminInputUi"
              />
            </UFormField>

            <UFormField label="Kategori Produk" required :ui="adminFormFieldUi">
              <USelect 
                v-model="form.categoryId" 
                :items="categoryOptions"
                placeholder="Pilih Kategori"
                class="w-full"
                :ui="adminSelectUi"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Slug URL" description="Dihasilkan otomatis dari nama produk, atau edit manual." :ui="adminFormFieldUi">
              <UInput 
                v-model="form.slug" 
                placeholder="ikan-asap-cakalang" 
                class="w-full"
                :ui="adminInputUi"
                @input="handleSlugInput"
              />
            </UFormField>

            <UFormField label="Subjudul / Varian" required description="Keterangan singkat / berat bersih produk." :ui="adminFormFieldUi">
              <UInput 
                v-model="form.subTitle" 
                placeholder="Misal: 500gr / Pedas Manis" 
                class="w-full"
                :ui="adminInputUi"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div class="space-y-4">
              <UFormField :label="isPromo ? 'Harga Promo / Diskon (Rp)' : 'Harga Jual (Rp)'" required :ui="adminFormFieldUi">
                <UInput 
                  v-model.number="form.price" 
                  type="number"
                  placeholder="Misal: 50000" 
                  class="w-full"
                  :ui="adminInputUi"
                />
              </UFormField>

              <UCheckbox v-model="isPromo" label="Atur Harga Diskon / Promo" :ui="adminCheckboxUi" />
            </div>

            <UFormField v-if="isPromo" label="Harga Coret / Asli (Rp)" description="Harga sebelum mendapatkan diskon" :ui="adminFormFieldUi">
              <UInput 
                v-model.number="form.originalPrice" 
                type="number"
                placeholder="Misal: 75000" 
                class="w-full"
                :ui="adminInputUi"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Keunggulan Produk" description="Pisahkan dengan tanda koma (,)" :ui="adminFormFieldUi">
              <UInput 
                v-model="form.highlights" 
                placeholder="Misal: Tanpa Pengawet, Tinggi Protein" 
                class="w-full"
                :ui="adminInputUi"
              />
            </UFormField>

            <div class="flex flex-col gap-4 mt-2 md:mt-7">
              <UCheckbox v-model="form.isAvailable" label="Tersedia (Ready Stock)" :ui="adminCheckboxUi" />
              <UCheckbox v-model="form.isFeatured" label="Jadikan Produk Unggulan (Featured)" :ui="adminCheckboxUi" />
            </div>
          </div>
        </div>

        <!-- SECTION 2: Media & Galeri -->
        <div class="p-5 sm:p-8 border-t border-[#E7E1D8] space-y-6 bg-[#F7F6F2]/40">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-base sm:text-lg font-semibold text-[#24324A]">Media Visual & Galeri</h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">Unggah gambar utama dan foto pendukung produk (Maks. 5MB per fail).</p>
          </div>

          <UFormField label="Gambar Utama (Thumbnail)" required description="Visual utama yang tampil di daftar katalog produk." :ui="adminFormFieldUi">
            <div class="flex flex-col gap-4">
              <div 
                v-if="imagePreview || form.image"
                class="relative w-44 h-44 rounded-[14px] border border-[#E7E1D8] overflow-hidden shadow-xs group bg-white"
              >
                <img :src="imagePreview || form.image" class="w-full h-full object-cover" alt="Preview Gambar Utama" />
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
                      <span v-else><span class="font-semibold text-[#C65A3A]">Klik untuk mengunggah</span> atau seret gambar</span>
                    </p>
                    <p v-if="!isUploading" class="text-xs text-[#9CA3AF]">PNG, JPG, JPEG, WEBP (Maks. 5MB)</p>
                  </div>
                  <input type="file" class="hidden" accept="image/png, image/jpeg, image/jpg, image/webp" @change="handleFileUpload" :disabled="isUploading" />
                </label>
              </div>
            </div>
          </UFormField>

          <UFormField label="Galeri Gambar Tambahan" description="Opsional. Foto pendukung kemasan, varian, atau angle produk lainnya." :ui="adminFormFieldUi">
            <div class="flex flex-col gap-4">
              <!-- Grid Preview Multi-Image -->
              <div v-if="extraImageFiles.length > 0" class="flex flex-wrap gap-3">
                <div 
                  v-for="(item, idx) in extraImageFiles" 
                  :key="idx"
                  class="relative w-28 h-28 rounded-[14px] border border-[#E7E1D8] overflow-hidden shadow-xs group bg-white"
                >
                  <img :src="item.preview" class="w-full h-full object-cover" alt="Preview Gambar Tambahan" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <UButton color="error" variant="soft" icon="i-heroicons-trash" class="bg-white/90 hover:bg-white text-rose-600 rounded-xl cursor-pointer" @click="removeExtraImage(idx)" />
                  </div>
                </div>
              </div>

              <!-- Upload Multi Button -->
              <div class="w-full">
                <label 
                  class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-[#E7E1D8] hover:border-[#C65A3A] hover:bg-[#F3EEE8]/60 bg-[#FBFAF8] rounded-[14px] cursor-pointer transition-colors"
                  :class="{ 'opacity-50 cursor-not-allowed': isUploadingExtra }"
                >
                  <div class="flex flex-col items-center justify-center py-4">
                    <UIcon v-if="isUploadingExtra" name="i-heroicons-arrow-path" class="w-6 h-6 mb-2 text-[#C65A3A] animate-spin" />
                    <UIcon v-else name="i-heroicons-photo" class="w-6 h-6 mb-2 text-[#9CA3AF]" />
                    <p class="text-xs text-[#6B7280]">
                      <span v-if="isUploadingExtra" class="font-medium text-[#24324A]">Mengunggah galeri...</span>
                      <span v-else><span class="font-semibold text-[#C65A3A]">Klik untuk tambah foto galeri</span> (Bisa banyak)</span>
                    </p>
                  </div>
                  <input type="file" class="hidden" multiple accept="image/png, image/jpeg, image/jpg, image/webp" @change="handleExtraFileUpload" :disabled="isUploadingExtra" />
                </label>
              </div>
            </div>
          </UFormField>
        </div>

        <!-- SECTION 3: Integrasi Marketplace -->
        <div class="p-5 sm:p-8 border-t border-[#E7E1D8] space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-base sm:text-lg font-semibold text-[#24324A]">Integrasi Marketplace</h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">Tautkan URL toko e-commerce tempat pembeli dapat memesan langsung.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Tautan Shopee" description="Opsional (misal: https://shopee.co.id/...)" :ui="adminFormFieldUi">
              <UInput 
                v-model="form.shopeeUrl" 
                placeholder="https://shopee.co.id/product/..." 
                class="w-full"
                :ui="adminInputUi"
              />
            </UFormField>

            <UFormField label="Tautan Tokopedia" description="Opsional (misal: https://tokopedia.com/...)" :ui="adminFormFieldUi">
              <UInput 
                v-model="form.tokopediaUrl" 
                placeholder="https://tokopedia.com/product/..." 
                class="w-full"
                :ui="adminInputUi"
              />
            </UFormField>
          </div>
        </div>

        <!-- SECTION 4: Deskripsi Lengkap -->
        <div class="p-5 sm:p-8 border-t border-[#E7E1D8] space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-base sm:text-lg font-semibold text-[#24324A]">Deskripsi Naratif</h2>
            <p class="text-xs sm:text-sm text-[#6B7280]">Penjelasan mendalam mengenai bahan baku, rasa, dan keunikan produk.</p>
          </div>

          <UFormField label="Deskripsi Produk (WYSIWYG)" required :ui="adminFormFieldUi">
            <TiptapEditor v-model="form.description" />
          </UFormField>
        </div>

        <!-- FOOTER: Tombol Aksi -->
        <div class="p-5 sm:p-8 border-t border-[#E7E1D8] bg-[#F7F6F2]/50 flex items-center justify-end gap-3 rounded-b-[20px]">
          <UButton 
            to="/admin/products" 
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
            Simpan Produk
          </UButton>
        </div>

      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'

definePageMeta({ layout: 'admin' })

const router = useRouter()
const { createProduct } = useAdminProducts()
const { categories, fetchCategories } = useAdminCategories()
const toast = useToast()

onMounted(() => {
  fetchCategories()
})

const categoryOptions = computed(() => {
  return categories.value.map(c => ({
    label: c.name,
    value: c.id
  }))
})

const form = ref({
  categoryId: undefined as number | undefined,
  name: '',
  slug: '',
  subTitle: '',
  price: undefined as number | undefined,
  originalPrice: undefined as number | undefined,
  image: '',
  description: '',
  highlights: '',
  shopeeUrl: '',
  tokopediaUrl: '',
  isAvailable: true,
  isFeatured: false,
  extraImages: [] as string[]
})

const isSubmitting = ref(false)
const isSlugEdited = ref(false)
const isPromo = ref(false)
const isUploading = ref(false)
const isUploadingExtra = ref(false)

const imageFile = ref<File | null>(null)
const imagePreview = ref<string>('')
const extraImageFiles = ref<{ file: File, preview: string }[]>([])

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
  target.value = ''
}

const removeMainImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  imageFile.value = null
  imagePreview.value = ''
}

const removeExtraImage = (idx: number) => {
  const item = extraImageFiles.value[idx]
  if (item && item.preview) {
    URL.revokeObjectURL(item.preview)
  }
  extraImageFiles.value.splice(idx, 1)
}

const handleExtraFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return
  
  const files = Array.from(target.files)
  
  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) {
      toast.add({ title: 'Gagal', description: `Ukuran file ${file.name} melebihi 5MB`, color: 'error' })
      continue
    }

    const preview = URL.createObjectURL(file)
    extraImageFiles.value.push({ file, preview })
  }

  target.value = ''
}

watch(() => form.value.name, (newName) => {
  if (!isSlugEdited.value) {
    form.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }
})

const handleSlugInput = () => {
  isSlugEdited.value = true
}

const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file)
  const { data } = await $fetch<{ success: boolean; data: { url: string } }>('/api/admin/upload', {
    method: 'POST',
    body: formData
  })
  return data.url
}

const handleSubmit = async () => {
  if (!imageFile.value && !form.value.image) {
    toast.add({ title: 'Peringatan', description: 'Gambar utama produk wajib diisi.', color: 'warning' })
    return
  }

  isSubmitting.value = true
  
  try {
    if (imageFile.value) {
      isUploading.value = true
      form.value.image = await uploadFile(imageFile.value)
      isUploading.value = false
    }

    if (extraImageFiles.value.length > 0) {
      isUploadingExtra.value = true
      for (const item of extraImageFiles.value) {
        const url = await uploadFile(item.file)
        form.value.extraImages.push(url)
      }
      isUploadingExtra.value = false
    }

    const payload: Record<string, any> = { 
      ...form.value,
      highlights: form.value.highlights ? form.value.highlights.split(',').map(s => s.trim()).filter(Boolean) : []
    }
    if (!isPromo.value) {
      delete payload.originalPrice
    } else if (!payload.originalPrice) {
      delete payload.originalPrice
    }
    
    if (!payload.slug) delete payload.slug
    if (!payload.categoryId) delete payload.categoryId
    if (!payload.shopeeUrl) delete payload.shopeeUrl
    if (!payload.tokopediaUrl) delete payload.tokopediaUrl

    const success = await createProduct(payload)
    if (success) {
      router.push('/admin/products')
    }
  } catch (err: any) {
    toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message || 'Terjadi kesalahan', color: 'error' })
  } finally {
    isSubmitting.value = false
    isUploading.value = false
    isUploadingExtra.value = false
  }
}
</script>
