<template>
  <div class="flex flex-col gap-4 sm:gap-8 bg-bone overflow-x-hidden">
    <!-- Hero Section -->
    <main class="relative min-h-80 md:min-h-100 h-full w-full overflow-hidden">
      <NuxtImg
        src="/images/dinein.webp"
        :alt="$t('dineIn.heroTitle')"
        preload
        fetchpriority="high"
        loading="eager"
        format="webp"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div class="relative bg-black/60 min-h-80 md:min-h-100 h-full flex items-center">
        <div class="container w-full h-full mx-auto flex items-center justify-center">
          <div class="py-16 md:py-32 px-4 sm:px-6 md:px-10 max-w-160 text-white flex flex-col gap-4 md:gap-6">
            <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-14 font-heading text-center">
              {{ $t("dineIn.heroTitle") }}
            </h1>
            <p class="text-sm sm:text-base lg:text-lg font-body font-normal leading-relaxed text-graysubtitle text-center">
              {{ $t("dineIn.heroSubtitle") }}
            </p>
          </div>
        </div>
      </div>
    </main>
    <!-- Hero Section -->

    <!-- Menu Section -->
    <section class="w-full bg-bone px-4 sm:px-6 md:px-10 py-12 md:py-20">
      <div class="w-full container mx-auto flex flex-col gap-8 md:gap-12">
        <!-- Title Section -->
        <div class="flex flex-col gap-3 sm:gap-4 items-center justify-center">
          <h2 class="text-2xl sm:text-3xl lg:text-[2rem] text-nottooblack font-sans font-semibold text-center leading-tight">
            {{ $t("dineIn.menuTitle") }}
          </h2>
          <div class="h-1 w-20 sm:w-24 bg-primary rounded-full"></div>
        </div>

        <!-- Dynamic Menu Image Section -->
        <div class="w-full flex flex-col items-center justify-center gap-8">
          <div v-if="pending" class="flex justify-center items-center py-12">
            <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary" />
          </div>

          <div v-else-if="menuImages.length > 0" class="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div
              v-for="(item, index) in menuImages"
              :key="item.id"
              class="relative group cursor-pointer overflow-hidden rounded-xl shadow-sm border border-gray-100/80 transition-transform duration-300 hover:scale-[1.01]"
              @click="openLightbox(item.imageUrl)"
            >
              <NuxtImg
                :src="item.imageUrl"
                :alt="$t('dineIn.menuTitle') + ' ' + (index + 1)"
                loading="lazy"
                format="webp"
                class="w-full max-w-4xl h-auto max-h-[85vh] object-contain rounded-xl"
              />
              <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="bg-white/90 text-nottooblack text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                  <UIcon name="i-lucide-zoom-in" class="w-4 h-4 text-primary" />
                  <span>{{ $t("common.viewDetail") || "Perbesar Gambar" }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Menu Section -->

    <!-- Info Section -->
    <section class="w-full bg-bone px-4 sm:px-6 md:px-10 py-8 md:py-16">
      <div class="w-full container mx-auto grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-sm p-6 sm:p-8 md:p-10 gap-8 md:gap-12 border border-gray-100/80">
        <div class="flex flex-col gap-4">
          <NuxtImg
            src="/images/toko.jpg"
            :alt="$t('dineIn.visitTitle')"
            loading="lazy"
            format="webp"
            class="w-full h-64 sm:h-72 lg:h-80 object-cover rounded-xl shadow-sm"
          />
          <div class="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
            <div
              v-for="(item, index) in badgeShops"
              :key="index"
              class="bg-accent px-3 py-1.5 w-fit rounded-full text-xs sm:text-sm font-medium flex items-center justify-center text-darkprimary hover:opacity-90 transition-opacity gap-2 shadow-xs"
            >
              <Icon :name="item.icon" class="w-4 h-4 text-darkprimary" />
              <span>{{ item.title }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-between gap-6 py-1 sm:py-2">
          <div class="flex flex-col gap-5 sm:gap-6">
            <h3 class="font-bold text-xl sm:text-2xl text-nottooblack font-sans">
              {{ $t("dineIn.visitTitle") }}
            </h3>

            <!-- Jam Operasional Box -->
            <div class="bg-[#F3F2FF] p-4 sm:p-5 rounded-xl border border-primary/10">
              <div class="flex gap-3 sm:gap-4 items-start">
                <Icon name="i-lucide-clock" class="text-primary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5" />
                <div class="font-body text-sm sm:text-base text-darkprimary text-left leading-relaxed flex flex-col gap-1.5">
                  <p class="font-bold text-nottooblack">{{ $t("dineIn.operationalHours") }}</p>
                  <div class="flex flex-col gap-0.5 font-normal text-gray-700">
                    <p>{{ $t("dineIn.monSat") }}</p>
                    <p>{{ $t("dineIn.sun") }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alamat Kedai Box -->
            <div class="bg-[#F3F2FF] p-4 sm:p-5 rounded-xl border border-primary/10">
              <div class="flex gap-3 sm:gap-4 items-start">
                <Icon name="i-lucide-map-pin" class="text-primary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5" />
                <div class="font-body text-sm sm:text-base text-darkprimary text-left leading-relaxed flex flex-col gap-1.5">
                  <p class="font-bold text-nottooblack">{{ $t("dineIn.addressTitle") }}</p>
                  <p class="font-normal text-gray-700">{{ $t("dineIn.addressText") }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons Grid -->
          <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
            <NuxtLink
              to="https://maps.app.goo.gl/HVqZAruPAMG29E96A"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('dineIn.directionsBtn')"
              class="text-white bg-primary py-3.5 px-5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-primary/90 shadow-xs cursor-pointer text-center"
            >
              <Icon name="i-lucide-navigation" class="w-5 h-5 shrink-0" />
              <span>{{ $t("dineIn.directionsBtn") }}</span>
            </NuxtLink>

            <NuxtLink
              :to="waLink"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('dineIn.waBtn')"
              class="text-nottooblack bg-white border border-gray-300 py-3.5 px-5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-gray-50 shadow-xs cursor-pointer text-center"
            >
              <Icon name="i-lucide-message-circle" class="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{{ $t("dineIn.waBtn") }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <!-- Info Section -->

    <!-- Lightbox Component -->
    <VueEasyLightbox
      :visible="visibleRef"
      :imgs="lightboxImages"
      :index="indexRef"
      @hide="visibleRef = false"
    />
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

usePageSeo({
  title: t("dineIn.seoTitle"),
  description: t("dineIn.seoDesc"),
  includeRestaurantSchema: true,
  breadcrumbs: [
    { name: t("nav.home"), url: localePath("/") },
    { name: t("nav.dineIn"), url: localePath("/dine-in") },
  ],
});

const { fetchDineInMenus } = useDineIn();
const { data: menuResponse, pending } = await fetchDineInMenus();

const menuImages = computed(() => {
  const list = menuResponse.value?.data || [];
  if (list.length === 0) {
    return [{ id: 1, imageUrl: "/uploads/menu.webp", displayOrder: 0 }];
  }
  return list;
});

// Lightbox State
const visibleRef = ref(false);
const indexRef = ref(0);
const lightboxImages = computed(() => menuImages.value.map((m) => m.imageUrl));

const openLightbox = (imageSrc: string) => {
  const targetIndex = lightboxImages.value.indexOf(imageSrc);
  if (targetIndex !== -1) {
    indexRef.value = targetIndex;
  } else {
    indexRef.value = 0;
  }
  visibleRef.value = true;
};

const { fetchContacts } = useContacts();
const { data: contactsResponse } = await fetchContacts();

const waLink = computed(() => {
  const contacts = contactsResponse.value?.data || [];
  const waContact = contacts.find((c) => c.key === "whatsapp");
  const phone = waContact?.value ? waContact.value.replace(/\D/g, "") : "";
  const targetPhone = phone || "6281234567890";
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent("Halo Admin Iwakula, saya ingin bertanya tentang Menu Kedai (Dine In)")}`;
});

const badgeShops = computed(() => [
  {
    icon: "i-lucide-utensils",
    title: t("dineIn.badgeDineIn"),
  },
  {
    icon: "i-lucide-cooking-pot",
    title: t("dineIn.badgeTakeaway"),
  },
  {
    icon: "i-lucide-banknote",
    title: t("dineIn.badgePayment"),
  },
]);
</script>

<style></style>
