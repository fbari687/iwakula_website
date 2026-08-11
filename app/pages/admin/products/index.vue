<template>
  <div class="space-y-6 lg:space-y-8 pb-12">
    <!-- 1. Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Katalog Produk</h1>
        <p class="text-sm text-[#6B7280] mt-1">Kelola semua produk Iwakula.</p>
      </div>
      <UButton 
        to="/admin/products/create" 
        icon="i-heroicons-plus"
        class="bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-full h-11 lg:h-12 px-6 shadow-sm flex items-center justify-center font-medium transition-colors border-0"
      >
        Tambah Produk
      </UButton>
    </div>

    <!-- 2. Statistik Ringkas -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      <UCard 
        v-for="(stat, index) in statistics" 
        :key="index"
        class="bg-[#FBFAF8] border-[#E7E1D8] ring-1 ring-[#E7E1D8] rounded-[20px] shadow-sm"
        :ui="{ body: 'p-5 sm:p-6' }"
      >
        <div class="flex items-center gap-4">
          <div class="h-12 w-12 rounded-full bg-[#F7F6F2] flex items-center justify-center border border-[#E7E1D8]">
            <UIcon :name="stat.icon" class="text-xl text-[#C65A3A]" />
          </div>
          <div>
            <div class="text-2xl font-bold text-[#24324A]">{{ stat.value }}</div>
            <div class="text-sm text-[#6B7280]">{{ stat.label }}</div>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 3 & 4. Panel Utama & Custom Table -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] ring-1 ring-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden flex flex-col"
      :ui="{ body: 'p-0', header: 'p-4 sm:px-6 sm:py-5', footer: 'p-4 sm:px-6' }"
    >
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput 
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Cari produk..."
            class="w-full sm:w-72"
            :ui="{ 
              base: 'rounded-[14px] placeholder:text-[#9CA3AF] bg-[#FBFAF8] text-[#24324A] shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]',
              leadingIcon: 'text-[#6B7280]'
            }"
          />
          <div class="flex gap-2 w-full sm:w-auto">
            <USelect 
              v-model="selectedCategoryId"
              :items="categoryOptions"
              class="w-full sm:w-48"
              :ui="{ 
                base: 'rounded-[14px] bg-[#FBFAF8] text-[#24324A] shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]',
                leadingIcon: 'text-[#6B7280]'
              }"
            />
            <USelect 
              v-model="selectedStatus"
              :items="statusOptions"
              class="w-full sm:w-40"
              :ui="{ 
                base: 'rounded-[14px] bg-[#FBFAF8] text-[#24324A] shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]',
                leadingIcon: 'text-[#6B7280]'
              }"
            />
          </div>
        </div>
      </template>

      <!-- Table Wrapper Custom -->
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[900px]">
          <thead>
            <tr class="border-b border-[#E7E1D8] bg-[#F7F6F2]/50 text-xs uppercase tracking-wider text-[#6B7280]">
              <th class="px-6 py-4 font-medium w-24">Gambar</th>
              <th class="px-6 py-4 font-medium">Informasi Produk</th>
              <th class="px-6 py-4 font-medium w-48">Harga & Status</th>
              <th class="px-6 py-4 font-medium w-40">Dibuat</th>
              <th class="px-6 py-4 font-medium w-32 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E7E1D8]">
            <tr v-if="isLoading" class="bg-white">
              <td colspan="5" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl mb-3 text-[#C65A3A]" />
                <p class="text-sm">Menyelaraskan data...</p>
              </td>
            </tr>
            <tr v-else-if="products.length === 0" class="bg-white">
              <td colspan="5" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-inbox" class="text-5xl mb-3 text-slate-300" />
                <p class="text-sm">Belum ada produk yang ditambahkan.</p>
              </td>
            </tr>
            <tr 
              v-else
              v-for="prod in products" 
              :key="prod.id"
              class="bg-white hover:bg-[#F7F6F2]/60 transition-colors duration-200 group"
            >
              <td class="px-6 py-5">
                <img 
                  v-if="prod.image" 
                  :src="prod.image" 
                  class="w-14 h-14 rounded-xl object-cover border border-[#E7E1D8] shadow-sm"
                  alt="Thumbnail"
                />
                <div v-else class="w-14 h-14 rounded-xl bg-[#F7F6F2] flex items-center justify-center border border-[#E7E1D8] shadow-sm">
                  <UIcon name="i-heroicons-photo" class="text-2xl text-[#E7E1D8]" />
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex flex-col gap-1.5">
                  <div class="flex items-center gap-2.5">
                    <span class="font-semibold text-[#24324A] text-base">{{ prod.name }}</span>
                    <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F7F6F2] text-[#6B7280] border border-[#E7E1D8]">
                      {{ prod.category?.name || 'Tanpa Kategori' }}
                    </span>
                  </div>
                  <p class="text-sm text-[#6B7280] line-clamp-1 max-w-md">{{ prod.subTitle || 'Tidak ada subjudul.' }}</p>
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex flex-col gap-2">
                  <span class="font-semibold text-[#C65A3A]">{{ formatRupiah(prod.price) }}</span>
                  <div class="flex gap-2">
                    <span v-if="prod.isAvailable" class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">Tersedia</span>
                    <span v-else class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20">Kosong</span>
                    
                    <span v-if="prod.isFeatured" class="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20">Unggulan</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-2 text-sm text-[#6B7280]">
                  <UIcon name="i-heroicons-calendar" class="text-[#C65A3A]/70 text-lg" />
                  {{ formatDate(prod.createdAt) }}
                </div>
              </td>
              <td class="px-6 py-5 text-right">
                <div class="flex items-center justify-end gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-200">
                  <UButton 
                    :to="`/admin/products/${prod.id}`" 
                    color="neutral" 
                    variant="soft" 
                    icon="i-heroicons-pencil-square" 
                    class="bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] shadow-sm"
                    title="Edit Produk"
                  />
                  <UButton 
                    color="error" 
                    variant="soft" 
                    icon="i-heroicons-trash"
                    class="hover:bg-red-50 text-red-600 ring-1 ring-inset ring-red-100 shadow-sm"
                    title="Hapus Produk"
                    @click="handleDelete(prod.id)" 
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5. Footer -->
      <template #footer>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[#6B7280]">
          <div>
            Menampilkan 1 sampai <span class="font-medium text-[#24324A]">{{ products.length }}</span> dari <span class="font-medium text-[#24324A]">{{ products.length }}</span> produk
          </div>
          <div class="flex items-center gap-1.5">
            <UButton color="neutral" variant="ghost" icon="i-heroicons-chevron-left" disabled class="text-[#6B7280]" />
            <UButton color="neutral" variant="solid" class="bg-[#24324A] text-white hover:bg-[#24324A] rounded-lg px-3">1</UButton>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-chevron-right" disabled class="text-[#6B7280]" />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const { products, isLoading, fetchProducts, deleteProduct, categories, fetchCategories } = useAdminProducts()

const searchQuery = ref('')
const selectedCategoryId = ref('all')
const selectedStatus = ref('all')

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
  }, 500)
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

const handleDelete = async (id: number) => {
  if (window.confirm('Apakah Anda yakin ingin menghapus produk ini secara permanen?')) {
    await deleteProduct(id)
  }
}
</script>
