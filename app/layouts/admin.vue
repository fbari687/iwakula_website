<template>
  <div class="min-h-screen flex bg-[#F7F6F2] font-body selection:bg-[#C65A3A]/20">
    
    <!-- Desktop Sidebar -->
    <div class="hidden lg:flex fixed inset-y-0 left-0 z-50 w-64 h-screen shadow-sm">
      <AdminSidebar />
    </div>

    <!-- Mobile Drawer (Nuxt UI v4) -->
    <UDrawer 
      v-model:open="isDrawerOpen" 
      direction="left" 
      :handle="false"
      :ui="{
        overlay: 'bg-[#24324A]/40',
        content: 'max-w-[256px] w-full p-0 bg-[#FBFAF8] border-r border-[#E7E1D8] shadow-sm ring-0',
        body: 'p-0 h-full'
      }"
    >
      <template #body>
        <!-- Hapus border kanan saat di dalam drawer -->
        <AdminSidebar class="border-none w-full" @close="isDrawerOpen = false" />
      </template>
    </UDrawer>

    <!-- Main Content Area -->
    <div class="flex flex-col flex-1 min-h-screen lg:pl-64 transition-all duration-300 min-w-0">
      <AdminTopbar @open-drawer="isDrawerOpen = true" />
      
      <!-- Konten Utama (NuxtPage) -->
      <main class="flex-1 p-6 lg:p-8 overflow-x-hidden min-w-0 w-full">
        <slot />
      </main>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isDrawerOpen = ref(false)
const route = useRoute()

// Otomatis tutup drawer jika rute berubah (pengguna menekan link di mobile)
watch(() => route.path, () => {
  isDrawerOpen.value = false
})
</script>
