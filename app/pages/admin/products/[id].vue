<template>
  <div class="space-y-6 lg:space-y-8 pb-12 max-w-4xl mx-auto">
    <!-- Header Halaman -->
    <div>
      <UButton 
        to="/admin/products" 
        icon="i-heroicons-arrow-left" 
        class="mb-4 bg-transparent text-[#6B7280] hover:text-[#24324A] hover:bg-[#E7E1D8]/50 transition-colors"
        variant="ghost"
      >
        Kembali
      </UButton>
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Edit Produk</h1>
      <p class="text-sm text-[#6B7280] mt-1">Perbarui informasi produk yang sudah ada.</p>
    </div>

    <!-- Loading State -->
    <UCard v-if="isLoadingData" class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm">
      <div class="p-16 flex flex-col items-center justify-center text-[#6B7280]">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl mb-3 text-[#C65A3A]" />
        <p>Memuat data produk...</p>
      </div>
    </UCard>

    <!-- Card Form Utama -->
    <UCard 
      v-else
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden"
      :ui="{ body: 'p-0 ring-1 ring-[#E7E1D8]' }"
    >
      <form @submit.prevent="handleSubmit" class="flex flex-col">
        
        <!-- SECTION 1: Informasi Produk -->
        <div class="p-6 sm:p-8 space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-lg font-semibold text-[#24324A]">Informasi Dasar</h2>
            <p class="text-sm text-[#6B7280]">Identitas utama produk yang ditampilkan di katalog.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Nama Produk" required :ui="formFieldUi">
              <UInput 
                v-model="form.name" 
                placeholder="Misal: Ikan Asap Cakalang" 
                class="w-full"
                :ui="inputUi"
              />
            </UFormField>

            <UFormField label="Kategori" required :ui="formFieldUi">
              <USelect 
                v-model="form.categoryId" 
                :items="categoryOptions"
                placeholder="Pilih Kategori"
                class="w-full"
                :ui="selectUi"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Slug URL" description="Dihasilkan otomatis, atau edit manual." :ui="formFieldUi">
              <UInput 
                v-model="form.slug" 
                placeholder="ikan-asap-cakalang" 
                class="w-full"
                :ui="inputUi"
                @input="handleSlugInput"
              />
            </UFormField>

            <UFormField label="Subjudul" required description="Keterangan singkat produk." :ui="formFieldUi">
              <UInput 
                v-model="form.subTitle" 
                placeholder="Misal: 500gr / Pedas Manis" 
                class="w-full"
                :ui="inputUi"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div class="space-y-4">
              <UFormField :label="isPromo ? 'Harga Promo / Diskon (Rp)' : 'Harga Jual (Rp)'" required :ui="formFieldUi">
                <UInput 
                  v-model.number="form.price" 
                  type="number"
                  placeholder="Misal: 50000" 
                  class="w-full"
                  :ui="inputUi"
                />
              </UFormField>

              <UCheckbox v-model="isPromo" label="Atur Harga Diskon/Promo" :ui="checkboxUi" />
            </div>

            <UFormField v-if="isPromo" label="Harga Coret / Asli (Rp)" description="Harga sebelum diskon" :ui="formFieldUi">
              <UInput 
                v-model.number="form.originalPrice" 
                type="number"
                placeholder="Misal: 75000" 
                class="w-full"
                :ui="inputUi"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="Keunggulan Produk" description="Pisahkan dengan koma (,)" :ui="formFieldUi">
              <UInput 
                v-model="form.highlights" 
                placeholder="Misal: Tanpa Pengawet, Tinggi Protein" 
                class="w-full"
                :ui="inputUi"
              />
            </UFormField>

            <div class="flex flex-col gap-4 mt-8">
              <UCheckbox v-model="form.isAvailable" label="Tersedia (Ready Stock)" :ui="checkboxUi" />
              <UCheckbox v-model="form.isFeatured" label="Jadikan Produk Unggulan" :ui="checkboxUi" />
            </div>
          </div>
        </div>

        <!-- SECTION 2: Media -->
        <div class="p-6 sm:p-8 border-t border-[#E7E1D8] space-y-6 bg-[#F7F6F2]/30">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-lg font-semibold text-[#24324A]">Media</h2>
            <p class="text-sm text-[#6B7280]">Visual utama yang merepresentasikan produk.</p>
          </div>

          <UFormField label="Gambar Produk Utama (Thumbnail)" required description="Unggah gambar produk (Max 5MB). Format akan dikonversi ke WebP otomatis." :ui="formFieldUi">
            <div class="flex flex-col gap-4">
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
                      <span class="font-semibold text-[#24324A]">{{ isUploading ? 'Mengunggah...' : 'Klik untuk mengunggah' }}</span>
                    </p>
                    <p class="text-xs text-[#9CA3AF]">PNG, JPG, JPEG (Max 5MB)</p>
                  </div>
                  <input type="file" class="hidden" accept="image/png, image/jpeg, image/jpg, image/webp" @change="handleFileUpload" :disabled="isUploading" />
                </label>
              </div>
            </div>
          </UFormField>

          <UFormField label="Galeri Gambar Tambahan" description="Opsional. Unggah gambar tambahan produk (Max 5MB per gambar). Format otomatis WebP." :ui="formFieldUi">
            <div class="flex flex-col gap-4">
              <!-- Grid Preview -->
              <div v-if="form.extraImages.length > 0 || extraImageFiles.length > 0" class="flex flex-wrap gap-4">
                <!-- Existing -->
                <div 
                  v-for="(img, idx) in form.extraImages" 
                  :key="`existing-${idx}`"
                  class="relative w-32 h-32 rounded-[14px] border border-[#E7E1D8] overflow-hidden shadow-sm group"
                >
                  <img :src="img" class="w-full h-full object-cover" alt="Preview Gambar Tambahan" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <UButton color="error" variant="ghost" icon="i-heroicons-trash" @click="form.extraImages.splice(idx, 1)" />
                  </div>
                </div>
                <!-- New -->
                <div 
                  v-for="(item, idx) in extraImageFiles" 
                  :key="`new-${idx}`"
                  class="relative w-32 h-32 rounded-[14px] border border-[#E7E1D8] overflow-hidden shadow-sm group"
                >
                  <img :src="item.preview" class="w-full h-full object-cover" alt="Preview Gambar Tambahan" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <UButton color="error" variant="ghost" icon="i-heroicons-trash" @click="removeExtraImage(idx)" />
                  </div>
                </div>
              </div>

              <!-- Upload Button (Multi) -->
              <div class="w-full">
                <label 
                  class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#D6CEC2] hover:border-[#C65A3A] hover:bg-[#F3EEE8] rounded-[14px] cursor-pointer transition-colors"
                  :class="{ 'opacity-50 cursor-not-allowed': isUploadingExtra }"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <UIcon v-if="isUploadingExtra" name="i-heroicons-arrow-path" class="w-6 h-6 mb-2 text-[#C65A3A] animate-spin" />
                    <UIcon v-else name="i-heroicons-cloud-arrow-up" class="w-6 h-6 mb-2 text-[#9CA3AF]" />
                    <p class="mb-1 text-sm text-[#6B7280]">
                      <span class="font-semibold text-[#24324A]">{{ isUploadingExtra ? 'Mengunggah...' : 'Klik untuk tambah gambar' }}</span>
                    </p>
                  </div>
                  <!-- multiple attribute allowed -->
                  <input type="file" class="hidden" multiple accept="image/png, image/jpeg, image/jpg, image/webp" @change="handleExtraFileUpload" :disabled="isUploadingExtra" />
                </label>
              </div>
            </div>
          </UFormField>
        </div>

        <!-- SECTION 3: Integrasi Marketplace -->
        <div class="p-6 sm:p-8 border-t border-[#E7E1D8] space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-lg font-semibold text-[#24324A]">Marketplace</h2>
            <p class="text-sm text-[#6B7280]">Tautkan URL pembelian di e-commerce.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UFormField label="URL Shopee" description="Opsional" :ui="formFieldUi">
              <UInput 
                v-model="form.shopeeUrl" 
                placeholder="https://shopee.co.id/..." 
                class="w-full"
                :ui="inputUi"
              />
            </UFormField>

            <UFormField label="URL Tokopedia" description="Opsional" :ui="formFieldUi">
              <UInput 
                v-model="form.tokopediaUrl" 
                placeholder="https://tokopedia.com/..." 
                class="w-full"
                :ui="inputUi"
              />
            </UFormField>
          </div>
        </div>

        <!-- SECTION 3: Deskripsi -->
        <div class="p-6 sm:p-8 border-t border-[#E7E1D8] space-y-6">
          <div class="border-b border-[#E7E1D8] pb-4 mb-2">
            <h2 class="text-lg font-semibold text-[#24324A]">Deskripsi</h2>
            <p class="text-sm text-[#6B7280]">Penjelasan lengkap tentang produk.</p>
          </div>

          <UFormField label="Deskripsi Produk" required :ui="formFieldUi">
            <TiptapEditor v-model="form.description" />
          </UFormField>
        </div>

        <!-- FOOTER: Aksi -->
        <div class="p-6 sm:p-8 border-t border-[#E7E1D8] bg-[#F7F6F2]/50 flex justify-end gap-3 rounded-b-[20px]">
          <UButton 
            to="/admin/products" 
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
            Simpan Perubahan
          </UButton>
        </div>

      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const toast = useToast()

const productId = parseInt(route.params.id as string)

const { updateProduct } = useAdminProducts()
const { categories, fetchCategories } = useAdminCategories()

const categoryOptions = computed(() => {
  return categories.value.map(c => ({
    label: c.name,
    value: c.id
  }))
})

// Objek Reusable Konfigurasi Tema (Anti-Duplikasi)
const formFieldUi = {
  label: 'text-[#24324A] font-medium',
  description: 'text-[#6B7280] text-sm mt-1'
}

const inputUi = { 
  rounded: 'rounded-[14px]',
  placeholder: 'placeholder:text-[#9CA3AF]',
  base: 'bg-[#FBFAF8] text-[#24324A] transition-colors disabled:bg-[#F7F6F2] disabled:text-[#9CA3AF] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
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
  } 
}

const checkboxUi = {
  base: 'h-4 w-4 rounded border-[#E7E1D8] text-[#C65A3A] focus:ring-[#C65A3A] [&_svg]:!text-white',
  label: 'text-sm font-medium text-[#24324A]',
  icon: 'text-white'
}

const primaryButtonClass = 'bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-[14px] px-7 py-2.5 shadow-sm border-0 font-medium transition-colors disabled:opacity-50'
const secondaryButtonClass = 'bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] rounded-[14px] px-7 py-2.5 transition-colors disabled:opacity-50'

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

const isLoadingData = ref(true)
const isSubmitting = ref(false)
const isSlugEdited = ref(true) 
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

const fetchProductData = async () => {
  try {
    const { data } = await $fetch<any>(`/api/admin/products/${productId}`)
    if (data) {
      form.value = {
        categoryId: data.categoryId,
        name: data.name,
        slug: data.slug,
        subTitle: data.subTitle,
        price: data.price,
        originalPrice: data.originalPrice,
        image: data.image,
        description: data.description,
        highlights: data.highlights ? data.highlights.join(', ') : '',
        shopeeUrl: data.shopeeUrl || '',
        tokopediaUrl: data.tokopediaUrl || '',
        isAvailable: data.isAvailable,
        isFeatured: data.isFeatured,
        extraImages: data.extraImages || []
      }
      if (data.originalPrice && data.originalPrice > data.price) {
        isPromo.value = true
      }
    }
  } catch (err: any) {
    toast.add({ title: 'Gagal', description: 'Gagal memuat data produk', color: 'error' })
    router.push('/admin/products')
  } finally {
    isLoadingData.value = false
  }
}

onMounted(async () => {
  await fetchCategories()
  await fetchProductData()
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
    // 1. Proses Upload
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

    // 2. Siapkan Payload
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

    // 3. Simpan
    const success = await updateProduct(productId, payload)
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
