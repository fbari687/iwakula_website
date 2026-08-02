<template>
  <!-- Hero Section -->
  <main class="relative min-h-screen w-full">
    <NuxtImg src="/images/bg.jpg" alt="Background" preload fetchpriority="high" loading="eager" class="absolute inset-0 -z-10 h-full w-full object-cover object-center" />

    <div class="bg-black/60 h-screen">
      <div class="container w-full h-full mx-auto flex items-center justify-center">
        <div class="px-10 max-w-160 text-white flex flex-col gap-6">
          <h1 class="font-bold text-4xl lg:text-5xl leading-12 lg:leading-14 font-heading">Solusi Praktis & Lezat Makan Ikan Bergizi Setiap Hari</h1>
          <p class="text-base lg:text-lg font-body font-normal leading-6 text-graysubtitle">Menghadirkan aneka olahan ikan tenggiri segar dan camilan high-protein siap saji tanpa repot untuk keluarga tercinta.</p>
          <NuxtLink to="https://wa.me/" target="_blank" class="text-white bg-primary py-2 px-4 rounded-lg font-semibold text-base flex flex-col items-center justify-center gap-1 transition duration-150 hover:bg-primary/90 w-fit">
            <span>Lihat Katalog Produk</span>
            <div class="h-px"></div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
  <!-- Hero Section -->
  <!-- 4 Point Section -->
  <section class="w-full p-10 bg-secondary text-white">
    <div class="container w-full mx-auto grid grid-cols-2 gap-y-8 lg:grid-cols-4">
      <div class="flex flex-col gap-2 items-center">
        <span class="text-accent font-bold text-4xl">2018</span>
        <span class="text-sm">Sejak Berdiri</span>
      </div>
      <div class="flex flex-col gap-2 items-center">
        <span class="text-accent font-bold text-4xl">7</span>
        <span class="text-sm">Varian Olahan Ikan</span>
      </div>
      <div class="flex flex-col gap-2 items-center">
        <span class="text-accent font-bold text-4xl">100%</span>
        <span class="text-sm">Sertifikasi Halal</span>
      </div>
      <div class="flex flex-col gap-2 items-center">
        <span class="text-accent font-bold text-4xl">50+</span>
        <span class="text-sm">Mitra Reseller Aktif</span>
      </div>
    </div>
  </section>
  <!-- 4 Point Section -->

  <!-- Category Section -->
  <section class="w-full bg-bone px-10 py-20">
    <div class="w-full container mx-auto flex flex-col gap-12">
      <!-- Title Section -->
      <div class="flex flex-col gap-4 items-center justify-center">
        <h2 class="text-[32px] text-nottooblack font-sans font-semibold text-center">Pilihan Menu Olahan Ikan Favorit</h2>
        <div class="h-1 w-24 bg-primary rounded-full"></div>
      </div>
      <!-- Title Section -->

      <!-- Category Card Section -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-6">
        <CategoryCard v-for="(item, index) in categories" :key="index" :image="item.image" :title="item.title" :subtitle="item.subtitle" :to="item.to" />
      </div>
      <!-- Category Card Section -->
    </div>
  </section>
  <!-- Category Section -->

  <!-- Unique Selling Points Section -->
  <section class="w-full bg-[#F3F2FF] px-10 py-20">
    <div class="w-full container mx-auto flex flex-col gap-12">
      <!-- Title Section -->
      <div class="flex flex-col gap-4 items-center justify-center">
        <h2 class="text-[32px] font-sans font-semibold text-center">Mengapa Memilih Iwakula?</h2>
        <div class="h-1 w-24 bg-primary rounded-full"></div>
      </div>
      <!-- Title Section -->

      <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-6 items-start justify-between">
        <ReasonCard v-for="(item, index) in reasons" :key="index" :icon="item.icon" :title="item.title" :subtitle="item.subtitle" />
      </div>
    </div>
  </section>
  <!-- Unique Selling Points Section -->

  <!-- Trust & Legalities Section -->
  <section class="w-full bg-[#F3F2FF] p-10">
    <div class="w-full container mx-auto flex flex-col gap-8">
      <!-- Title Section -->
      <div class="flex flex-col gap-4 items-center justify-center">
        <h2 class="text-[24px] font-sans font-semibold text-center">Jaminan Mutu & Kualitas Terbina</h2>
      </div>
      <!-- Title Section -->

      <div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-6">
        <LegalityCard v-for="(item, index) in legalities" :key="index" :image="item.image" :title="item.title" />
      </div>
    </div>
  </section>
  <!-- Trust & Legalities Section -->

  <!-- Recommendation Products Section -->
  <section class="w-full bg-bone px-10 py-20">
    <div class="w-full container mx-auto flex flex-col gap-12">
      <!-- Title Section -->
      <div class="w-full flex items-end justify-between">
        <div class="flex flex-col gap-4">
          <h2 class="text-[32px] font-semibold font-sans">Rekomendasi Iwakula</h2>
          <div class="w-24 h-1 bg-primary rounded-full"></div>
        </div>
        <NuxtLink to="/products" class="flex items-center justify-end gap-2 text-primary text-base transition-all duration-150 hover:gap-2.5">
          <span>Lihat Semua</span>
          <Icon name="i-lucide-arrow-right" size="18" />
        </NuxtLink>
      </div>
      <!-- Title Section -->

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
  <!-- Recommendation Products Section -->

  <!-- Partnership Section -->
  <section class="w-full bg-secondary px-10 py-20 text-white">
    <div class="w-full container mx-auto flex flex-col gap-12">
      <!-- Title Section -->
      <div class="flex flex-col gap-4 items-center justify-center">
        <h2 class="text-[32px] font-sans font-semibold text-center">Tumbuh Bersama Iwakula</h2>
        <div class="h-1 w-24 bg-accent rounded-full"></div>
        <p class="text-graysubtitle text-base font-body text-center">Kami membuka peluang kemitraan bagi Anda yang ingin menghadirkan produk olahan ikan berkualitas ke lebih banyak orang.</p>
      </div>
      <!-- Title Section -->

      <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 justify-between">
        <PartnershipCard v-for="(item, index) in partnerships" :key="index" :title="item.title" :description="item.description" :icon="item.icon" :button="item.button" :is-color-primary="item.isColorPrimary" />
      </div>
    </div>
  </section>
  <!-- Partnership Section -->

  <!-- About Section -->
  <section class="w-full bg-[#F3F2FF] px-10 py-20 text-white">
    <div class="w-full container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-20">
      <NuxtImg src="/images/owner.webp" alt="owner" loading="lazy" format="webp" class="aspect-square rounded-2xl object-cover object-center" />
      <div class="flex flex-col gap-6">
        <h2 class="font-sans text-5xl font-bold leading-14 text-nottooblack">Dari Dapur Kami untuk Nutrisi Masyarakat</h2>
        <p class="text-[#374151] text-lg text-justify">
          Iwakula adalah usaha kuliner yang didirikan pada tahun 2018 bergerak dibidang olahan makanan berbasis ikan dengan konsep praktis, sehat, dan lezat. Minimnya masyarakat dalam mengkonsumsi ikan serta kendala utama dalam mengolah
          ikan yang dianggap kurang praktis dan kurang bervariasi dalam menu sehari - hari, maka Iwakula hadir sebagai solusi untuk meningkatkan konsumsi ikan dengan menghadirkan produk olahan ikan yang bervariatif, lezat, praktis dan
          bergizi.
        </p>
        <NuxtLink to="/about" class="flex items-center justify-start gap-2 text-primary text-base transition-all duration-150 hover:gap-3">
          <span>Baca selengkapnya tentang perjalanan kami</span>
          <Icon name="i-lucide-arrow-right" size="18" />
        </NuxtLink>
      </div>
    </div>
  </section>
  <!-- About Section -->
</template>

<script setup lang="ts">
const partnerships = [
  {
    title: "Reseller & Agen",
    description: "Dapatkan harga khusus dan dukungan promosi dengan bergabung menjadi mitra distribusi kami.",
    button: "Daftar Reseller",
    icon: "i-lucide-store",
    isColorPrimary: true,
  },
  {
    title: "Catering Services",
    description: "Suplai produk olahan ikan premium untuk kebutuhan katering, restoran, dan acara Anda.",
    button: "Hubungi Sales B2B",
    icon: "i-lucide-utensils",
    isColorPrimary: false,
  },
];

const products = [
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

const legalities = [
  {
    title: "Tersertifikasi BADAN POM",
    image: "/images/BADAN_POM.png",
  },
  {
    title: "Tersertifikasi Halal Indonesia",
    image: "/images/Halal_Indonesia.webp",
  },
  {
    title: "Tersertifikasi Kementerian Kelautan dan Perikanan",
    image: "images/Logo_Kementerian_Kelautan_dan_Perikanan.jpg",
  },
  {
    title: "Binaan Pemkot Depok",
    image: "/images/Lambang_Kota_Depok.png",
  },
];

const reasons = [
  {
    title: "Praktis Tanpa Ribet",
    subtitle: "Cocok untuk keluarga sibuk yang ingin konsumsi ikan tanpa repot",
    icon: "i-lucide-timer",
  },
  {
    title: "Ikan Segar Pilihan",
    subtitle: "Menggunakan daging ikan murni tenggiri dengan bumbu rempah spesial",
    icon: "i-lucide-fish",
  },
  {
    title: "Higienis & Teruji",
    subtitle: "Diproses bersih dengan oven pengering dan memiliki sertifikasi resmi",
    icon: "i-lucide-circle-check-big",
  },
  {
    title: "Gluten Free",
    subtitle: "Aman dan sehat dikonsumsi tanpa kandungan gandum",
    icon: "i-lucide-heart-plus",
  },
];

const categories = [
  {
    title: "Frozen Food Berkuah",
    subtitle: "Pempek, Tekwan",
    image: "/images/frozen_food_berkuah.webp",
    to: "/products",
  },
  {
    title: "Camilan Kering High-Protein",
    subtitle: "Seafood Eggrolls: Udang dan Rumput Laut",
    image: "/images/camilan.webp",
    to: "/products",
  },
  {
    title: "Frozen Food Kukus/Goreng",
    subtitle: "Siomay Ikan, Dimsum, dan Tahu Baso",
    image: "/images/tahu_baso.webp",
    to: "/products",
  },
];
</script>
