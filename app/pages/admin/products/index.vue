<template>
  <div class="space-y-6 lg:space-y-8 pb-12">
    <!-- 1. Header Halaman -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Katalog Produk</h1>
        <p class="text-sm text-[#6B7280] mt-1">Kelola semua daftar produk olahan menu Iwakula.</p>
      </div>
      <UButton 
        to="/admin/products/create" 
        icon="i-heroicons-plus"
        class="bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-full h-11 px-6 shadow-sm flex items-center justify-center font-medium transition-colors border-0 self-start sm:self-auto cursor-pointer"
      >
        Tambah Produk
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

    <!-- 3. Panel Utama Tabel & Filter -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden flex flex-col"
      :ui="{ body: 'p-0', header: 'p-4 sm:px-6 sm:py-5', footer: 'p-4 sm:px-6', root: 'ring-1 ring-[#E7E1D8]' }"
    >
      <template #header>
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <UInput 
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Cari produk atau subjudul..."
            class="w-full lg:w-80"
            :ui="adminInputUi"
          />
          <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <USelect 
              v-model="selectedCategoryId"
              :items="categoryOptions"
              class="w-full sm:w-48"
              :ui="adminSelectUi"
            />
            <USelect 
              v-model="selectedStatus"
              :items="statusOptions"
              class="w-full sm:w-40"
              :ui="adminSelectUi"
            />
          </div>
        </div>
      </template>

      <!-- Table Wrapper Custom Responsif -->
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[850px]">
          <thead>
            <tr class="border-b border-[#E7E1D8] bg-[#F7F6F2]/60 text-xs uppercase tracking-wider text-[#6B7280]">
              <th class="px-6 py-4 font-semibold w-20">Gambar</th>
              <th class="px-6 py-4 font-semibold">Informasi Produk</th>
              <th class="px-6 py-4 font-semibold w-48">Harga & Status</th>
              <th class="px-6 py-4 font-semibold w-40">Dibuat</th>
              <th class="px-6 py-4 font-semibold w-28 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E7E1D8]">
            <tr v-if="isLoading" class="bg-white">
              <td colspan="5" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl mb-3 text-[#C65A3A]" />
                <p class="text-sm font-medium">Menyelaraskan katalog produk...</p>
              </td>
            </tr>
            <tr v-else-if="products.length === 0" class="bg-white">
              <td colspan="5" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-inbox" class="text-5xl mb-3 text-[#E7E1D8]" />
                <p class="text-sm font-medium text-[#24324A]">Belum ada produk yang ditemukan.</p>
                <p class="text-xs text-[#6B7280] mt-1">Coba atur ulang kata kunci atau filter pencarian.</p>
              </td>
            </tr>
            <tr 
              v-else
              v-for="prod in products" 
              :key="prod.id"
              class="bg-white hover:bg-[#F7F6F2]/60 transition-colors duration-200 group"
            >
              <td class="px-6 py-4">
                <img 
                  v-if="prod.image" 
                  :src="prod.image" 
                  class="w-12 h-12 rounded-xl object-cover border border-[#E7E1D8] shadow-xs"
                  alt="Thumbnail Produk"
                />
                <div v-else class="w-12 h-12 rounded-xl bg-[#F7F6F2] flex items-center justify-center border border-[#E7E1D8]">
                  <UIcon name="i-heroicons-photo" class="text-xl text-[#9CA3AF]" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2">
                    <span class="font-semibold text-[#24324A] text-base">{{ prod.name }}</span>
                    <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F7F6F2] text-[#6B7280] border border-[#E7E1D8]">
                      {{ prod.category?.name || 'Tanpa Kategori' }}
                    </span>
                  </div>
                  <p class="text-xs text-[#6B7280] line-clamp-1 max-w-md">{{ prod.subTitle || 'Tidak ada subjudul.' }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1.5">
                  <span class="font-bold text-[#C65A3A] text-sm">{{ formatRupiah(prod.price) }}</span>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span 
                      class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border"
                      :class="prod.isAvailable ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'"
                    >
                      {{ prod.isAvailable ? 'Tersedia' : 'Kosong' }}
                    </span>
                    <span 
                      v-if="prod.isFeatured" 
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200"
                    >
                      <UIcon name="i-heroicons-star" class="text-amber-500 text-xs" />
                      Unggulan
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2 text-xs text-[#6B7280] font-medium">
                  <UIcon name="i-heroicons-calendar" class="text-[#C65A3A] text-base" />
                  {{ formatDate(prod.createdAt) }}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1.5 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-200">
                  <UButton 
                    :to="`/admin/products/${prod.id}`" 
                    color="neutral" 
                    variant="soft" 
                    icon="i-heroicons-pencil-square" 
                    class="bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] shadow-xs cursor-pointer"
                    title="Edit Produk"
                  />
                  <UButton 
                    color="error" 
                    variant="soft" 
                    icon="i-heroicons-trash"
                    class="hover:bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-100 shadow-xs cursor-pointer"
                    title="Hapus Produk"
                    @click="handleDelete(prod.id)" 
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
            Menampilkan <span class="font-semibold text-[#24324A]">{{ products.length }}</span> dari <span class="font-semibold text-[#24324A]">{{ products.length }}</span> produk
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
      title="Hapus Produk"
      :description="selectedProduct ? `Apakah Anda yakin ingin menghapus produk '${selectedProduct.name}' secara permanen? Data produk dan gambar pendukung akan dihapus.` : 'Apakah Anda yakin ingin menghapus produk ini?'"
      :loading="isDeleting"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const { products, isLoading, fetchProducts, deleteProduct, categories, fetchCategories } = useAdminProducts()

const searchQuery = ref('')
const selectedCategoryId = ref('all')
const selectedStatus = ref('all')

const isDeleteModalOpen = ref(false)
const selectedProduct = ref<any | null>(null)
const isDeleting = ref(false)

onMounted(async () => {
  await fetchCategories()
  await fetchProducts()
})

const categoryOptions = computed(() => {
  const opts = [{ label: 'Semua Kategori', value: 'all' }]
  categories.value.forEach(c => {
    opts.push({ label: c.name, value: c.id.toString() })
  })
  return opts
})

const statusOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Tersedia', value: 'true' },
  { label: 'Kosong', value: 'false' }
]

// Debounce search fetching
let timeout: any
watch([searchQuery, selectedCategoryId, selectedStatus], () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    const filters: any = {}
    if (searchQuery.value) filters.search = searchQuery.value
    if (selectedCategoryId.value && selectedCategoryId.value !== 'all') filters.categoryId = parseInt(selectedCategoryId.value)
    if (selectedStatus.value && selectedStatus.value !== 'all') filters.isAvailable = selectedStatus.value === 'true'
    
    fetchProducts(filters)
  }, 400)
})

const statistics = computed(() => {
  const total = products.value.length
  const available = products.value.filter(p => p.isAvailable).length
  const featured = products.value.filter(p => p.isFeatured).length
  
  let latestDate = '-'
  if (products.value && products.value.length > 0) {
    latestDate = formatDate(products.value[0]?.createdAt)
  }

  return [
    { label: 'Total Produk', value: total, icon: 'i-heroicons-cube' },
    { label: 'Tersedia', value: available, icon: 'i-heroicons-check-badge' },
    { label: 'Unggulan', value: featured, icon: 'i-heroicons-star' },
    { label: 'Terbaru Ditambahkan', value: latestDate, icon: 'i-heroicons-clock' },
  ]
})

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number)
}

const formatDate = (dateValue: string | Date | null | undefined) => {
  if (!dateValue) return '-'
  const d = new Date(dateValue)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const handleDelete = (id: number) => {
  const prod = products.value.find(p => p.id === id)
  selectedProduct.value = prod || null
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (!selectedProduct.value) return
  isDeleting.value = true
  try {
    await deleteProduct(selectedProduct.value.id)
    isDeleteModalOpen.value = false
    selectedProduct.value = null
  } finally {
    isDeleting.value = false
  }
}
</script>
