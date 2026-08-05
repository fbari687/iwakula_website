<template>
  <div class="flex flex-col gap-8 text-gray-700 font-body">
    <div class="grid grid-cols-1 gap-8">
      <!-- Left Column: Keunggulan Produk -->
      <div class="flex flex-col text-nottooblack prose text-justify max-w-none">
        <h3>Nikmati keaslian cita rasa Pempek Palembang dari Iwakula. Dibuat dengan 100% daging ikan Tenggiri pilihan tanpa pengawet.</h3>
        <ul>
          <li>Rasa ikan yang kuat dan gurih alami</li>
          <li>Tekstur kenyal pas, tidak keras</li>
          <li>Lengkap dengan Cuko otentik yang pedas, asam, manis</li>
        </ul>
      </div>
    </div>

    <!-- Highlight Box / Callout -->
    <div class="bg-[#FFDEA933] border border-[#FFDEA94D] rounded-xl p-4 flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-lightbulb" class="w-5 h-5 text-[#795500] shrink-0" />
        <p class="text-base sm:text-lg font-semibold text-[#795500]">Saran Penyajian</p>
      </div>
      <div class="flex flex-col gap-4 pl-6">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shrink-0 mt-0.5">1</div>
          <div class="flex flex-col gap-0.5">
            <h4 class="font-bold text-base text-gray-900">Thawing</h4>
            <p class="text-sm text-gray-500">Thawing di suhu ruang hingga tidak beku.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shrink-0 mt-0.5">2</div>
          <div class="flex flex-col gap-0.5">
            <h4 class="font-bold text-base text-gray-900">Goreng / Kukus</h4>
            <p class="text-sm text-gray-500 mt-0.5">Goreng dengan api sedang hingga kuning keemasan, atau kukus 5-8 menit.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
