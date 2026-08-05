<!-- components/product/ProductTabComposition.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#58413C]">
    <!-- Kiri: Komposisi & Allergen Info -->
    <div class="bg-[#F6F5FF] rounded-xl p-6 border border-[#EBE8FF] flex flex-col justify-between gap-6">
      <div>
        <h3 class="text-base font-semibold text-[#171B2B] mb-4">Komposisi</h3>
        <ul class="space-y-3 pl-1">
          <li class="flex items-center gap-2.5 text-sm font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-[#58413C]"></span>
            <span>Daging Ikan Tenggiri Segar</span>
          </li>
          <li class="flex items-center gap-2.5 text-sm font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-[#58413C]"></span>
            <span>Tepung Tapioka Premium</span>
          </li>
          <li class="flex items-center gap-2.5 text-sm font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-[#58413C]"></span>
            <span>Telur Ayam</span>
          </li>
          <li class="flex items-center gap-2.5 text-sm font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-[#58413C]"></span>
            <span>Garam & Bumbu Rempah</span>
          </li>
        </ul>
      </div>

      <!-- Allergen Warning Box -->
      <!-- <div class="bg-[#FDE2D8] border border-[#FAD0C3] rounded-lg p-3.5 flex items-center gap-2.5 text-red-900">
        <UIcon name="i-lucide-triangle-alert" class="w-5 h-5 text-red-700 shrink-0" />
        <span class="text-xs sm:text-sm font-semibold text-[#8B2613]"> Mengandung ikan dan telur </span>
      </div> -->
    </div>

    <!-- Kanan: Panduan Penyimpanan -->
    <div class="bg-[#F6F5FF] rounded-xl p-6 border border-[#EBE8FF] flex flex-col justify-between gap-6">
      <div>
        <h3 class="text-base font-semibold text-[#171B2B] mb-4">Panduan Penyimpanan</h3>

        <div class="space-y-3">
          <!-- Item Freezer -->
          <div class="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-100 shadow-2xs">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-snowflake" class="w-5 h-5 text-[#3B6491] shrink-0" />
              <span class="text-sm font-medium text-[#171B2B]">Freezer (-18°C)</span>
            </div>
            <span class="text-sm font-bold text-primary">6 Bulan</span>
          </div>

          <!-- Item Chiller -->
          <div class="bg-white rounded-lg p-4 flex items-center justify-between border border-gray-100 shadow-2xs">
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-calendar" class="w-5 h-5 text-[#3B6491] shrink-0" />
              <span class="text-sm font-medium text-[#171B2B]">Chiller (4°C)</span>
            </div>
            <span class="text-sm font-bold text-primary">3 Hari</span>
          </div>
        </div>
      </div>

      <!-- Catatan Kaki / Note -->
      <p class="text-xs italic text-[#58413C]/80">*Jangan dibekukan kembali setelah dicairkan.</p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
