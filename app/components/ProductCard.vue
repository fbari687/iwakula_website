<template>
  <div class="h-full min-h-[578px] flex flex-col bg-white rounded-[12px] overflow-hidden border border-black/10 shadow-xs group">
    <NuxtLink :to="localePath(`/products/${slug}`)" :aria-label="'Foto produk ' + name" class="w-full h-71.5 shrink-0">
      <div class="w-full h-full">
        <NuxtImg :src="mainImage" :alt="name" loading="lazy" format="webp" sizes="xs:100vw sm:50vw lg:300px" class="inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
      </div>
    </NuxtLink>
    <div class="w-full grow p-6 flex flex-col justify-between gap-4">
      <div class="flex flex-col gap-2">
        <NuxtLink :to="category?.slug ? localePath(`/products?category=${category.slug}#${category.slug}`) : localePath('/products')" :aria-label="'Kategori ' + (category?.name || $t('common.uncategorized'))" class="bg-accent px-3 py-1 w-fit rounded-full text-xs font-medium flex items-center justify-center text-darkprimary hover:opacity-90 transition-opacity">{{ category?.name || $t('common.uncategorized') }}</NuxtLink>
        <NuxtLink :to="localePath(`/products/${slug}`)" :aria-label="'Detail produk ' + name" class="font-sans text-secondary font-semibold text-2xl transition-all duration-150 hover:text-secondary/80">{{ name }}</NuxtLink>
        <span class="text-darkprimary font-body">{{ subtitle }}</span>
      </div>
      <div class="flex flex-col gap-3 pt-4 border-t border-t-gray-200">
        <div class="w-full flex gap-2 items-end">
          <span class="text-2xl text-primary font-sans font-semibold">Rp {{ price.toLocaleString("id-ID") }}</span>
          <span v-if="originalPrice && originalPrice > price" class="text-[#58413C99] line-through text-sm pb-0.5">Rp {{ originalPrice.toLocaleString("id-ID") }}</span>
        </div>
        <NuxtLink :to="localePath(`/products/${slug}`)" :aria-label="'Lihat detail ' + name" class="w-full py-2 bg-primary flex items-center justify-center rounded-[8px] transition-all duration-150 hover:bg-primary/90">
          <span class="text-white">{{ $t('common.viewDetail') }}</span>
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
