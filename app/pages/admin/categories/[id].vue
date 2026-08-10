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
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Edit Kategori</h1>
      <p class="text-sm text-[#6B7280] mt-1">Ubah rincian kategori yang sudah ada secara parsial atau total.</p>
    </div>

    <!-- Spinner Loading Pre-fill Data Awal -->
    <div v-if="isFetching" class="flex justify-center p-12">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-[#C65A3A]" />
    </div>

    <!-- Card Form Utama Duplikasi -->
    <UCard 
      v-else
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden"
      :ui="{ body: { padding: 'p-0' }, ring: 'ring-1 ring-[#E7E1D8]' }"
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

          <UFormField label="Slug URL (SEO)" description="Mengubah nilai ini berpotensi memutus tautan (broken link) dari mesin pencari. Lakukan jika perlu." :ui="formFieldUi">
            <UInput 
              v-model="form.slug" 
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

          <UFormField label="URL Gambar" required description="Tautkan URL teks manual. Integrasi unggah gambar akan hadir pada Sprint 5." :ui="formFieldUi">
            <div class="flex flex-col sm:flex-row sm:items-start gap-4 w-full">
              <!-- Image Preview Box (80x80) -->
              <div class="shrink-0 w-20 h-20 bg-[#F7F6F2] rounded-[14px] border border-[#E7E1D8] overflow-hidden flex items-center justify-center shadow-sm">
                <img v-if="form.image" :src="form.image" class="w-full h-full object-cover" alt="Preview Gambar" />
                <UIcon v-else name="i-heroicons-photo" class="text-3xl text-[#9CA3AF]" />
              </div>
              <!-- Input URL -->
              <UInput 
                v-model="form.image" 
                class="flex-1 w-full"
                :ui="inputUi"
              />
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
            Simpan Perubahan
          </UButton>
        </div>

      </form>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const { fetchCategory, updateCategory } = useAdminCategories()

const categoryId = parseInt(route.params.id as string)

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

const isFetching = ref(true)
const isSubmitting = ref(false)
const isSlugEdited = ref(true) // Default ke true saat Edit, agar tidak ter-auto-generate lagi saat merubah nama

onMounted(async () => {
  if (isNaN(categoryId)) {
    router.push('/admin/categories')
    return
  }

  // Pre-fill / Hydration memanggil Single Source of Truth dari Composable
  const category = await fetchCategory(categoryId)
  if (!category) {
    router.push('/admin/categories')
    return
  }

  form.value = {
    name: category.name,
    slug: category.slug,
    image: category.image,
    description: category.description
  }

  isFetching.value = false
})

// Auto-Slug Logic (Hanya jika user belum pernah mengedit field slug manual, misal jika slug awalnya kosong)
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
  isSubmitting.value = true
  const success = await updateCategory(categoryId, form.value)
  isSubmitting.value = false
  
  if (success) {
    router.push('/admin/categories')
  }
}
</script>
