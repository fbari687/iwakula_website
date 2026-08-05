<template>
  <div class="flex flex-col gap-8 bg-bone">
    <!-- Hero Section -->
    <main class="relative min-h-100 h-full w-full">
      <NuxtImg src="/images/bg.jpg" alt="Background" preload fetchpriority="high" loading="eager" class="absolute inset-0 -z-10 h-full w-full object-cover object-center" />

      <div class="bg-black/40 min-h-100 h-full">
        <div class="container w-full h-full mx-auto flex items-center justify-center">
          <div class="py-32 px-8 lg:px-0 max-w-160 text-white flex flex-col gap-6">
            <h1 class="font-bold text-4xl lg:text-5xl leading-12 lg:leading-14 font-heading text-center">Katalog Menu Olahan Ikan</h1>
            <p class="text-base lg:text-lg font-body font-normal leading-6 text-graysubtitle text-center">Praktis, lezat, dan kaya gizi. Temukan pilihan hidangan olahan ikan terbaik untuk keluarga Anda.</p>
          </div>
        </div>
      </div>
    </main>
    <!-- Hero Section -->

    <!-- Catalog Section -->
    <section class="w-full bg-bone px-2 lg:px-10 py-8">
      <div class="w-full container mx-auto flex flex-col gap-6">
        <!-- Title Section -->
        <div class="w-full flex items-center justify-start gap-4">
          <h2 class="text-3xl font-semibold font-sans">Frozen Food Berkuah</h2>
          <div class="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <!-- Title Section -->

        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductTile
            v-for="item in berkuahProducts"
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
    <section class="w-full bg-bone px-2 lg:px-10 py-8">
      <div class="w-full container mx-auto flex flex-col gap-6">
        <!-- Title Section -->
        <div class="w-full flex items-center justify-start gap-4">
          <h2 class="text-3xl font-semibold font-sans">Camilan Kering</h2>
          <div class="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <!-- Title Section -->

        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductTile
            v-for="item in camilanProducts"
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
    <section class="w-full bg-bone px-2 lg:px-10 py-8">
      <div class="w-full container mx-auto flex flex-col gap-6">
        <!-- Title Section -->
        <div class="w-full flex items-center justify-start gap-4">
          <h2 class="text-3xl font-semibold font-sans">Frozen Food Kukus & Goreng</h2>
          <div class="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        <!-- Title Section -->

        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductTile
            v-for="item in kukusProducts"
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
    <!-- Catalog Section -->
  </div>
</template>

<script lang="ts" setup>
const berkuahProducts = [
  {
    name: "Pempek Ikan Tenggiri",
    slug: "pempek-ikan-tenggiri",
    subtitle: "250 gram",
    mainImage: "/images/frozen_food_berkuah.webp",
    category: "Frozen Food Berkuah",
    legality: "P-IRT & Halal MUI",
    price: 65000,
    originalPrice: 75000,
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

const camilanProducts = [
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
];

const kukusProducts = [
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
];
</script>

<style></style>
