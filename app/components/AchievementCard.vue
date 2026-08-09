<template>
  <div class="w-full flex flex-col md:flex-row items-stretch justify-center rounded-2xl overflow-hidden shadow-md bg-white border border-gray-100">
    <!-- Foto / Gambar Sertifikat -->
    <div class="w-full md:w-1/3 shrink-0 bg-gray-50 flex items-center justify-center p-4 md:p-0 cursor-zoom-in relative group" @click="$emit('openLightbox')">
      <NuxtImg :src="image" :alt="title" class="w-full h-auto max-h-64 md:max-h-none md:h-full object-contain md:object-cover" />
      <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <UIcon name="i-lucide-maximize-2" class="w-8 h-8 text-white drop-shadow-md shrink-0" />
      </div>
    </div>

    <!-- Teks Deskripsi -->
    <div class="w-full md:w-2/3 p-6 sm:p-8 flex flex-col gap-3 justify-center">
      <h5 class="text-[#795500] font-bold text-xs sm:text-sm tracking-wider uppercase">
        {{ badge }}
      </h5>
      <h3 class="font-sans font-semibold text-nottooblack text-xl sm:text-2xl">
        {{ title }}
      </h3>
      <p class="font-body text-sm sm:text-base text-nottooblack text-left sm:text-justify leading-relaxed">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  badge: string;
  title: string;
  description: string;
  image: string;
}>();

defineEmits(["openLightbox"]);
</script>
