<template>
  <div class="flex flex-col px-4 md:px-10 pb-20 pt-24 md:pt-36 gap-6 bg-bone">
    <div class="w-full hidden md:block">
      <div class="w-full container mx-auto">
        <UBreadcrumb :items="breadcrumbItems" />
      </div>
    </div>
    <div class="w-full flex flex-col">
      <div class="w-full container mx-auto flex flex-col md:flex-row gap-6">
        <!-- Section Galeri Gambar -->
        <div class="w-full md:w-2/5 flex flex-col gap-4">
          <!-- Gambar Utama (Klik untuk Zoom Lightbox) -->
          <div class="relative aspect-square rounded-lg overflow-hidden cursor-zoom-in group" @click="showImg(imgs.indexOf(activeImage))">
            <NuxtImg :src="activeImage" class="w-full h-full object-center object-cover transition-transform duration-300 group-hover:scale-105" />
            <div class="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <UIcon name="i-lucide-maximize-2" class="w-8 h-8 text-white drop-shadow-md shrink-0" />
            </div>
          </div>

          <!-- Thumbnail Grid -->
          <div class="w-full relative">
            <UCarousel
              :items="imgs"
              :ui="{
                item: 'basis-1/3 snap-start', // Menampilkan 4 item per slide (bisa disesuaikan)
              }"
            >
              <template #default="{ item, index }">
                <button
                  type="button"
                  class="aspect-square w-full rounded-lg overflow-hidden border-2 transition-all cursor-pointer relative group block"
                  :class="activeImage === item ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100'"
                  @click="activeImage = item"
                >
                  <NuxtImg :src="item" class="w-full h-full object-center object-cover" />
                </button>
              </template>
            </UCarousel>
          </div>
        </div>

        <!-- Section Informasi Produk -->
        <div class="w-full md:w-3/5 flex flex-col gap-6">
          <div class="flex flex-row gap-2">
            <div class="bg-[#FFDEA9] px-3 py-1 flex items-center justify-center rounded-full">
              <span class="text-xs tracking-[0.6px] font-body font-medium text-[#271900]">BPOM MD</span>
            </div>
            <div class="bg-[#DCFCE7] px-3 py-1 flex items-center justify-center rounded-full">
              <span class="text-xs tracking-[0.6px] font-body font-medium text-[#271900]">P-IRT</span>
            </div>
            <div class="bg-[#DAA7E4] px-3 py-1 flex items-center justify-center rounded-full">
              <span class="text-xs tracking-[0.6px] font-body font-medium text-[#271900]">HALAL INDONESIA</span>
            </div>
          </div>
          <h2 class="font-sans font-bold text-nottooblack text-5xl">Pempek Ikan Tenggiri</h2>
          <span class="font-body text-lg">Frozen Food Berkuah • 270 gram</span>
          <div class="p-6 bg-[#F3F2FF] border border-[#E0BFB94D] rounded-md">
            <div class="flex flex-col gap-1">
              <div class="flex gap-4 items-end justify-start">
                <span class="text-primary font-sans font-semibold text-[32px]">Rp 65.000</span>
                <span class="text-[#58413C] font-body font-semibold text-sm tracking-[0.7px] line-through pb-1.5">Rp 78.000</span>
              </div>
              <span class="italic font-body text-xs text-[#58413C] font-medium">*Harga belum termasuk ongkir</span>
            </div>
          </div>
          <NuxtLink to="" class="bg-primary py-4 w-full flex items-center justify-center text-white rounded-md font-bold font-sans text-lg cursor-pointer transition-colors duration-150 hover:bg-primary/90">
            <span>Pesan Sekarang via WhatsApp</span>
          </NuxtLink>
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink
              to=""
              class="bg-white py-3 w-full flex items-center justify-center text-secondary border border-secondary rounded-md font-medium tracking-[0.7px] gap-2 font-body text-base cursor-pointer transition-colors duration-150 hover:bg-gray-100"
            >
              <NuxtImg src="/images/shopee-icon.svg" class="h-6" />
              <span>Shopee</span>
            </NuxtLink>
            <NuxtLink
              to=""
              class="bg-white py-3 w-full flex items-center justify-center text-secondary border border-secondary rounded-md font-medium tracking-[0.7px] gap-2 font-body text-base cursor-pointer transition-colors duration-150 hover:bg-gray-100"
            >
              <NuxtImg src="/images/Tokopedia_Mascot.png" class="h-8" />
              <span>Tokopedia</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Tabs -->
    <section class="w-full py-6 flex flex-col gap-8">
      <div class="w-full container mx-auto py-6">
        <UTabs
          color="primary"
          variant="link"
          :items="tabsItems"
          :ui="{
            root: 'w-full flex flex-col gap-6 sm:gap-8',
            list: 'border-b border-[#E0BFB94D] dark:border-[#E0BFB94D] gap-6 sm:gap-8 flex flex-row overflow-x-auto scrollbar-none w-full max-w-full pb-px',
            trigger: 'group px-1 py-3 font-sans tracking-[1.4px] font-bold text-sm cursor-pointer transition-colors shrink-0',
            label: 'data-[state=inactive]:text-[#58413C] data-[state=inactive]:hover:text-[#3e2d29] data-[state=active]:text-primary transition-colors whitespace-nowrap',
            indicator: 'bg-primary h-0.5 -bottom-px',
          }"
        >
          <template #description>
            <ProductTabDescription />
          </template>

          <template #composition>
            <ProductTabComposition />
          </template>

          <template #certification>
            <ProductTabCertification />
          </template>
        </UTabs>
      </div>
    </section>

    <!-- Section Rekomendasi Menu -->
    <section class="w-full bg-bone px-4 md:px-10 pt-4">
      <div class="w-full container mx-auto flex flex-col gap-8">
        <div class="w-full flex items-end justify-between">
          <div class="flex flex-col">
            <h2 class="text-[32px] font-semibold font-sans text-nottooblack">Rekomendasi Menu Lainnya</h2>
            <p class="hidden md:block">Lengkapi hidangan Anda dengan produk unggulan kami</p>
          </div>
          <NuxtLink to="/products" class="flex items-center justify-end gap-2 text-primary text-base transition-all duration-150 hover:gap-2.5">
            <span>Lihat Semua</span>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-6">
          <ProductCard
            v-for="item in products"
            :key="item.slug"
            :name="item.name"
            :slug="item.slug"
            :subtitle="item.subtitle"
            :main-image="item.mainImage"
            :category="item.category"
            :legality="item.legality"
            :price="item.price"
            :original-price="item.originalPrice"
          />
        </div>
      </div>
    </section>

    <!-- VueEasyLightbox Component -->
    <ClientOnly>
      <VueEasyLightbox :visible="visibleRef" :imgs="imgs" :index="indexRef" @hide="onHide" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem, TabsItem } from "@nuxt/ui";

// State VueEasyLightbox
const visibleRef = ref(false);
const indexRef = ref(0);

const imgs = ["/images/frozen_food_berkuah.webp", "/images/tekwan.webp", "/images/tahu_baso.webp"];

const activeImage = ref<string>(imgs[0] ?? "");

const showImg = (index: number) => {
  if (index < 0) return;
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => {
  visibleRef.value = false;
};

const products = [
  {
    name: "Tahu Bakso",
    slug: "tahu-bakso",
    subtitle: "35 gram",
    mainImage: "/images/tahu_baso.webp",
    category: "Frozen Food Kukus",
    legality: "BPOM MD & Halal MUI",
    price: 30000,
    originalPrice: 75000,
  },
  {
    name: "Eggroll Udang",
    slug: "eggroll-udang",
    subtitle: "75 gram",
    mainImage: "/images/eggroll_udang.webp",
    category: "Camilan",
    legality: "P-IRT & Halal MUI",
    price: 27000,
    originalPrice: 35000,
  },
  {
    name: "Eggroll Rumput Laut",
    slug: "eggroll-rumput-laut",
    subtitle: "75 gram",
    mainImage: "/images/eggroll_rumput_laut.webp",
    category: "Camilan",
    legality: "P-IRT & Halal MUI",
    price: 27000,
    originalPrice: 35000,
  },
  {
    name: "Tekwan Ikan Tenggiri",
    slug: "tekwan-ikan-tenggiri",
    subtitle: "390 gram",
    mainImage: "/images/tekwan.webp",
    category: "Frozen Food Berkuah",
    legality: "P-IRT & Halal MUI",
    price: 50000,
    originalPrice: 65000,
  },
];

const tabsItems = ref<TabsItem[]>([
  {
    label: "DESKRIPSI & CARA PENYAJIAN",
    slot: "description",
  },
  {
    label: "KOMPOSISI & PENYIMPANAN",
    slot: "composition",
  },
  {
    label: "MUTU & SERTIFIKASI",
    slot: "certification",
  },
]);

const breadcrumbItems = ref<BreadcrumbItem[]>([
  {
    label: "Home",
    to: "/",
    ui: { link: "text-[#58413C] hover:text-primary/80 font-medium" },
  },
  {
    label: "Produk",
    to: "/products",
    ui: { link: "text-[#58413C] hover:text-primary/80 font-medium" },
  },
  {
    label: "Frozen Food Berkuah",
    to: "/products?category=frozen-food-berkuah",
    ui: { link: "text-[#58413C] hover:text-primary/80 font-medium" },
  },
  {
    label: "Pempek Ikan Tenggiri",
    to: "/products/pempek-ikan-tenggiri",
    ui: { link: "text-[#171B2B] font-bold" },
  },
]);
</script>
