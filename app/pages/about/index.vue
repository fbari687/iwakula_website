<template>
  <div class="flex flex-col bg-bone overflow-x-hidden">
    <!-- Hero Section -->
    <main class="relative min-h-90 md:min-h-100 h-full w-full overflow-hidden">
      <NuxtImg src="/images/laut.jpg" alt="Background" preload fetchpriority="high" loading="eager" format="webp" class="absolute inset-0 h-full w-full object-cover object-center" />

      <div class="relative bg-black/40 min-h-90 md:min-h-100 h-full flex items-center">
        <div class="container w-full h-full mx-auto flex items-center justify-center">
          <div class="py-16 md:py-32 px-4 md:px-8 lg:px-0 max-w-160 text-white flex flex-col gap-4 md:gap-6">
            <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-14 font-heading text-center">{{ $t("about.heroTitle") }}</h1>
            <p class="text-sm sm:text-base lg:text-lg font-body font-normal leading-relaxed text-graysubtitle text-center">{{ $t("about.heroSubtitle") }}</p>
          </div>
        </div>
      </div>
    </main>
    <!-- Hero Section -->

    <!-- About Section -->
    <section class="w-full px-4 sm:px-6 md:px-10 py-12 md:py-20 text-white">
      <div class="w-full container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-8 lg:gap-20">
        <NuxtImg src="/images/owner.webp" alt="owner" loading="lazy" format="webp" class="aspect-square w-full max-w-md mx-auto lg:max-w-none rounded-2xl object-cover object-center" />
        <div class="flex flex-col gap-4 md:gap-6">
          <h2 class="font-body text-sm md:text-base font-bold text-primary tracking-wider">{{ $t("about.badge") }}</h2>
          <h2 class="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight lg:leading-14 text-nottooblack">{{ $t("about.heading") }}</h2>
          <p class="text-[#374151] text-base md:text-lg text-left sm:text-justify leading-relaxed">
            {{ $t("about.narrative") }}
          </p>
        </div>
      </div>
    </section>
    <!-- About Section -->

    <!-- Vision and Mission Section -->
    <section class="w-full px-4 sm:px-6 md:px-10 py-12 md:py-20 bg-[#F3F2FF]">
      <div class="w-full container mx-auto grid grid-cols-1 lg:grid-cols-2 items-start justify-between gap-6 lg:gap-20">
        <!-- Visi -->
        <div class="bg-white flex flex-col p-6 sm:p-10 gap-4 rounded-2xl shadow-sm">
          <div class="bg-primary/10 text-primary p-3 sm:p-4 w-fit rounded-full flex items-center justify-center">
            <Icon name="i-lucide-eye" class="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h2 class="font-sans font-semibold text-xl sm:text-2xl">{{ $t("about.visionTitle") }}</h2>
          <p class="font-body text-sm sm:text-base text-darkprimary leading-relaxed">{{ $t("about.visionText") }}</p>
        </div>

        <!-- Misi -->
        <div class="bg-white flex flex-col p-6 sm:p-10 gap-4 rounded-2xl shadow-sm">
          <div class="bg-[#795500]/10 text-[#795500] p-3 sm:p-4 w-fit rounded-full flex items-center justify-center">
            <Icon name="i-lucide-rocket" class="w-6 h-6 sm:w-8 sm:h-8" />
          </div>

          <h2 class="font-sans font-semibold text-xl sm:text-2xl">{{ $t("about.missionTitle") }}</h2>

          <div class="flex flex-col items-start gap-4">
            <div class="flex gap-3 items-start">
              <Icon name="i-lucide-badge-check" class="text-primary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5" />
              <p class="font-body text-sm sm:text-base text-darkprimary text-left sm:text-justify leading-relaxed">
                {{ $t("about.missionItem1") }}
              </p>
            </div>

            <div class="flex gap-3 items-start">
              <Icon name="i-lucide-badge-check" class="text-primary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5" />
              <p class="font-body text-sm sm:text-base text-darkprimary text-left sm:text-justify leading-relaxed">{{ $t("about.missionItem2") }}</p>
            </div>

            <div class="flex gap-3 items-start">
              <Icon name="i-lucide-badge-check" class="text-primary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5" />
              <p class="font-body text-sm sm:text-base text-darkprimary text-left sm:text-justify leading-relaxed">{{ $t("about.missionItem3") }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Vision and Mission Section -->

    <!-- Achievement Section (Dinamis dari Backend API) -->
    <section class="w-full px-4 sm:px-6 md:px-10 py-12 md:py-20 bg-bone">
      <div class="w-full container mx-auto flex flex-col gap-8 md:gap-12">
        <div class="flex flex-col gap-2 md:gap-4 items-center justify-center">
          <h2 class="text-2xl sm:text-3xl md:text-[2rem] font-sans font-semibold text-center text-nottooblack">{{ $t("about.achievementsTitle") }}</h2>
          <div class="h-1 w-20 sm:w-24 bg-primary rounded-full"></div>
        </div>

        <div v-if="achievementsPending" class="flex justify-center py-8">
          <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary" />
        </div>

        <div v-else class="w-full flex flex-col gap-6">
          <AchievementCard v-for="item in achievements" :key="item.id" :badge="item.badge" :title="item.title" :description="item.description" :image="item.image" @open-lightbox="openLightbox(item.image)" />
        </div>
      </div>
    </section>
    <!-- Achievement Section -->

    <!-- Corporate Profile Section -->
    <section class="w-full px-4 sm:px-6 md:px-10 py-12 md:py-20 bg-white">
      <div class="w-full container mx-auto">
        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <!-- Sisi Kiri: Profil & Zoning -->
          <div class="flex flex-col gap-6 md:gap-8">
            <div class="flex flex-col gap-2">
              <h2 class="text-[#485F84] font-black text-2xl sm:text-3xl lg:text-[2rem] font-body leading-tight">{{ $t("about.companyName") }}</h2>
              <h5 class="text-darkprimary font-medium text-sm sm:text-base">{{ $t("about.companySub") }}</h5>
            </div>

            <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div class="p-4 flex flex-col gap-1 bg-[#FAF8FF] border border-gray-200 rounded-xl">
                <h3 class="text-primary font-body font-bold text-xs sm:text-sm">{{ $t("about.nib") }}</h3>
                <h3 class="text-nottooblack font-body font-bold text-sm sm:text-base">0220207720919</h3>
              </div>
              <div class="p-4 flex flex-col gap-1 bg-[#FAF8FF] border border-gray-200 rounded-xl">
                <h3 class="text-primary font-body font-bold text-sm">{{ $t("about.standardization") }}</h3>
                <h3 class="text-nottooblack font-body font-bold text-sm sm:text-base">Linear Workflow</h3>
              </div>
            </div>

            <div class="w-full flex flex-col gap-4">
              <h2 class="font-sans text-xl sm:text-2xl font-semibold">{{ $t("about.zoningTitle") }}</h2>
              <div v-for="(zone, index) in kitchenZoning" :key="zone" class="flex items-center gap-3 sm:gap-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-nottooblack flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
                  {{ index + 1 }}
                </div>
                <h4 class="font-medium text-sm sm:text-base text-darkprimary">{{ zone }}</h4>
              </div>
            </div>
          </div>

          <!-- Sisi Kanan: Fasilitas Produksi (Bisa diklik untuk Zoom Lightbox) -->
          <div class="w-full flex flex-col gap-6 p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 class="text-xl sm:text-2xl font-bold font-sans text-nottooblack">{{ $t("about.facilitiesTitle") }}</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="(img, index) in facilityImages" :key="index" class="relative w-full aspect-4/3 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer" @click="openLightbox(img.src)">
                <NuxtImg :src="img.src" :alt="img.alt" class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" />
                <div class="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <UIcon name="i-lucide-maximize-2" class="w-6 h-6 text-white drop-shadow-md shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Corporate Profile Section -->

    <!-- Lightbox Component Universal Halaman About -->
    <ClientOnly>
      <VueEasyLightbox :visible="visibleRef" :imgs="allLightboxImages" :index="indexRef" @hide="visibleRef = false" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

usePageSeo({
  title: t("about.seoTitle"),
  description: t("about.seoDesc"),
});

const { fetchAchievements } = useAchievements();
const { data: achievementResponse, pending: achievementsPending } = await fetchAchievements();

const achievements = computed(() => achievementResponse.value?.data || []);

const kitchenZoning = computed(() => [
  t("about.kitchenZoning.zone1"),
  t("about.kitchenZoning.zone2"),
  t("about.kitchenZoning.zone3"),
  t("about.kitchenZoning.zone4"),
]);

const facilityImages = computed(() => [
  { src: "/images/fasilitas(1).jpg", alt: t("about.facilities.img1") },
  { src: "/images/fasilitas(2).jpg", alt: t("about.facilities.img2") },
  { src: "/images/fasilitas(3).jpg", alt: t("about.facilities.img3") },
  { src: "/images/fasilitas(4).jpg", alt: t("about.facilities.img4") },
]);

// Lightbox State Management
const visibleRef = ref(false);
const indexRef = ref(0);

// Array gabungan seluruh gambar di halaman About (Foto Sertifikat + Foto Fasilitas)
const allLightboxImages = computed(() => {
  const certImages = achievements.value.map((item) => item.image);
  const facilitySrcs = facilityImages.value.map((img) => img.src);
  return [...certImages, ...facilitySrcs];
});

// Fungsi membuka Lightbox sesuai gambar yang diklik
const openLightbox = (imageSrc: string) => {
  const targetIndex = allLightboxImages.value.indexOf(imageSrc);
  if (targetIndex !== -1) {
    indexRef.value = targetIndex;
    visibleRef.value = true;
  }
};
</script>

<style></style>
