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
        class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm"
        :ui="{ body: { padding: 'p-5 sm:p-6' }, ring: 'ring-1 ring-[#E7E1D8]' }"
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
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden flex flex-col"
      :ui="{ body: { padding: 'p-0' }, header: { padding: 'p-4 sm:px-6 sm:py-5' }, footer: { padding: 'p-4 sm:px-6' }, ring: 'ring-1 ring-[#E7E1D8]' }"
    >
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput 
            icon="i-heroicons-magnifying-glass"
            placeholder="Cari produk..."
            class="w-full sm:w-72"
            :ui="{ 
              rounded: 'rounded-[14px]',
              placeholder: 'placeholder:text-[#9CA3AF]',
              icon: { base: 'text-[#6B7280]' },
              base: 'bg-[#FBFAF8] text-[#24324A]',
              color: { 
                white: { 
                  outline: 'shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]' 
                } 
              } 
            }"
          />
          <USelect 
            :items="['Terbaru', 'Terlama', 'Nama A-Z']"
            model-value="Terbaru"
            class="w-full sm:w-48"
            :ui="{ 
              rounded: 'rounded-[14px]',
              icon: { base: 'text-[#6B7280]' },
              base: 'bg-[#FBFAF8] text-[#24324A]',
              color: { 
                white: { 
                  outline: 'shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus:ring-2 focus:ring-[#C65A3A]' 
                } 
              },
              content: 'bg-[#FBFAF8] border border-[#E7E1D8]',
              item: {
                base: '!text-[#24324A] hover:!bg-[#F3EEE8]',
                label: '!text-[#24324A]',
                active: '!bg-[#C65A3A] !text-white',
                selected: '!bg-[#C65A3A] !text-white',
                icon: { base: '!text-[#24324A]' },
                trailingIcon: { base: '!text-[#24324A]' }
              }
            }"
          />
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
                  {{ formatDate(prod.createdAt as string) }}
                </div>
              </td>
              <td class="px-6 py-5 text-right">
                <div class="flex items-center justify-end gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-200">
                  <UButton 
                    :to="`/admin/products/${prod.id}`" 
                    color="gray" 
                    variant="soft" 
                    icon="i-heroicons-pencil-square" 
                    class="bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] shadow-sm"
                    title="Edit Produk"
                  />
                  <UButton 
                    color="red" 
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
            <UButton color="gray" variant="ghost" icon="i-heroicons-chevron-left" disabled class="text-[#6B7280]" />
            <UButton color="gray" variant="solid" class="bg-[#24324A] text-white hover:bg-[#24324A] rounded-lg px-3">1</UButton>
            <UButton color="gray" variant="ghost" icon="i-heroicons-chevron-right" disabled class="text-[#6B7280]" />
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const { products, isLoading, fetchProducts, deleteProduct } = useAdminProducts()

onMounted(() => {
  fetchProducts()
})

const statistics = computed(() => {
  const total = products.value.length
  const available = products.value.filter(p => p.isAvailable).length
  const featured = products.value.filter(p => p.isFeatured).length
  
  let latestDate = '-'
  if (total > 0 && products.value[0]?.createdAt) {
    latestDate = formatDate(products.value[0].createdAt as string)
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

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  const d = new Date(dateString)
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const handleDelete = async (id: number) => {
  if (window.confirm('Apakah Anda yakin ingin menghapus produk ini secara permanen?')) {
    await deleteProduct(id)
  }
}
</script>
