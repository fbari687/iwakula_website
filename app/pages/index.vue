<template>
  <div class="flex flex-col bg-bone overflow-x-hidden">
    <!-- Hero Section -->
    <main class="relative min-h-[85vh] md:min-h-screen w-full flex items-center justify-center">
      <NuxtImg src="/images/bg.jpg" alt="Background" preload fetchpriority="high" loading="eager" class="absolute inset-0 h-full w-full object-cover object-center" />

      <div class="bg-black/60 w-full h-full absolute inset-0 flex items-center justify-center">
        <div class="container w-full mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-center py-20">
          <div class="max-w-160 text-white flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-14 font-heading">Solusi Praktis & Lezat Makan Ikan Bergizi Setiap Hari</h1>
            <p class="text-sm sm:text-base lg:text-lg font-body font-normal leading-relaxed text-graysubtitle">Menghadirkan aneka olahan ikan tenggiri segar dan camilan high-protein siap saji tanpa repot untuk keluarga tercinta.</p>
            <NuxtLink
              to="https://wa.me/"
              target="_blank"
              class="text-white bg-primary py-3 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-primary/90 w-full sm:w-fit mt-2"
            >
              <span>Lihat Katalog Produk</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
    <!-- Hero Section -->

    <!-- 4 Point Section -->
    <section class="w-full py-8 px-4 sm:px-6 md:px-10 bg-secondary text-white">
      <div class="container w-full mx-auto grid grid-cols-2 gap-y-6 sm:gap-y-8 lg:grid-cols-4">
        <div class="flex flex-col gap-1 sm:gap-2 items-center">
          <span class="text-accent font-bold text-2xl sm:text-3xl lg:text-4xl">2018</span>
          <span class="text-xs sm:text-sm text-center">Sejak Berdiri</span>
        </div>
        <div class="flex flex-col gap-1 sm:gap-2 items-center">
          <span class="text-accent font-bold text-2xl sm:text-3xl lg:text-4xl">7</span>
          <span class="text-xs sm:text-sm text-center">Varian Olahan Ikan</span>
        </div>
        <div class="flex flex-col gap-1 sm:gap-2 items-center">
          <span class="text-accent font-bold text-2xl sm:text-3xl lg:text-4xl">100%</span>
          <span class="text-xs sm:text-sm text-center">Sertifikasi Halal</span>
        </div>
        <div class="flex flex-col gap-1 sm:gap-2 items-center">
          <span class="text-accent font-bold text-2xl sm:text-3xl lg:text-4xl">50+</span>
          <span class="text-xs sm:text-sm text-center">Mitra Reseller Aktif</span>
        </div>
      </div>
    </section>
    <!-- 4 Point Section -->

    <!-- Category Section -->
    <section class="w-full bg-bone px-4 sm:px-6 md:px-10 py-12 md:py-20">
      <div class="w-full container mx-auto flex flex-col gap-8 md:gap-12">
        <!-- Title Section -->
        <div class="flex flex-col gap-3 sm:gap-4 items-center justify-center">
          <h2 class="text-2xl sm:text-3xl lg:text-[2rem] text-nottooblack font-sans font-semibold text-center leading-tight">Pilihan Menu Olahan Ikan Favorit</h2>
          <div class="h-1 w-20 sm:w-24 bg-primary rounded-full"></div>
        </div>

        <!-- Category Card Section -->
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard v-for="(item, index) in categories" :key="index" :image="item.image" :name="item.name" :description="item.description" :slug="item.slug" />
        </div>
      </div>
    </section>
    <!-- Category Section -->

    <!-- Unique Selling Points Section -->
    <section class="w-full bg-[#F3F2FF] px-4 sm:px-6 md:px-10 py-12 md:py-20">
      <div class="w-full container mx-auto flex flex-col gap-8 md:gap-12">
        <!-- Title Section -->
        <div class="flex flex-col gap-3 sm:gap-4 items-center justify-center">
          <h2 class="text-2xl sm:text-3xl lg:text-[2rem] font-sans font-semibold text-center text-nottooblack leading-tight">Mengapa Memilih Iwakula?</h2>
          <div class="h-1 w-20 sm:w-24 bg-primary rounded-full"></div>
        </div>

        <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-between">
          <ReasonCard v-for="(item, index) in reasons" :key="index" :icon="item.icon" :title="item.title" :subtitle="item.subtitle" />
        </div>
      </div>
    </section>
    <!-- Unique Selling Points Section -->

    <!-- Trust & Legalities Section -->
    <section class="w-full bg-[#F3F2FF] px-4 sm:px-6 md:px-10 py-8 md:py-12 border-t border-gray-200/50">
      <div class="w-full container mx-auto flex flex-col gap-6 md:gap-8">
        <!-- Title Section -->
        <div class="flex flex-col gap-2 items-center justify-center">
          <h2 class="text-xl sm:text-2xl font-sans font-semibold text-center text-nottooblack">Jaminan Mutu & Kualitas Terbina</h2>
        </div>

        <div class="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <LegalityCard v-for="(item, index) in legalities" :key="index" :image="item.image" :title="item.title" />
        </div>
      </div>
    </section>
    <!-- Trust & Legalities Section -->

    <!-- Recommendation Products Section -->
    <section class="w-full bg-bone px-4 sm:px-6 md:px-10 py-12 md:py-20">
      <div class="w-full container mx-auto flex flex-col gap-8 md:gap-12">
        <!-- Title Section -->
        <div class="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div class="flex flex-col gap-2 sm:gap-3">
            <h2 class="text-2xl sm:text-3xl lg:text-[2rem] font-semibold font-sans text-nottooblack">Rekomendasi Iwakula</h2>
            <div class="w-20 sm:w-24 h-1 bg-primary rounded-full"></div>
          </div>
          <NuxtLink to="/products" class="flex items-center gap-2 text-primary text-sm sm:text-base transition-all duration-150 hover:gap-2.5 font-medium">
            <span>Lihat Semua</span>
            <Icon name="i-lucide-arrow-right" class="w-4 h-4 sm:w-5 sm:h-5" />
          </NuxtLink>
        </div>

        <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <section class="w-full bg-secondary px-4 sm:px-6 md:px-10 py-12 md:py-20 text-white">
      <div class="w-full container mx-auto flex flex-col gap-8 md:gap-12">
        <!-- Title Section -->
        <div class="flex flex-col gap-3 sm:gap-4 items-center justify-center max-w-2xl mx-auto">
          <h2 class="text-2xl sm:text-3xl lg:text-[2rem] font-sans font-semibold text-center leading-tight">Tumbuh Bersama Iwakula</h2>
          <div class="h-1 w-20 sm:w-24 bg-accent rounded-full"></div>
          <p class="text-graysubtitle text-sm sm:text-base font-body text-center leading-relaxed">Kami membuka peluang kemitraan bagi Anda yang ingin menghadirkan produk olahan ikan berkualitas ke lebih banyak orang.</p>
        </div>

        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-between">
          <PartnershipCard v-for="(item, index) in partnerships" :key="index" :title="item.title" :description="item.description" :icon="item.icon" :button="item.button" :is-color-primary="item.isColorPrimary" />
        </div>
      </div>
    </section>
    <!-- Partnership Section -->

    <!-- About Section -->
    <section class="w-full bg-[#F3F2FF] px-4 sm:px-6 md:px-10 py-12 md:py-20 text-white">
      <div class="w-full container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-8 lg:gap-20">
        <NuxtImg src="/images/owner.webp" alt="owner" loading="lazy" format="webp" class="aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-2xl object-cover object-center" />
        <div class="flex flex-col gap-4 sm:gap-6">
          <h2 class="font-sans text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight lg:leading-14 text-nottooblack">Dari Dapur Kami untuk Nutrisi Masyarakat</h2>
          <p class="text-[#374151] text-base sm:text-lg text-left sm:text-justify leading-relaxed">
            Iwakula adalah usaha kuliner yang didirikan pada tahun 2018 bergerak dibidang olahan makanan berbasis ikan dengan konsep praktis, sehat, dan lezat. Minimnya masyarakat dalam mengkonsumsi ikan serta kendala utama dalam mengolah
            ikan yang dianggap kurang praktis dan kurang bervariasi dalam menu sehari - hari, maka Iwakula hadir sebagai solusi untuk meningkatkan konsumsi ikan dengan menghadirkan produk olahan ikan yang bervariatif, lezat, praktis dan
            bergizi.
          </p>
          <NuxtLink to="/about" class="flex items-center justify-start gap-2 text-primary text-sm sm:text-base font-semibold transition-all duration-150 hover:gap-3 mt-2">
            <span>Baca selengkapnya tentang perjalanan kami</span>
            <Icon name="i-lucide-arrow-right" class="w-4 h-4 sm:w-5 sm:h-5" />
          </NuxtLink>
        </div>
      </div>
    </section>
    <!-- About Section -->
  </div>
</template>

<script setup lang="ts">
const { fetchCategories } = useCategories();

const { data: response, pending, error } = await fetchCategories();

const categories = computed(() => response.value?.data || []);

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
</script>
