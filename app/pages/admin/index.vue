<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-[#24324A] font-sans tracking-tight">Dasbor Utama</h1>
      <p class="text-[#6B7280] mt-1">Ringkasan statistik dan metrik operasional Iwakula.</p>
    </div>

    <!-- Metrik Grid (Placeholder) -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      
      <!-- Card 1 -->
      <div class="bg-[#FBFAF8] ring-1 ring-[#E7E1D8] rounded-[20px] shadow-sm p-6 overflow-hidden transition-shadow duration-200 hover:shadow-md">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#C65A3A]">
            <UIcon name="i-heroicons-cube" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-[#6B7280]">Total Produk</p>
            <p class="text-2xl font-bold text-[#24324A]">12</p>
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-[#FBFAF8] ring-1 ring-[#E7E1D8] rounded-[20px] shadow-sm p-6 overflow-hidden transition-shadow duration-200 hover:shadow-md">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#C65A3A]">
            <UIcon name="i-heroicons-tag" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-[#6B7280]">Kategori</p>
            <p class="text-2xl font-bold text-[#24324A]">4</p>
          </div>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-[#FBFAF8] ring-1 ring-[#E7E1D8] rounded-[20px] shadow-sm p-6 overflow-hidden transition-shadow duration-200 hover:shadow-md">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#C65A3A]">
            <UIcon name="i-heroicons-trophy" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-[#6B7280]">Achievement</p>
            <p class="text-2xl font-bold text-[#24324A]">8</p>
          </div>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="bg-[#FBFAF8] ring-1 ring-[#E7E1D8] rounded-[20px] shadow-sm p-6 overflow-hidden transition-shadow duration-200 hover:shadow-md">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-[#F7F6F2] flex items-center justify-center text-[#C65A3A]">
            <UIcon name="i-heroicons-phone" class="w-6 h-6" />
          </div>
          <div>
            <p class="text-sm font-medium text-[#6B7280]">Kontak Masuk</p>
            <p class="text-2xl font-bold text-[#24324A]">24</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>
