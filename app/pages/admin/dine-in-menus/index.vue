<template>
  <div class="space-y-6 lg:space-y-8 pb-12">
    <!-- 1. Header Halaman -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-semibold text-[#24324A]">Gambar Menu Kedai (Dine In)</h1>
        <p class="text-sm text-[#6B7280] mt-1">Kelola daftar gambar menu siap santap yang tampil pada halaman Kedai Dine In.</p>
      </div>
      <UButton 
        icon="i-heroicons-plus"
        class="bg-[#C65A3A] hover:bg-[#b04f32] text-white rounded-full h-11 px-6 shadow-sm flex items-center justify-center font-medium transition-colors border-0 self-start sm:self-auto cursor-pointer"
        @click="openCreateModal"
      >
        Tambah Gambar Menu
      </UButton>
    </div>

    <!-- 2. Statistik Ringkas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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

    <!-- 3. Panel Utama Tabel -->
    <UCard 
      class="bg-[#FBFAF8] border-[#E7E1D8] rounded-[20px] shadow-sm overflow-hidden flex flex-col"
      :ui="{ body: 'p-0', header: 'p-4 sm:px-6 sm:py-5', footer: 'p-4 sm:px-6', root: 'ring-1 ring-[#E7E1D8]' }"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[500px]">
          <thead>
            <tr class="border-b border-[#E7E1D8] bg-[#F7F6F2]/60 text-xs uppercase tracking-wider text-[#6B7280]">
              <th class="px-6 py-4 font-semibold w-36">Pratinjau Gambar</th>
              <th class="px-6 py-4 font-semibold w-36">Urutan Tampil</th>
              <th class="px-6 py-4 font-semibold">Dibuat Pada</th>
              <th class="px-6 py-4 font-semibold w-28 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E7E1D8]">
            <tr v-if="pending" class="bg-white">
              <td colspan="4" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl mb-3 text-[#C65A3A]" />
                <p class="text-sm font-medium">Memuat gambar menu kedai...</p>
              </td>
            </tr>
            <tr v-else-if="items.length === 0" class="bg-white">
              <td colspan="4" class="px-6 py-16 text-center text-[#6B7280]">
                <UIcon name="i-heroicons-photo" class="text-5xl mb-3 text-[#E7E1D8]" />
                <p class="text-sm font-medium text-[#24324A]">Belum ada gambar menu kedai.</p>
              </td>
            </tr>
            <tr 
              v-else
              v-for="(item, idx) in items" 
              :key="item.id"
              class="bg-white hover:bg-[#F7F6F2]/60 transition-colors duration-200 group"
            >
              <td class="px-6 py-4">
                <div 
                  class="relative group cursor-pointer w-24 h-28 rounded-xl border border-[#E7E1D8] overflow-hidden bg-[#FBFAF8] shadow-xs transition-transform hover:scale-[1.03]"
                  @click="openLightbox(item.imageUrl)"
                  title="Klik untuk perbesar gambar"
                >
                  <img 
                    :src="item.imageUrl" 
                    class="w-full h-full object-cover"
                    alt="Menu Kedai"
                  />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1">
                    <UIcon name="i-heroicons-magnifying-glass-plus" class="text-xl" />
                    <span class="text-[10px] font-semibold">Perbesar</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#24324A]/10 text-[#24324A]">
                  Urutan Ke-{{ item.displayOrder ? item.displayOrder : idx + 1 }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2 text-xs text-[#6B7280] font-medium">
                  <UIcon name="i-heroicons-calendar" class="text-[#C65A3A] text-base" />
                  {{ formatDate(item.createdAt) }}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-1.5 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity duration-200">
                  <UButton 
                    color="neutral" 
                    variant="soft" 
                    icon="i-heroicons-pencil-square" 
                    class="bg-[#F7F6F2] hover:bg-white text-[#24324A] ring-1 ring-inset ring-[#E7E1D8] shadow-xs cursor-pointer"
                    title="Edit Gambar Menu"
                    @click="openEditModal(item, idx)"
                  />
                  <UButton 
                    color="error" 
                    variant="soft" 
                    icon="i-heroicons-trash"
                    class="hover:bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-100 shadow-xs cursor-pointer"
                    title="Hapus Gambar Menu"
                    @click="handleDelete(item)" 
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #footer>
        <div class="flex items-center justify-between text-xs text-[#6B7280]">
          <div>
            Total <span class="font-semibold text-[#24324A]">{{ items.length }}</span> gambar menu kedai
          </div>
        </div>
      </template>
    </UCard>

    <!-- Modal Form (Tambah / Edit) - Clean White Styling -->
    <UModal 
      v-model:open="isFormModalOpen" 
      :title="editingItem ? 'Edit Gambar Menu Kedai' : 'Tambah Gambar Menu Kedai'"
      :ui="{ content: 'bg-white dark:bg-white text-[#24324A] dark:text-[#24324A] rounded-[24px] border border-[#E7E1D8] p-6 shadow-xl max-w-lg w-full' }"
    >
      <template #body>
        <form @submit.prevent="saveItem" class="space-y-6 pt-2">
          <!-- File Upload Section -->
          <div>
            <label class="block text-xs font-semibold text-[#24324A] uppercase tracking-wider mb-2">
              File Gambar Menu <span class="text-rose-500">*</span>
            </label>

            <!-- Preview atau Dropzone -->
            <div v-if="imagePreview || form.imageUrl" class="relative w-full h-56 rounded-2xl border border-[#E7E1D8] overflow-hidden shadow-xs group bg-[#FBFAF8]">
              <img :src="imagePreview || form.imageUrl" class="w-full h-full object-contain p-2" alt="Preview Menu Kedai" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <UButton 
                  color="error" 
                  variant="soft" 
                  icon="i-heroicons-trash" 
                  class="bg-white/90 hover:bg-white text-rose-600 rounded-xl cursor-pointer font-medium text-xs px-3 py-1.5" 
                  @click="removeImage"
                >
                  Ganti Gambar
                </UButton>
              </div>
            </div>

            <label 
              v-else 
              class="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E7E1D8] hover:border-[#C65A3A] hover:bg-[#F3EEE8]/60 bg-[#FBFAF8] rounded-2xl cursor-pointer transition-colors"
              :class="{ 'opacity-50 cursor-not-allowed': isUploading }"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <UIcon v-if="isUploading" name="i-heroicons-arrow-path" class="w-8 h-8 mb-3 text-[#C65A3A] animate-spin" />
                <UIcon v-else name="i-heroicons-cloud-arrow-up" class="w-8 h-8 mb-3 text-[#9CA3AF]" />
                <p class="mb-1 text-sm text-[#6B7280]">
                  <span v-if="isUploading" class="font-medium text-[#24324A]">Mengunggah gambar...</span>
                  <span v-else><span class="font-semibold text-[#C65A3A]">Klik untuk unggah</span> fail gambar menu</span>
                </p>
                <p v-if="!isUploading" class="text-xs text-[#9CA3AF]">JPG, PNG, WEBP (Maksimal 5MB)</p>
              </div>
              <input 
                type="file" 
                class="hidden" 
                accept="image/jpeg,image/png,image/webp"
                @change="handleFileSelect"
                :disabled="isUploading"
              />
            </label>
          </div>

          <!-- Display Order Input (Starts at 1 for users, White Background) -->
          <div>
            <label class="block text-xs font-semibold text-[#24324A] uppercase tracking-wider mb-2">
              Urutan Tampil (Posisi Ke-)
            </label>
            <input 
              type="number" 
              v-model.number="displayOrderInput" 
              min="1"
              placeholder="1" 
              class="w-full bg-[#FBFAF8] text-[#24324A] border border-[#E7E1D8] rounded-[14px] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#C65A3A] text-sm font-medium transition-colors"
            />
            <p class="text-xs text-[#6B7280] mt-1.5">Urutan tampil diisi mulai dari angka 1 (1 = Urutan Pertama/Atas).</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E1D8]">
            <UButton color="neutral" variant="ghost" class="text-[#6B7280] hover:text-[#24324A] cursor-pointer" @click="isFormModalOpen = false">Batal</UButton>
            <UButton type="submit" class="bg-[#C65A3A] hover:bg-[#b04f32] text-white cursor-pointer px-6 rounded-xl font-medium" :loading="isSaving">Simpan</UButton>
          </div>
        </form>
      </template>
    </UModal>

    <!-- Modal Konfirmasi Hapus - Clean White Styling -->
    <AdminDeleteModal
      v-model:open="isDeleteModalOpen"
      title="Hapus Gambar Menu Kedai"
      description="Apakah Anda yakin ingin menghapus gambar menu ini? (Minimal harus ada 1 gambar menu kedai di database)"
      :loading="isDeleting"
      @confirm="confirmDelete"
    />

    <!-- Lightbox Component Pratinjau Gambar -->
    <VueEasyLightbox
      :visible="isLightboxOpen"
      :imgs="lightboxImages"
      :index="lightboxIndex"
      @hide="isLightboxOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({ layout: 'admin' })

const toast = useToast()
const items = ref<any[]>([])
const pending = ref(false)

// Lightbox state
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)
const lightboxImages = computed(() => items.value.map(i => i.imageUrl))

const openLightbox = (imageUrl: string) => {
  const idx = lightboxImages.value.indexOf(imageUrl)
  lightboxIndex.value = idx !== -1 ? idx : 0
  isLightboxOpen.value = true
}

const isFormModalOpen = ref(false)
const editingItem = ref<any | null>(null)
const isSaving = ref(false)
const isUploading = ref(false)

const selectedFile = ref<File | null>(null)
const imagePreview = ref<string>('')

const isDeleteModalOpen = ref(false)
const selectedItem = ref<any | null>(null)
const isDeleting = ref(false)

const form = ref({
  imageUrl: '',
  displayOrder: 1,
})

const displayOrderInput = computed({
  get: () => form.value.displayOrder,
  set: (val: number) => {
    form.value.displayOrder = Math.max(1, val || 1)
  }
})

const fetchItems = async () => {
  pending.value = true
  try {
    const res: any = await $fetch('/api/admin/dine-in-menus')
    items.value = res.data || []
  } catch (err: any) {
    toast.add({ title: 'Gagal', description: 'Gagal mengambil data menu kedai', color: 'error' })
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  fetchItems()
})

const statistics = computed(() => {
  return [
    { label: 'Total Gambar Menu', value: items.value.length, icon: 'i-heroicons-photo' },
    { label: 'Status Batas Minimal', value: items.value.length <= 1 ? 'Batas Minimal (1)' : 'Aman', icon: 'i-heroicons-shield-check' },
  ]
})

const formatDate = (dateInput: string | Date | null | undefined) => {
  if (!dateInput) return '-'
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const handleFileSelect = (event: Event) => {
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

  selectedFile.value = file
  imagePreview.value = URL.createObjectURL(file)
  form.value.imageUrl = ''
  target.value = ''
}

const removeImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  selectedFile.value = null
  imagePreview.value = ''
  form.value.imageUrl = ''
}

const openCreateModal = () => {
  editingItem.value = null
  selectedFile.value = null
  imagePreview.value = ''
  form.value = { imageUrl: '', displayOrder: items.value.length + 1 }
  isFormModalOpen.value = true
}

const openEditModal = (item: any, idx: number) => {
  editingItem.value = item
  selectedFile.value = null
  imagePreview.value = ''
  form.value = { 
    imageUrl: item.imageUrl, 
    displayOrder: item.displayOrder ? item.displayOrder : (idx + 1) 
  }
  isFormModalOpen.value = true
}

const saveItem = async () => {
  if (!form.value.imageUrl && !selectedFile.value) {
    toast.add({ title: 'Peringatan', description: 'Gambar menu wajib diunggah', color: 'warning' })
    return
  }

  isSaving.value = true
  try {
    const payload = { ...form.value }

    // Jika pengguna memilih file baru, upload ke server terlebih dahulu
    if (selectedFile.value) {
      isUploading.value = true
      const formData = new FormData()
      formData.append('image', selectedFile.value)

      const uploadRes: any = await $fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (uploadRes.success && uploadRes.data?.url) {
        payload.imageUrl = uploadRes.data.url
      } else {
        throw new Error('Gagal mengunggah file gambar ke server')
      }
    }

    if (editingItem.value) {
      await $fetch(`/api/admin/dine-in-menus/${editingItem.value.id}`, {
        method: 'PUT',
        body: payload,
      })
      toast.add({ title: 'Sukses', description: 'Berhasil memperbarui gambar menu kedai', color: 'success' })
    } else {
      await $fetch('/api/admin/dine-in-menus', {
        method: 'POST',
        body: payload,
      })
      toast.add({ title: 'Sukses', description: 'Berhasil menambahkan gambar menu kedai baru', color: 'success' })
    }
    isFormModalOpen.value = false
    fetchItems()
  } catch (err: any) {
    toast.add({ title: 'Gagal', description: err.data?.statusMessage || err.message || 'Terjadi kesalahan saat menyimpan', color: 'error' })
  } finally {
    isSaving.value = false
    isUploading.value = false
  }
}

const handleDelete = (item: any) => {
  if (items.value.length <= 1) {
    toast.add({ title: 'Gagal Hapus', description: 'Gagal: Minimal harus ada 1 gambar menu kedai di database.', color: 'error' })
    return
  }
  selectedItem.value = item
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (!selectedItem.value) return
  isDeleting.value = true
  try {
    await $fetch(`/api/admin/dine-in-menus/${selectedItem.value.id}`, {
      method: 'DELETE',
    })
    toast.add({ title: 'Sukses', description: 'Berhasil menghapus gambar menu kedai', color: 'success' })
    isDeleteModalOpen.value = false
    selectedItem.value = null
    fetchItems()
  } catch (err: any) {
    toast.add({ title: 'Gagal Hapus', description: err.data?.statusMessage || 'Minimal harus ada 1 gambar menu kedai di database', color: 'error' })
  } finally {
    isDeleting.value = false
  }
}
</script>
