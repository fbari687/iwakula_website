<template>
  <div class="space-y-6 lg:space-y-8 pb-12">
    <!-- 1. Header Halaman -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Pencapaian & Penghargaan</h1>
        <p class="text-sm text-[#6B7280] mt-1">Kelola daftar prestasi, sertifikasi, dan penghargaan UMKM Iwakula.</p>
      </div>
      <UButton 
        to="/admin/achievements/create" 
        icon="i-heroicons-plus"
        class="bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-full h-11 px-6 shadow-sm flex items-center justify-center font-medium transition-colors border-0 self-start sm:self-auto cursor-pointer"
      >
        Tambah Pencapaian
      </UButton>
    </div>

    <!-- 2. Statistik Ringkas -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
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
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UInput 
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Cari judul, badge, atau deskripsi..."
            class="w-full sm:w-80"
            :ui="adminInputUi"
          />
        </div>
      </template>

      <!-- Table Wrapper Custom Responsif -->
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[750px]">
          <thead>
            <tr class="border-b border-[#E7E1D8] bg-[#F7F6F2]/60 text-xs uppercase tracking-wider text-[#6B7280]">
              <th class="px-6 py-4 font-semibold w-20">Gambar</th>
              <th class="px-6 py-4 font-semibold w-64">Prestasi & Badge</th>
              <th class="px-6 py-4 font-semibold">Deskripsi Naratif</th>
              <th class="px-6 py-4 font-semibold w-40">Dibuat</th>
              <th class="px-6 py-4 font-semibold w-28 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E7E1D8]">
            <tr v-if="isLoading" class="bg-white">
              <td colspan="5" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl mb-3 text-[#C65A3A]" />
                <p class="text-sm font-medium">Menyelaraskan data pencapaian...</p>
              </td>
            </tr>
            <tr v-else-if="filteredAchievements.length === 0" class="bg-white">
              <td colspan="5" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-trophy" class="text-5xl mb-3 text-[#E7E1D8]" />
                <p class="text-sm font-medium text-[#24324A]">Belum ada pencapaian yang ditemukan.</p>
                <p class="text-xs text-[#6B7280] mt-1">Coba sesuaikan kata kunci pencarian atau tambah pencapaian baru.</p>
              </td>
            </tr>
            <tr 
              v-else
              v-for="ach in filteredAchievements" 
              :key="ach.id"
              class="bg-white hover:bg-[#F7F6F2]/60 transition-colors duration-200 group"
            >
              <td class="px-6 py-4">
                <img 
                  v-if="ach.image" 
                  :src="ach.image" 
                  class="w-12 h-12 rounded-xl object-cover border border-[#E7E1D8] shadow-xs"
                  alt="Thumbnail Pencapaian"
                />
                <div v-else class="w-12 h-12 rounded-xl bg-[#F7F6F2] flex items-center justify-center border border-[#E7E1D8]">
                  <UIcon name="i-heroicons-photo" class="text-xl text-[#9CA3AF]" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1.5">
                  <span class="inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#C65A3A]/10 text-[#C65A3A] border border-[#C65A3A]/20">
                    {{ ach.badge }}
                  </span>
                  <span class="font-semibold text-[#24324A] text-base">{{ ach.title }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-xs text-[#6B7280] line-clamp-2 max-w-md">{{ ach.description || 'Tidak ada deskripsi.' }}</p>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2 text-xs text-[#6B7280] font-medium">
                  <UIcon name="i-heroicons-calendar" class="text-[#C65A3A] text-base" />
                  {{ formatDate(ach.createdAt) }}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1.5 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-200">
                  <UButton 
                    :to="`/admin/achievements/${ach.id}`" 
                    color="neutral" 
                    variant="soft" 
                    icon="i-heroicons-pencil-square" 
                    class="bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] shadow-xs cursor-pointer"
                    title="Edit Pencapaian"
                  />
                  <UButton 
                    color="error" 
                    variant="soft" 
                    icon="i-heroicons-trash"
                    class="hover:bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-100 shadow-xs cursor-pointer"
                    title="Hapus Pencapaian"
                    @click="handleDelete(ach.id)" 
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
            Menampilkan <span class="font-semibold text-[#24324A]">{{ filteredAchievements.length }}</span> dari <span class="font-semibold text-[#24324A]">{{ achievements.length }}</span> pencapaian
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
      title="Hapus Pencapaian"
      :description="selectedAchievement ? `Apakah Anda yakin ingin menghapus pencapaian '${selectedAchievement.title}' secara permanen? Data sertifikasi dan gambar akan dihapus.` : 'Apakah Anda yakin ingin menghapus pencapaian ini?'"
      :loading="isDeleting"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const { achievements, isLoading, fetchAchievements, deleteAchievement } = useAdminAchievements()
const searchQuery = ref('')
const isDeleteModalOpen = ref(false)
const selectedAchievement = ref<any | null>(null)
const isDeleting = ref(false)

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

const handleDelete = (id: number) => {
  const ach = achievements.value.find(a => a.id === id)
  selectedAchievement.value = ach || null
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (!selectedAchievement.value) return
  isDeleting.value = true
  try {
    await deleteAchievement(selectedAchievement.value.id)
    isDeleteModalOpen.value = false
    selectedAchievement.value = null
  } finally {
    isDeleting.value = false
  }
}
</script>
