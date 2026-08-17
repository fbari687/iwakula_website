<template>
  <header
    :class="[
      'w-full py-4 px-6 lg:px-10 flex flex-row justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300',
      shouldHaveBackground ? 'bg-slate-900/85 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-4',
    ]"
  >
    <!-- Brand Logo -->
    <NuxtLink :to="localePath('/')" class="shrink-0" aria-label="IWAKULA Homepage">
      <NuxtImg src="/images/logo.png" alt="Logo IWAKULA" class="h-10 lg:h-14 xl:h-17.5 transition-all duration-300" />
    </NuxtLink>

    <!-- DESKTOP MENU (1024px+) -->
    <div class="hidden lg:flex flex-row gap-4 xl:gap-6 items-center justify-start shrink-0">
      <NuxtLink :to="localePath('/')" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>{{ $t("nav.home") }}</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path === localePath('/') ? 'w-full' : 'w-0']"></div>
      </NuxtLink>
      <NuxtLink :to="localePath('/products')" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>{{ $t("nav.products") }}</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path.includes('/products') ? 'w-full' : 'w-0']"></div>
      </NuxtLink>
      <NuxtLink :to="localePath('/dine-in')" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>{{ $t("nav.dineIn") }}</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path.includes('/dine-in') ? 'w-full' : 'w-0']"></div>
      </NuxtLink>
      <NuxtLink :to="localePath('/services')" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>{{ $t("nav.services") }}</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path.includes('/services') ? 'w-full' : 'w-0']"></div>
      </NuxtLink>
      <NuxtLink :to="localePath('/about')" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>{{ $t("nav.about") }}</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path.includes('/about') ? 'w-full' : 'w-0']"></div>
      </NuxtLink>

      <!-- Dropdown Bahasa Desktop -->
      <div class="flex flex-col gap-1">
        <UDropdownMenu
          :items="languages"
          :modal="false"
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8,
          }"
          :ui="{
            content: 'w-36 bg-white dark:bg-white text-black',
            item: 'bg-white hover:bg-black/80 cursor-pointer text-black hover:text-black',
          }"
        >
          <UButton :label="locale.toUpperCase()" trailing-icon="i-lucide-chevron-down" :icon="locale === 'en' ? 'flag:us-4x3' : 'flag:id-4x3'" color="neutral" variant="ghost" aria-label="Pilih Bahasa / Select Language" class="hover:bg-white/10 text-sm xl:text-base font-bold text-white cursor-pointer" />
        </UDropdownMenu>
        <div class="h-px"></div>
      </div>

      <NuxtLink :to="whatsappLink" target="_blank" rel="noopener noreferrer" aria-label="Pesan Sekarang via WhatsApp" class="text-white bg-primary py-2 px-3 xl:px-4 rounded-lg font-semibold text-sm xl:text-base whitespace-nowrap flex flex-col items-center justify-center gap-1 transition duration-150 hover:bg-primary/90 shrink-0">
        <span>{{ $t("nav.orderNow") }}</span>
        <div class="h-px"></div>
      </NuxtLink>
    </div>

    <!-- MOBILE / TABLET HAMBURGER BUTTON (<1024px) -->
    <div class="flex lg:hidden items-center gap-2">
      <UDropdownMenu
        :items="languages"
        :modal="false"
        :content="{
          align: 'start',
          side: 'bottom',
          sideOffset: 8,
        }"
        :ui="{
          content: 'w-36 bg-white dark:bg-white text-black',
          item: 'bg-white hover:bg-black/80 cursor-pointer text-black hover:text-black',
        }"
      >
        <UButton :label="locale.toUpperCase()" trailing-icon="i-lucide-chevron-down" :icon="locale === 'en' ? 'flag:us-4x3' : 'flag:id-4x3'" color="neutral" variant="ghost" aria-label="Pilih Bahasa / Select Language" class="hover:bg-white/10 text-base font-bold text-white cursor-pointer" />
      </UDropdownMenu>
      <UButton icon="i-lucide-menu" color="neutral" variant="ghost" aria-label="Buka Menu Navigasi" :aria-expanded="isMobileMenuOpen" aria-controls="mobile-nav-drawer" class="text-white text-2xl p-2 cursor-pointer" @click="isMobileMenuOpen = true" />
    </div>

    <!-- MOBILE SIDEBAR / DRAWER (Nuxt UI v4) -->
    <UDrawer
      id="mobile-nav-drawer"
      v-model:open="isMobileMenuOpen"
      direction="right"
      :handle="false"
      :ui="{
        content: 'bg-white dark:bg-white text-gray-900 dark:text-gray-900 max-w-xs w-full p-6 flex flex-col justify-between h-full',
      }"
    >
      <template #body>
        <div class="flex flex-col h-full justify-between">
          <div>
            <!-- Header Drawer Mobile (Logo + Close Button) -->
            <div class="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
              <NuxtImg src="/images/logo.png" alt="Logo IWAKULA" class="h-10" />
              <UButton icon="i-lucide-x" color="neutral" variant="ghost" aria-label="Tutup Menu Navigasi" class="text-gray-700 text-xl cursor-pointer" @click="isMobileMenuOpen = false" />
            </div>

            <!-- Links Navigasi Mobile -->
            <nav class="flex flex-col gap-2 font-semibold text-lg text-gray-800" aria-label="Mobile Menu">
              <NuxtLink :to="localePath('/')" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> {{ $t("nav.home") }} </NuxtLink>
              <NuxtLink :to="localePath('/products')" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> {{ $t("nav.products") }} </NuxtLink>
              <NuxtLink :to="localePath('/dine-in')" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> {{ $t("nav.dineIn") }} </NuxtLink>
              <NuxtLink :to="localePath('/services')" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> {{ $t("nav.services") }} </NuxtLink>
              <NuxtLink :to="localePath('/about')" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> {{ $t("nav.about") }} </NuxtLink>
            </nav>
          </div>

          <!-- Bottom Actions -->
          <div class="flex flex-col gap-4 pt-6 border-t border-gray-100">
            <NuxtLink :to="whatsappLink" target="_blank" rel="noopener noreferrer" aria-label="Pesan Sekarang via WhatsApp" class="w-full text-center text-white bg-primary py-3 px-4 rounded-lg font-semibold text-base transition duration-150 hover:bg-primary/90" @click="isMobileMenuOpen = false">
              {{ $t("nav.orderNow") }}
            </NuxtLink>
          </div>
        </div>
      </template>
    </UDrawer>
  </header>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";
import type { Contact } from "~~/server/database/schema";

const route = useRoute();
const { locale, setLocale } = useI18n();
const localePath = useLocalePath();

const { fetchContacts } = useContacts();
const { data: contactsResponse } = await fetchContacts();

const whatsappLink = computed(() => {
  const contacts = contactsResponse.value?.data || [];
  const wa = contacts.find((c) => c.key === "whatsapp");
  if (!wa || !wa.value) return "https://wa.me/";
  const cleanPhone = wa.value.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}`;
});

const isProductDetail = computed(() => {
  return /^\/(en\/)?products\/.+/.test(route.path);
});

const shouldHaveBackground = computed(() => isScrolled.value || isProductDetail.value);

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const languages = computed<DropdownMenuItem[]>(() => [
  {
    label: "ID (Bahasa Indonesia)",
    icon: "flag:id-4x3",
    onSelect: () => setLocale("id"),
  },
  {
    label: "EN (English)",
    icon: "flag:us-4x3",
    onSelect: () => setLocale("en"),
  },
]);

// Logika pendeteksi scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
