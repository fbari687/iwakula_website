<template>
  <NuxtLink :to="localePath(`/products?category=${slug}#${slug}`)" :aria-label="'Kategori ' + name" class="group aspect-4/5 rounded-[12px] flex items-center justify-center overflow-hidden text-white relative">
    <!-- Elemen Gambar Latar Belakang Terpisah -->
    <NuxtImg :src="image" :alt="'Kategori ' + name" loading="lazy" format="webp" sizes="xs:100vw sm:50vw lg:400px" class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />

    <!-- Konten Teks & Gradien Overlay -->
    <div class="w-full h-full p-4 sm:p-6 flex flex-col gap-2 justify-end items-start relative z-10" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)">
      <h3 class="font-sans font-semibold text-2xl">{{ name }}</h3>
      <p class="text-bone font-body">{{ description }}</p>
      <div class="flex gap-2 items-center justify-between text-accent text-base transition-all duration-150 group-hover:gap-2.5">
        <span>{{ $t('home.viewAll') }}</span>
        <Icon name="i-lucide-move-right" size="18" />
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();
interface Props {
  name: string;
  description: string;
  image: string;
  slug: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style></style>
