<template>
  <div class="flex flex-col gap-4 sm:gap-8 bg-bone overflow-x-hidden">
    <!-- Hero Section -->
    <main class="relative min-h-[320px] md:min-h-100 h-full w-full overflow-hidden">
      <NuxtImg src="/images/bg.jpg" alt="Background" preload fetchpriority="high" loading="eager" class="absolute inset-0 h-full w-full object-cover object-center" />

      <div class="relative bg-black/40 min-h-[320px] md:min-h-100 h-full flex items-center">
        <div class="container w-full h-full mx-auto flex items-center justify-center">
          <div class="py-16 md:py-32 px-4 sm:px-8 lg:px-0 max-w-160 text-white flex flex-col gap-4 md:gap-6">
            <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-14 font-heading text-center">Katalog Menu Olahan Ikan</h1>
            <p class="text-sm sm:text-base lg:text-lg font-body font-normal leading-relaxed text-graysubtitle text-center">Praktis, lezat, dan kaya gizi. Temukan pilihan hidangan olahan ikan terbaik untuk keluarga Anda.</p>
          </div>
        </div>
      </div>
    </main>
    <!-- Hero Section -->

    <!-- Catalog Section -->
    <!-- Category 1: Frozen Food Berkuah -->
    <section class="w-full bg-bone px-4 sm:px-6 md:px-10 py-6 sm:py-8">
      <div class="w-full container mx-auto flex flex-col gap-4 sm:gap-6">
        <!-- Title Section -->
        <div class="w-full flex items-center justify-start gap-3 sm:gap-4">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold font-sans text-nottooblack">Frozen Food Berkuah</h2>
          <div class="w-8 sm:w-12 h-1 bg-primary rounded-full shrink-0"></div>
        </div>
        <!-- Title Section -->

        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

    <!-- Category 2: Camilan Kering -->
    <section class="w-full bg-bone px-4 sm:px-6 md:px-10 py-6 sm:py-8">
      <div class="w-full container mx-auto flex flex-col gap-4 sm:gap-6">
        <!-- Title Section -->
        <div class="w-full flex items-center justify-start gap-3 sm:gap-4">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold font-sans text-nottooblack">Camilan Kering</h2>
          <div class="w-8 sm:w-12 h-1 bg-primary rounded-full shrink-0"></div>
        </div>
        <!-- Title Section -->

        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

    <!-- Category 3: Frozen Food Kukus & Goreng -->
    <section class="w-full bg-bone px-4 sm:px-6 md:px-10 py-6 sm:py-8 pb-12 sm:pb-16">
      <div class="w-full container mx-auto flex flex-col gap-4 sm:gap-6">
        <!-- Title Section -->
        <div class="w-full flex items-center justify-start gap-3 sm:gap-4">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold font-sans text-nottooblack">Frozen Food Kukus & Goreng</h2>
          <div class="w-8 sm:w-12 h-1 bg-primary rounded-full shrink-0"></div>
        </div>
        <!-- Title Section -->

        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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
