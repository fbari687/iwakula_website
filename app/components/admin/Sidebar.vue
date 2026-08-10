<template>
  <div class="flex flex-col w-64 h-full bg-[#FBFAF8] border-r border-[#E7E1D8]">
    <!-- Logo Area -->
    <div class="flex items-center h-[72px] px-6 border-b border-[#E7E1D8] shrink-0">
      <span class="text-2xl font-bold font-sans tracking-tight text-[#24324A]">
        Iwa<span class="text-[#C65A3A]">kula</span>
      </span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-2 font-body" @click="$emit('close')">
      <NuxtLink 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group"
        :class="[
          $route.path === item.path 
            ? 'bg-[#C65A3A] text-white shadow-sm' 
            : 'text-[#24324A] hover:bg-[#E7E1D8]'
        ]"
      >
        <UIcon 
          :name="item.icon" 
          class="w-5 h-5 flex-shrink-0 transition-colors duration-200"
          :class="[
            $route.path === item.path 
              ? 'text-white' 
              : 'text-[#6B7280] group-hover:text-[#24324A]'
          ]"
        />
        <span class="font-medium text-[15px]">{{ item.name }}</span>
      </NuxtLink>
    </nav>

    <!-- Logout Area -->
    <div class="p-4 border-t border-[#E7E1D8] shrink-0">
      <button 
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-[#24324A] hover:bg-[#E7E1D8] group font-body"
      >
        <UIcon 
          name="i-heroicons-arrow-right-on-rectangle" 
          class="w-5 h-5 flex-shrink-0 text-[#6B7280] group-hover:text-[#24324A] transition-colors duration-200"
        />
        <span class="font-medium text-[15px]">Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { logout } = useAuth()
const toast = useToast()

const navItems = [
  { name: 'Dasbor', path: '/admin', icon: 'i-heroicons-squares-2x2' },
  { name: 'Produk', path: '/admin/products', icon: 'i-heroicons-cube' },
  { name: 'Kategori', path: '/admin/categories', icon: 'i-heroicons-tag' },
  { name: 'Achievement', path: '/admin/achievements', icon: 'i-heroicons-trophy' },
  { name: 'Kontak', path: '/admin/contacts', icon: 'i-heroicons-phone' }
]

// Expose a close drawer event for mobile
const emit = defineEmits(['close'])

const handleLogout = async () => {
  const res = await logout()
  if (res.success) {
    toast.add({
      title: 'Logout Berhasil',
      description: 'Anda telah keluar dari sesi admin.',
      color: 'success'
    })
    emit('close')
    router.push('/admin/login')
  }
}
</script>
