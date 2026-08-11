<template>
  <header class="h-[72px] bg-[#FBFAF8] border-b border-[#E7E1D8] flex items-center justify-between px-4 lg:px-8 shrink-0 font-body select-none">
    <!-- Left: Hamburger (Mobile & Tablet Only) -->
    <div class="flex items-center lg:hidden">
      <UButton 
        color="neutral"
        variant="ghost"
        icon="i-heroicons-bars-3"
        aria-label="Buka Menu Navigasi"
        class="text-[#24324A] hover:bg-[#F3EEE8] hover:text-[#C65A3A] p-2 rounded-[14px] transition-colors focus-visible:ring-2 focus-visible:ring-[#C65A3A]"
        @click="$emit('openDrawer')"
      />
    </div>

    <!-- Right: Profile Info & Dropdown -->
    <div class="flex items-center gap-3 ml-auto">
      <UDropdownMenu
        :items="profileMenuItems"
        :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8
        }"
        :ui="{
          content: 'w-56 bg-[#FBFAF8] border border-[#E7E1D8] rounded-[16px] shadow-lg p-1.5 text-[#24324A] z-50 dark:bg-[#FBFAF8] dark:text-[#24324A]',
          item: 'text-[#24324A] hover:!bg-[#C65A3A] hover:!text-white data-[highlighted]:!bg-[#C65A3A] data-[highlighted]:!text-white cursor-pointer rounded-xl px-3 py-2 transition-colors font-medium text-sm'
        }"
      >
        <button 
          type="button" 
          aria-label="Profil Administrator"
          class="flex items-center gap-3 p-1.5 rounded-[14px] hover:bg-[#F3EEE8] transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C65A3A]"
        >
          <div class="hidden sm:flex flex-col items-end">
            <span class="text-[14px] font-semibold text-[#24324A] group-hover:text-[#C65A3A] transition-colors">
              {{ user?.name || 'Super Admin' }}
            </span>
            <span class="text-[11px] text-[#6B7280] font-medium">Administrator</span>
          </div>

          <!-- Avatar dengan Inisial Nampak Premium -->
          <UAvatar 
            :alt="user?.name || 'Admin'"
            size="md"
            class="bg-[#C65A3A]/10 text-[#C65A3A] font-bold border border-[#C65A3A]/20 ring-0 shadow-xs"
          />

          <UIcon 
            name="i-heroicons-chevron-down" 
            class="w-4 h-4 text-[#6B7280] group-hover:text-[#C65A3A] transition-colors hidden sm:block" 
          />
        </button>
      </UDropdownMenu>
    </div>
  </header>
</template>

<script setup lang="ts">
const { user, logout } = useAuth()
const router = useRouter()
const toast = useToast()

defineEmits<{
  (e: 'openDrawer'): void
}>()

const handleLogout = async () => {
  const res = await logout()
  if (res.success) {
    toast.add({
      title: 'Logout Berhasil',
      description: 'Anda telah keluar dari sesi admin.',
      color: 'success'
    })
    router.push('/')
  }
}

const profileMenuItems = [
  [
    {
      label: user.value?.email || 'admin@iwakula.com',
      icon: 'i-heroicons-envelope',
      disabled: true
    }
  ],
  [
    {
      label: 'Dasbor Utama',
      icon: 'i-heroicons-squares-2x2',
      onSelect: () => router.push('/admin')
    },
    {
      label: 'Kelola Produk',
      icon: 'i-heroicons-cube',
      onSelect: () => router.push('/admin/products')
    }
  ],
  [
    {
      label: 'Keluar Sesi',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      onSelect: handleLogout
    }
  ]
]
</script>
