<template>
  <header class="h-[72px] bg-[#FBFAF8] border-b border-[#E7E1D8] flex items-center justify-between px-4 lg:px-8 shrink-0">
    <!-- Left: Hamburger (Mobile Only) -->
    <div class="flex items-center lg:hidden">
      <button 
        @click="$emit('openDrawer')"
        class="p-2 -ml-2 rounded-xl text-[#6B7280] hover:bg-[#E7E1D8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C65A3A]/50"
      >
        <UIcon name="i-heroicons-bars-3" class="w-6 h-6 block" />
      </button>
    </div>

    <!-- Right: Profile Info -->
    <div class="flex items-center gap-4 font-body ml-auto">
      <div class="flex flex-col items-end">
        <span class="text-[14px] font-semibold text-[#24324A]">Halo, {{ user?.name || 'Admin' }}</span>
        <span class="text-[12px] text-[#6B7280]">Administrator</span>
      </div>
      <!-- Placeholder Avatar -->
      <div class="w-10 h-10 rounded-full bg-[#E7E1D8] flex items-center justify-center text-[#C65A3A] font-bold">
        {{ user?.name ? user.name.charAt(0).toUpperCase() : 'A' }}
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { user } = useAuth()
defineEmits(['openDrawer'])
</script>
