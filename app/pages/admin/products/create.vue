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
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Tambah Produk</h1>
      <p class="text-sm text-[#6B7280] mt-1">Isi detail di bawah ini untuk mendaftarkan produk baru.</p>
    </div>

    <!-- Card Form Utama -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden"
      :ui="{ body: { padding: 'p-0' }, ring: 'ring-1 ring-[#E7E1D8]' }"
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

            <UFormField label="Subjudul" required description="Keterangan singkat / Berat produk." :ui="formFieldUi">
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

          <UFormField label="URL Gambar WebP" required description="Tautkan URL teks manual. Integrasi unggah gambar akan hadir pada tahap selanjutnya." :ui="formFieldUi">
            <div class="flex flex-col sm:flex-row sm:items-start gap-4 w-full">
              <!-- Image Preview Box (80x80) -->
              <div class="shrink-0 w-20 h-20 bg-[#F7F6F2] rounded-[14px] border border-[#E7E1D8] overflow-hidden flex items-center justify-center shadow-sm">
                <img v-if="form.image" :src="form.image" class="w-full h-full object-cover" alt="Preview Gambar" />
                <UIcon v-else name="i-heroicons-photo" class="text-3xl text-[#9CA3AF]" />
              </div>
              <!-- Input URL -->
              <UInput 
                v-model="form.image" 
                placeholder="https://contoh.com/gambar.webp" 
                class="flex-1 w-full"
                :ui="inputUi"
              />
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
            <UTextarea 
              v-model="form.description" 
              placeholder="Jelaskan spesifikasi, rasa, dan keunggulan produk..." 
              :rows="6" 
              class="w-full"
              :ui="inputUi"
            />
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

onMounted(() => {
  fetchCategories()
})

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
  isFeatured: false
})

const isSubmitting = ref(false)
const isSlugEdited = ref(false)
const isPromo = ref(false)

// Auto-Slug Logic
watch(() => form.value.name, (newName) => {
  if (!isSlugEdited.value) {
    form.value.slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  }
})

const handleSlugInput = () => {
  isSlugEdited.value = true
}

const handleSubmit = async () => {
  isSubmitting.value = true
  const payload = { 
    ...form.value,
    highlights: form.value.highlights.split(',').map(s => s.trim()).filter(Boolean)
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
  isSubmitting.value = false
  
  if (success) {
    router.push('/admin/products')
  }
}
</script>
