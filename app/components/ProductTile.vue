<template>
  <div class="group w-full flex flex-row rounded-md bg-white overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[101%]" style="border: 1.2px solid rgba(23, 27, 43, 0.05)">
    <!-- Gambar: Menggunakan w-2/5 (40% lebar) di mobile dan dibatasi max-w-72.5 di desktop -->
    <NuxtLink :to="localePath(`/products/${slug}`)" class="w-2/5 sm:w-1/2 md:max-w-72.5 aspect-square md:aspect-299/233 shrink-0">
      <NuxtImg :src="mainImage" :alt="name" loading="lazy" format="webp" class="w-full h-full object-cover object-center" />
    </NuxtLink>

    <!-- Kontainer Teks & Informasi: Mengisi sisa 60% lebar -->
    <div class="w-3/5 sm:w-1/2 sm:flex-1 flex flex-col justify-between p-3 sm:p-6 gap-2 sm:gap-4">
      <div class="flex flex-col gap-1 sm:gap-2">
        <!-- Badge -->
        <NuxtLink :to="category?.slug ? localePath(`/products?category=${category.slug}#${category.slug}`) : localePath('/products')" class="bg-accent px-2 py-0.5 sm:px-3 sm:py-1 w-fit rounded-full text-[10px] sm:text-xs font-medium flex items-center justify-center text-darkprimary hover:opacity-90 transition-opacity">{{ category?.name || $t('common.uncategorized') }}</NuxtLink>

        <!-- Judul Produk -->
        <NuxtLink :to="localePath(`/products/${slug}`)" class="font-sans text-secondary font-semibold text-base sm:text-2xl transition-all duration-150 hover:text-secondary/80 line-clamp-1"> {{ name }} </NuxtLink>

        <!-- Gramasi -->
        <span class="text-darkprimary font-body text-xs sm:text-base">{{ subtitle }}</span>
      </div>

      <!-- Harga & Tombol -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div class="flex flex-col items-start">
          <span v-if="originalPrice && originalPrice > price" class="text-[#58413C99] line-through text-[11px] sm:text-sm">Rp {{ originalPrice.toLocaleString("id-ID") }}</span>
          <span class="text-base sm:text-2xl text-primary font-sans font-semibold">Rp {{ price.toLocaleString("id-ID") }}</span>
        </div>

        <NuxtLink :to="localePath(`/products/${slug}`)" class="w-full sm:w-fit py-1.5 px-3 sm:py-2 sm:px-4 bg-primary flex items-center justify-center rounded-[8px] transition-all duration-150 hover:bg-primary/90">
          <span class="text-white text-xs sm:text-base font-medium">{{ $t('common.viewDetail') }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Category } from "~~/server/database/schema";

const localePath = useLocalePath();

interface Props {
  name: string;
  slug: string;
  subtitle: string;
  mainImage: string;
  category?: Category | null;
  price: number;
  originalPrice?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  category: null,
  originalPrice: null,
});
</script>

<style></style>
