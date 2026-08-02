<template>
  <div class="h-144.5 flex flex-col bg-white rounded-[12px] overflow-hidden border border-black/10 shadow-xs group">
    <NuxtLink :to="`/products/${slug}`" class="w-full h-71.5 relative">
      <NuxtImg :src="mainImage" :alt="name" loading="lazy" format="webp" class="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
      <div class="w-full h-full p-2 flex flex-col gap-2 justify-start items-start relative z-10">
        <div class="bg-accent px-3 py-1 w-fit rounded-sm text-xs font-medium">{{ category }}</div>
      </div>
    </NuxtLink>
    <div class="w-full grow p-6 flex flex-col justify-between gap-4">
      <div class="flex flex-col gap-2">
        <div class="bg-accent px-3 py-1 w-fit rounded-full text-xs font-medium">{{ legality }}</div>
        <NuxtLink :to="`/products/${slug}`" class="font-sans text-secondary font-semibold text-2xl transition-all duration-150 hover:text-secondary/80">{{ name }}</NuxtLink>
        <span class="text-[#58413C] font-body">{{ subtitle }}</span>
      </div>
      <!-- <div class="w-full h-0.5 rounded-full bg-gray-200"></div> -->
      <div class="flex flex-col gap-3 pt-4 border-t border-t-gray-200">
        <div class="w-full flex gap-2 items-end">
          <span class="text-2xl text-primary font-sans font-semibold">Rp {{ price.toLocaleString("id-ID") }}</span>
          <span v-if="originalPrice != null" class="text-[#58413C99] line-through">Rp {{ originalPrice.toLocaleString("id-ID") }}</span>
        </div>
        <NuxtLink :to="`/products/${slug}`" class="w-full py-2 bg-primary flex items-center justify-center rounded-[8px] transition-all duration-150 hover:bg-primary/90">
          <span class="text-white">Lihat Detail</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  slug: string;
  subtitle: string;
  mainImage: string;
  category: string;
  legality: string;
  price: number;
  originalPrice?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  originalPrice: null,
});
</script>

<style></style>
