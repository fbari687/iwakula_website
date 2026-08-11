<template>
  <div class="space-y-6 lg:space-y-8 pb-12">
    <!-- 1. Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Pencapaian & Penghargaan</h1>
        <p class="text-sm text-[#6B7280] mt-1">Kelola daftar prestasi, sertifikasi, dan pencapaian UMKM Iwakula.</p>
      </div>
      <UButton 
        to="/admin/achievements/create" 
        icon="i-heroicons-plus"
        class="bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-full h-11 lg:h-12 px-6 shadow-sm flex items-center justify-center font-medium transition-colors border-0"
      >
        Tambah Pencapaian
      </UButton>
    </div>

    <!-- 2. Statistik Ringkas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <UCard 
        v-for="(stat, index) in statistics" 
        :key="index"
        class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm"
        :ui="{ body: 'p-5 sm:p-6', root: 'ring-1 ring-[#E7E1D8]' }"
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
      :ui="{ body: 'p-0', header: 'p-4 sm:px-6 sm:py-5', footer: 'p-4 sm:px-6', root: 'ring-1 ring-[#E7E1D8]' }"
    >
      <template #header>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput 
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Cari pencapaian..."
            class="w-full sm:w-72"
            :ui="{ 
              root: 'rounded-[14px] shadow-none ring-1 ring-inset ring-[#E7E1D8] hover:ring-[#D6CEC2] focus-within:ring-2 focus-within:ring-[#C65A3A]',
              base: 'bg-[#FBFAF8] text-[#24324A] placeholder:text-[#9CA3AF]',
              leadingIcon: 'text-[#6B7280]'
            }"
          />
        </div>
      </template>

      <!-- Table Wrapper Custom -->
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[800px]">
          <thead>
            <tr class="border-b border-[#E7E1D8] bg-[#F7F6F2]/50 text-xs uppercase tracking-wider text-[#6B7280]">
              <th class="px-6 py-4 font-medium w-24">Gambar</th>
              <th class="px-6 py-4 font-medium">Prestasi</th>
              <th class="px-6 py-4 font-medium">Deskripsi</th>
              <th class="px-6 py-4 font-medium w-44">Dibuat</th>
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
            <tr v-else-if="filteredAchievements.length === 0" class="bg-white">
              <td colspan="5" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-trophy" class="text-5xl mb-3 text-slate-300" />
                <p class="text-sm">Belum ada pencapaian yang ditambahkan.</p>
              </td>
            </tr>
            <tr 
              v-else
              v-for="ach in filteredAchievements" 
              :key="ach.id"
              class="bg-white hover:bg-[#F7F6F2]/60 transition-colors duration-200 group"
            >
              <td class="px-6 py-5">
                <img 
                  v-if="ach.image" 
                  :src="ach.image" 
                  class="w-14 h-14 rounded-xl object-cover border border-[#E7E1D8] shadow-sm"
                  alt="Thumbnail"
                />
                <div v-else class="w-14 h-14 rounded-xl bg-[#F7F6F2] flex items-center justify-center border border-[#E7E1D8] shadow-sm">
                  <UIcon name="i-heroicons-photo" class="text-2xl text-[#E7E1D8]" />
                </div>
              </td>
              <td class="px-6 py-5">
                <div class="flex flex-col gap-1.5">
                  <span class="inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#C65A3A]/10 text-[#C65A3A] border border-[#C65A3A]/20">
                    {{ ach.badge }}
                  </span>
                  <span class="font-semibold text-[#24324A] text-base">{{ ach.title }}</span>
                </div>
              </td>
              <td class="px-6 py-5">
                <p class="text-sm text-[#6B7280] line-clamp-2 max-w-md">{{ ach.description || 'Tidak ada deskripsi.' }}</p>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center gap-2 text-sm text-[#6B7280]">
                  <UIcon name="i-heroicons-calendar" class="text-[#C65A3A]/70 text-lg" />
                  {{ formatDate(ach.createdAt) }}
                </div>
              </td>
              <td class="px-6 py-5 text-right">
                <div class="flex items-center justify-end gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-200">
                  <UButton 
                    :to="`/admin/achievements/${ach.id}`" 
                    color="neutral" 
                    variant="soft" 
                    icon="i-heroicons-pencil-square" 
                    class="bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] shadow-sm"
                    title="Edit Pencapaian"
                  />
                  <UButton 
                    color="error" 
                    variant="soft" 
                    icon="i-heroicons-trash"
                    class="hover:bg-red-50 text-red-600 ring-1 ring-inset ring-red-100 shadow-sm"
                    title="Hapus Pencapaian"
                    @click="handleDelete(ach.id)" 
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
            Menampilkan <span class="font-medium text-[#24324A]">{{ filteredAchievements.length }}</span> dari <span class="font-medium text-[#24324A]">{{ achievements.length }}</span> pencapaian
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const { achievements, isLoading, fetchAchievements, deleteAchievement } = useAdminAchievements()
const searchQuery = ref('')

onMounted(() => {
  fetchAchievements()
})

const filteredAchievements = computed(() => {
  if (!searchQuery.value) return achievements.value
  const q = searchQuery.value.toLowerCase()
  return achievements.value.filter(a => 
    a.title.toLowerCase().includes(q) || 
    a.badge.toLowerCase().includes(q) || 
    a.description.toLowerCase().includes(q)
  )
})

const statistics = computed(() => {
  const total = achievements.value.length
  const withImage = achievements.value.filter(a => a.image && a.image.trim() !== '').length
  
  let latestDate = '-'
  if (total > 0 && achievements.value[0]?.createdAt) {
    latestDate = formatDate(achievements.value[0].createdAt)
  }

  return [
    { label: 'Total Pencapaian', value: total, icon: 'i-heroicons-trophy' },
    { label: 'Dengan Gambar', value: withImage, icon: 'i-heroicons-photo' },
    { label: 'Terbaru Ditambahkan', value: latestDate, icon: 'i-heroicons-clock' },
  ]
})

const formatDate = (dateInput: string | Date | null | undefined) => {
  if (!dateInput) return '-'
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const handleDelete = async (id: number) => {
  if (window.confirm('Apakah Anda yakin ingin menghapus pencapaian ini secara permanen?')) {
    await deleteAchievement(id)
  }
}
</script>
