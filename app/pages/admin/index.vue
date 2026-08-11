<template>
  <div class="max-w-7xl mx-auto space-y-8 pb-12">
    <!-- Header -->
    <div>
      <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Dasbor Utama</h1>
      <p class="text-sm text-[#6B7280] mt-1">Ringkasan statistik dan metrik operasional Iwakula secara real-time.</p>
    </div>

    <!-- Spinner Loading -->
    <div v-if="isLoading" class="flex justify-center p-16">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-[#C65A3A]" />
    </div>

    <template v-else>
      <!-- Metrik Grid (Dinamis) -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <!-- Card 1: Total Produk -->
        <UCard 
          class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm hover:shadow-md transition-shadow"
          :ui="{ body: 'p-6', root: 'ring-1 ring-[#E7E1D8]' }"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#C65A3A] border border-[#E7E1D8]">
              <UIcon name="i-heroicons-cube" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Total Produk</p>
              <p class="text-2xl font-bold text-[#24324A]">{{ products.length }}</p>
              <p class="text-xs text-[#C65A3A] mt-0.5 font-medium">{{ availableProductsCount }} Produk Tersedia</p>
            </div>
          </div>
        </UCard>

        <!-- Card 2: Kategori -->
        <UCard 
          class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm hover:shadow-md transition-shadow"
          :ui="{ body: 'p-6', root: 'ring-1 ring-[#E7E1D8]' }"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#C65A3A] border border-[#E7E1D8]">
              <UIcon name="i-heroicons-tag" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Total Kategori</p>
              <p class="text-2xl font-bold text-[#24324A]">{{ categories.length }}</p>
              <p class="text-xs text-[#6B7280] mt-0.5">Kategori Menu Olahan</p>
            </div>
          </div>
        </UCard>

        <!-- Card 3: Achievement -->
        <UCard 
          class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm hover:shadow-md transition-shadow"
          :ui="{ body: 'p-6', root: 'ring-1 ring-[#E7E1D8]' }"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#C65A3A] border border-[#E7E1D8]">
              <UIcon name="i-heroicons-trophy" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Pencapaian</p>
              <p class="text-2xl font-bold text-[#24324A]">{{ achievements.length }}</p>
              <p class="text-xs text-[#6B7280] mt-0.5">Penghargaan & Sertifikasi</p>
            </div>
          </div>
        </UCard>

        <!-- Card 4: Kontak & Sosmed -->
        <UCard 
          class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm hover:shadow-md transition-shadow"
          :ui="{ body: 'p-6', root: 'ring-1 ring-[#E7E1D8]' }"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#C65A3A] border border-[#E7E1D8]">
              <UIcon name="i-heroicons-phone" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Saluran Kontak</p>
              <p class="text-2xl font-bold text-[#24324A]">{{ contacts.length }}</p>
              <p class="text-xs text-[#6B7280] mt-0.5">WhatsApp, Email & Sosmed</p>
            </div>
          </div>
        </UCard>

      </div>

      <!-- Section 2: Produk Terbaru & Aksi Cepat -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Tabel Produk Terbaru (2 Kolom di Desktop) -->
        <UCard 
          class="lg:col-span-2 bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden flex flex-col"
          :ui="{ body: 'p-0', header: 'p-5 sm:px-6', root: 'ring-1 ring-[#E7E1D8]' }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-[#24324A]">Produk Terbaru</h2>
                <p class="text-xs text-[#6B7280] mt-0.5">Daftar produk olahan ikan yang baru ditambahkan.</p>
              </div>
              <UButton 
                to="/admin/products" 
                variant="ghost" 
                color="neutral" 
                trailing-icon="i-heroicons-arrow-right"
                class="text-xs font-semibold text-[#C65A3A] hover:bg-[#F7F6F2]"
              >
                Lihat Semua
              </UButton>
            </div>
          </template>

          <div class="overflow-x-auto">
            <table class="w-full text-left min-w-[500px]">
              <thead>
                <tr class="border-b border-[#E7E1D8] bg-[#F7F6F2]/50 text-xs uppercase tracking-wider text-[#6B7280]">
                  <th class="px-6 py-3 font-medium w-16">Foto</th>
                  <th class="px-6 py-3 font-medium">Produk</th>
                  <th class="px-6 py-3 font-medium">Harga</th>
                  <th class="px-6 py-3 font-medium w-28 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#E7E1D8]">
                <tr v-if="recentProducts.length === 0" class="bg-white">
                  <td colspan="4" class="px-6 py-10 text-center text-sm text-[#6B7280]">
                    Belum ada produk yang didaftarkan.
                  </td>
                </tr>
                <tr 
                  v-else
                  v-for="prod in recentProducts" 
                  :key="prod.id"
                  class="bg-white hover:bg-[#F7F6F2]/60 transition-colors"
                >
                  <td class="px-6 py-3.5">
                    <img 
                      v-if="prod.image" 
                      :src="prod.image" 
                      class="w-10 h-10 rounded-lg object-cover border border-[#E7E1D8]"
                      alt="Thumbnail"
                    />
                    <div v-else class="w-10 h-10 rounded-lg bg-[#F7F6F2] flex items-center justify-center border border-[#E7E1D8]">
                      <UIcon name="i-heroicons-photo" class="text-lg text-[#E7E1D8]" />
                    </div>
                  </td>
                  <td class="px-6 py-3.5">
                    <div class="flex flex-col">
                      <NuxtLink :to="`/admin/products/${prod.id}`" class="font-semibold text-[#24324A] text-sm hover:text-[#C65A3A]">
                        {{ prod.name }}
                      </NuxtLink>
                      <span class="text-xs text-[#6B7280]">{{ prod.category?.name || 'Tanpa Kategori' }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-3.5 text-sm font-medium text-[#24324A]">
                    {{ formatRupiah(prod.price) }}
                  </td>
                  <td class="px-6 py-3.5 text-right">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      :class="prod.isAvailable ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'"
                    >
                      {{ prod.isAvailable ? 'Tersedia' : 'Kosong' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>

        <!-- Panel Aksi Cepat & Statistik Kategori (1 Kolom) -->
        <div class="space-y-6">
          <!-- Card Tindakan Cepat -->
          <UCard 
            class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm"
            :ui="{ body: 'p-6', root: 'ring-1 ring-[#E7E1D8]' }"
          >
            <h3 class="text-base font-semibold text-[#24324A] mb-4">Tindakan Cepat</h3>
            <div class="grid grid-cols-1 gap-3">
              <UButton 
                to="/admin/products/create"
                icon="i-heroicons-cube-transparent"
                variant="soft"
                class="justify-start bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] py-3 rounded-xl font-medium"
              >
                Tambah Produk Baru
              </UButton>
              <UButton 
                to="/admin/categories/create"
                icon="i-heroicons-folder-plus"
                variant="soft"
                class="justify-start bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] py-3 rounded-xl font-medium"
              >
                Tambah Kategori Baru
              </UButton>
              <UButton 
                to="/admin/achievements/create"
                icon="i-heroicons-trophy"
                variant="soft"
                class="justify-start bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] py-3 rounded-xl font-medium"
              >
                Tambah Pencapaian
              </UButton>
              <UButton 
                to="/admin/contacts"
                icon="i-heroicons-phone"
                variant="soft"
                class="justify-start bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] py-3 rounded-xl font-medium"
              >
                Kelola Kontak & Sosmed
              </UButton>
            </div>
          </UCard>

          <!-- Ringkasan Kategori -->
          <UCard 
            class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm"
            :ui="{ body: 'p-6', root: 'ring-1 ring-[#E7E1D8]' }"
          >
            <h3 class="text-base font-semibold text-[#24324A] mb-3">Ringkasan Kategori</h3>
            <div class="space-y-3">
              <div v-for="cat in categories" :key="cat.id" class="flex items-center justify-between text-sm py-1 border-b border-[#E7E1D8]/60 last:border-0">
                <span class="text-[#24324A] font-medium">{{ cat.name }}</span>
                <span class="text-xs font-semibold px-2 py-0.5 bg-[#F7F6F2] text-[#6B7280] rounded-md border border-[#E7E1D8]">
                  {{ countProductsByCategory(cat.id) }} Produk
                </span>
              </div>
            </div>
          </UCard>

        </div>

      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const { products, fetchProducts } = useAdminProducts()
const { categories, fetchCategories } = useAdminCategories()
const { achievements, fetchAchievements } = useAdminAchievements()
const { contacts, fetchContacts } = useAdminContacts()

const isLoading = ref(true)

onMounted(async () => {
  isLoading.value = true
  try {
    await Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchAchievements(),
      fetchContacts()
    ])
  } catch (err) {
    console.error('Failed to load dashboard data:', err)
  } finally {
    isLoading.value = false
  }
})

const availableProductsCount = computed(() => {
  return products.value.filter(p => p.isAvailable).length
})

const recentProducts = computed(() => {
  // Ambil 5 produk teratas (terbaru)
  return products.value.slice(0, 5)
})

const countProductsByCategory = (categoryId: number) => {
  return products.value.filter(p => p.categoryId === categoryId).length
}

const formatRupiah = (number: number) => {
  if (!number) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number)
}
</script>
