<template>
  <div class="space-y-6 lg:space-y-8 pb-12">
    <!-- 1. Header Halaman -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Kategori Produk</h1>
        <p class="text-sm text-[#6B7280] mt-1">Kelola semua kategori menu dan klasifikasi produk Iwakula.</p>
      </div>
      <UButton 
        to="/admin/categories/create" 
        icon="i-heroicons-plus"
        class="bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-full h-11 px-6 shadow-sm flex items-center justify-center font-medium transition-colors border-0 self-start sm:self-auto cursor-pointer"
      >
        Tambah Kategori
      </UButton>
    </div>

    <!-- 2. Statistik Ringkas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      <UCard 
        v-for="(stat, index) in statistics" 
        :key="index"
        class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm"
        :ui="{ body: 'p-5 sm:p-6', root: 'ring-1 ring-[#E7E1D8]' }"
      >
        <div class="flex items-center gap-4">
          <div class="h-12 w-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center border border-[#E7E1D8] text-[#C65A3A] shrink-0">
            <UIcon :name="stat.icon" class="text-xl" />
          </div>
          <div class="min-w-0">
            <div class="text-2xl font-bold text-[#24324A] truncate">{{ stat.value }}</div>
            <div class="text-xs font-medium text-[#6B7280] uppercase tracking-wider mt-0.5 truncate">{{ stat.label }}</div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 3. Panel Tabel & Filter -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden flex flex-col"
      :ui="{ body: 'p-0', header: 'p-4 sm:px-6 sm:py-5', footer: 'p-4 sm:px-6', root: 'ring-1 ring-[#E7E1D8]' }"
    >
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput 
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Cari nama atau slug kategori..."
            class="w-full sm:w-80"
            :ui="adminInputUi"
          />
          <USelect 
            v-model="sortBy"
            :items="sortOptions"
            placeholder="Urutkan"
            class="w-full sm:w-48"
            :ui="adminSelectUi"
          />
        </div>
      </template>

      <!-- Table Wrapper Custom Responsif -->
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[700px]">
          <thead>
            <tr class="border-b border-[#E7E1D8] bg-[#F7F6F2]/60 text-xs uppercase tracking-wider text-[#6B7280]">
              <th class="px-6 py-4 font-semibold w-20">Gambar</th>
              <th class="px-6 py-4 font-semibold">Informasi Kategori</th>
              <th class="px-6 py-4 font-semibold w-44">Dibuat</th>
              <th class="px-6 py-4 font-semibold w-28 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E7E1D8]">
            <tr v-if="isLoading" class="bg-white">
              <td colspan="4" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl mb-3 text-[#C65A3A]" />
                <p class="text-sm font-medium">Menyelaraskan data kategori...</p>
              </td>
            </tr>
            <tr v-else-if="filteredCategories.length === 0" class="bg-white">
              <td colspan="4" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-inbox" class="text-5xl mb-3 text-[#E7E1D8]" />
                <p class="text-sm font-medium text-[#24324A]">Tidak ada data kategori ditemukan.</p>
                <p class="text-xs text-[#6B7280] mt-1">Coba sesuaikan kata kunci pencarian atau tambah kategori baru.</p>
              </td>
            </tr>
            <tr 
              v-else
              v-for="cat in filteredCategories" 
              :key="cat.id"
              class="bg-white hover:bg-[#F7F6F2]/60 transition-colors duration-200 group"
            >
              <td class="px-6 py-4">
                <img 
                  v-if="cat.image" 
                  :src="cat.image" 
                  class="w-12 h-12 rounded-xl object-cover border border-[#E7E1D8] shadow-xs"
                  alt="Thumbnail Kategori"
                />
                <div v-else class="w-12 h-12 rounded-xl bg-[#F7F6F2] flex items-center justify-center border border-[#E7E1D8]">
                  <UIcon name="i-heroicons-photo" class="text-xl text-[#9CA3AF]" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-[#24324A] text-base">{{ cat.name }}</span>
                    <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F7F6F2] text-[#6B7280] border border-[#E7E1D8]">
                      {{ cat.slug }}
                    </span>
                  </div>
                  <p class="text-xs text-[#6B7280] line-clamp-1 max-w-md">{{ cat.description || 'Tidak ada deskripsi.' }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2 text-xs text-[#6B7280] font-medium">
                  <UIcon name="i-heroicons-calendar" class="text-[#C65A3A] text-base" />
                  {{ formatDate(cat.createdAt) }}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1.5 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-200">
                  <UButton 
                    :to="`/admin/categories/${cat.id}`" 
                    color="neutral" 
                    variant="soft" 
                    icon="i-heroicons-pencil-square" 
                    class="bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] shadow-xs cursor-pointer"
                    title="Edit Kategori"
                  />
                  <UButton 
                    color="error" 
                    variant="soft" 
                    icon="i-heroicons-trash"
                    class="hover:bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-100 shadow-xs cursor-pointer"
                    title="Hapus Kategori"
                    @click="handleDelete(cat.id)" 
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 4. Footer Keterangan & Navigasi -->
      <template #footer>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div>
            Menampilkan <span class="font-semibold text-[#24324A]">{{ filteredCategories.length }}</span> dari <span class="font-semibold text-[#24324A]">{{ categories.length }}</span> kategori
          </div>
          <div class="flex items-center gap-1.5">
            <UButton color="neutral" variant="ghost" icon="i-heroicons-chevron-left" disabled class="text-[#9CA3AF]" />
            <UButton color="neutral" variant="solid" class="bg-[#24324A] text-white hover:bg-[#24324A] rounded-lg px-3 py-1 text-xs font-semibold">1</UButton>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-chevron-right" disabled class="text-[#9CA3AF]" />
          </div>
        </div>
      </template>
    </UCard>

    <!-- Modal Konfirmasi Hapus -->
    <AdminDeleteModal
      v-model:open="isDeleteModalOpen"
      title="Hapus Kategori"
      :description="selectedCategory ? `Apakah Anda yakin ingin menghapus kategori '${selectedCategory.name}' secara permanen? Seluruh produk yang terkait mungkin terpengaruh.` : 'Apakah Anda yakin ingin menghapus kategori ini?'"
      :loading="isDeleting"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const { categories, isLoading, fetchCategories, deleteCategory } = useAdminCategories()

const searchQuery = ref('')
const sortBy = ref('Terbaru')
const isDeleteModalOpen = ref(false)
const selectedCategory = ref<any | null>(null)
const isDeleting = ref(false)

const sortOptions = [
  { label: 'Terbaru', value: 'Terbaru' },
  { label: 'Terlama', value: 'Terlama' },
  { label: 'Nama A-Z', value: 'Nama A-Z' }
]

onMounted(() => {
  fetchCategories()
})

const filteredCategories = computed(() => {
  let list = [...categories.value]

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q))
  }

  if (sortBy.value === 'Terlama') {
    list.reverse()
  } else if (sortBy.value === 'Nama A-Z') {
    list.sort((a, b) => a.name.localeCompare(b.name))
  }

  return list
})

const statistics = computed(() => {
  const total = categories.value.length
  const withImage = categories.value.filter(c => c.image && c.image.trim() !== '').length
  const uniqueSlugs = new Set(categories.value.map(c => c.slug)).size
  
  let latestDate = '-'
  if (total > 0 && categories.value[0]?.createdAt) {
    latestDate = formatDate(categories.value[0].createdAt)
  }

  return [
    { label: 'Total Kategori', value: total, icon: 'i-heroicons-rectangle-stack' },
    { label: 'Gambar Aktif', value: withImage, icon: 'i-heroicons-photo' },
    { label: 'Slug Terverifikasi', value: uniqueSlugs, icon: 'i-heroicons-link' },
    { label: 'Terakhir Ditambahkan', value: latestDate, icon: 'i-heroicons-clock' },
  ]
})

const formatDate = (dateInput: string | Date) => {
  if (!dateInput) return '-'
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const handleDelete = (id: number) => {
  const cat = categories.value.find(c => c.id === id)
  selectedCategory.value = cat || null
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (!selectedCategory.value) return
  isDeleting.value = true
  try {
    await deleteCategory(selectedCategory.value.id)
    isDeleteModalOpen.value = false
    selectedCategory.value = null
  } finally {
    isDeleting.value = false
  }
}
</script>
