<template>
  <div class="flex flex-col w-64 h-full bg-[#FBFAF8] border-r border-[#E7E1D8] font-body select-none">
    <!-- Logo Area -->
    <div class="flex items-center justify-between h-[72px] px-6 border-b border-[#E7E1D8] shrink-0">
      <NuxtLink to="/admin" class="flex items-center gap-2 group">
        <span class="text-2xl font-bold font-sans tracking-tight text-[#24324A]">
          Iwa<span class="text-[#C65A3A]">kula</span>
        </span>
        <span class="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C65A3A]/10 text-[#C65A3A] border border-[#C65A3A]/20">
          CMS
        </span>
      </NuxtLink>
    </div>

    <!-- Navigation List -->
    <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1.5" @click="handleNavClick">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-[14px] transition-all duration-200 group font-medium text-[15px]"
        :class="[
          isActive(item.path)
            ? 'bg-[#C65A3A] text-white shadow-sm font-semibold' 
            : 'text-[#24324A] hover:bg-[#F3EEE8] hover:text-[#C65A3A]'
        ]"
      >
        <UIcon 
          :name="item.icon" 
          class="w-5 h-5 flex-shrink-0 transition-colors duration-200"
          :class="[
            isActive(item.path)
              ? 'text-white' 
              : 'text-[#6B7280] group-hover:text-[#C65A3A]'
          ]"
        />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <!-- Logout Area -->
    <div class="p-4 border-t border-[#E7E1D8] shrink-0">
      <button 
        type="button"
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-[14px] transition-all duration-200 text-[#6B7280] hover:bg-rose-50 hover:text-rose-600 group font-medium text-[15px] cursor-pointer"
      >
        <UIcon 
          name="i-heroicons-arrow-right-on-rectangle" 
          class="w-5 h-5 flex-shrink-0 text-[#6B7280] group-hover:text-rose-600 transition-colors duration-200"
        />
        <span>Keluar Sesi</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { logout } = useAuth()
const toast = useToast()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const navItems = [
  { name: 'Dasbor', path: '/admin', icon: 'i-heroicons-squares-2x2' },
  { name: 'Produk', path: '/admin/products', icon: 'i-heroicons-cube' },
  { name: 'Kategori', path: '/admin/categories', icon: 'i-heroicons-tag' },
  { name: 'Menu Kedai', path: '/admin/dine-in-menus', icon: 'i-heroicons-book-open' },
  { name: 'Achievement', path: '/admin/achievements', icon: 'i-heroicons-trophy' },
  { name: 'Kontak', path: '/admin/contacts', icon: 'i-heroicons-phone' }
]

const isActive = (path: string) => {
  if (path === '/admin') {
    return route.path === path
  }
  return route.path.startsWith(path)
}

const handleNavClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.closest('a')) {
    emit('close')
  }
}

const handleLogout = async () => {
  const res = await logout()
  if (res.success) {
    toast.add({
      title: 'Logout Berhasil',
      description: 'Anda telah keluar dari sesi admin.',
      color: 'success'
    })
    emit('close')
    router.push('/')
  }
}
</script>
