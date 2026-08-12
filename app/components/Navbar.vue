<template>
  <header
    :class="[
      'w-full py-4 px-6 lg:px-10 flex flex-row justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300',
      // Jika di halaman detail produk ATAU sedang di-scroll, gunakan background gelap + blur
      shouldHaveBackground ? 'bg-slate-900/85 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-4',
    ]"
  >
    <!-- Brand Logo -->
    <NuxtLink to="/" class="shrink-0">
      <NuxtImg src="/images/logo.png" class="h-10 lg:h-14 xl:h-17.5 transition-all duration-300" />
    </NuxtLink>

    <!-- DESKTOP MENU (1024px+) -->
    <div class="hidden lg:flex flex-row gap-4 xl:gap-6 items-center justify-start shrink-0">
      <NuxtLink to="/" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>Beranda</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path === '/' ? 'w-full' : 'w-0']"></div>
      </NuxtLink>
      <NuxtLink to="/products" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>Katalog Produk</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path.startsWith('/products') ? 'w-full' : 'w-0']"></div>
      </NuxtLink>
      <NuxtLink to="/services" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>Layanan & Kemitraan</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path.startsWith('/services') ? 'w-full' : 'w-0']"></div>
      </NuxtLink>
      <NuxtLink to="/about" class="text-white font-semibold flex flex-col gap-1 group whitespace-nowrap text-sm xl:text-base">
        <span>Tentang Kami</span>
        <div :class="['h-0.5 bg-white transition-all duration-300 group-hover:w-full', route.path.startsWith('/about') ? 'w-full' : 'w-0']"></div>
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
            content: 'w-48 bg-white dark:bg-white text-black',
            item: 'bg-white hover:bg-black/80 cursor-pointer text-black hover:text-black',
          }"
        >
          <UButton label="ID" trailing-icon="i-lucide-chevron-down" icon="flag:id-4x3" color="neutral" variant="ghost" class="hover:bg-white/10 text-sm xl:text-base font-bold text-white cursor-pointer" />
        </UDropdownMenu>
        <div class="h-px"></div>
      </div>

      <NuxtLink to="/products" class="text-white bg-primary py-2 px-3 xl:px-4 rounded-lg font-semibold text-sm xl:text-base whitespace-nowrap flex flex-col items-center justify-center gap-1 transition duration-150 hover:bg-primary/90 shrink-0">
        <span>Pesan Sekarang</span>
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
          content: 'w-48 bg-white dark:bg-white text-black',
          item: 'bg-white hover:bg-black/80 cursor-pointer text-black hover:text-black',
        }"
      >
        <UButton label="ID" trailing-icon="i-lucide-chevron-down" icon="flag:id-4x3" color="neutral" variant="ghost" class="hover:bg-white/10 text-base font-bold text-white cursor-pointer" />
      </UDropdownMenu>
      <UButton icon="i-lucide-menu" color="neutral" variant="ghost" class="text-white text-2xl p-2 cursor-pointer" @click="isMobileMenuOpen = true" />
    </div>

    <!-- MOBILE SIDEBAR / DRAWER (Nuxt UI v4) -->
    <UDrawer
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
              <NuxtImg src="/images/logo.png" class="h-10" />
              <UButton icon="i-lucide-x" color="neutral" variant="ghost" class="text-gray-700 text-xl cursor-pointer" @click="isMobileMenuOpen = false" />
            </div>

            <!-- Links Navigasi Mobile -->
            <nav class="flex flex-col gap-2 font-semibold text-lg text-gray-800">
              <NuxtLink to="/" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> Beranda </NuxtLink>
              <NuxtLink to="/products" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> Katalog Produk </NuxtLink>
              <NuxtLink to="/services" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> Layanan & Kemitraan </NuxtLink>
              <NuxtLink to="/about" class="hover:text-primary transition-colors py-3 px-1" @click="isMobileMenuOpen = false"> Tentang Kami </NuxtLink>
            </nav>
          </div>

          <!-- Bottom Actions -->
          <div class="flex flex-col gap-4 pt-6 border-t border-gray-100">
            <NuxtLink :to="whatsappLink" target="_blank" class="w-full text-center text-white bg-primary py-3 px-4 rounded-lg font-semibold text-base transition duration-150 hover:bg-primary/90" @click="isMobileMenuOpen = false">
              Pesan Sekarang
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
  return /^\/products\/.+/.test(route.path);
});

const shouldHaveBackground = computed(() => isScrolled.value || isProductDetail.value);

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const languages = ref<DropdownMenuItem[]>([
  {
    label: "ID",
    icon: "flag:id-4x3",
  },
  {
    label: "EN",
    icon: "flag:us-4x3",
  },
]);

// Logika pendeteksi scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20; // Mengaktifkan efek saat scroll lebih dari 20px
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
