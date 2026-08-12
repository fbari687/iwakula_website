<template>
  <!-- Loading State -->
  <div v-if="pending" class="flex justify-center items-center py-40 bg-bone min-h-screen">
    <UIcon name="i-lucide-loader-2" class="w-10 h-10 animate-spin text-primary" />
  </div>

  <!-- Error / Not Found State -->
  <div v-else-if="error || !product" class="text-center py-40 bg-bone min-h-screen flex flex-col gap-4 items-center justify-center">
    <h1 class="text-2xl font-bold text-nottooblack">Produk Tidak Ditemukan</h1>
    <UButton to="/products" color="primary">Kembali ke Katalog</UButton>
  </div>

  <!-- Main Content Detail Produk -->
  <div v-else class="flex flex-col px-4 md:px-10 pb-20 pt-24 md:pt-36 gap-6 bg-bone">
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
          <div v-if="imgs.length > 1" class="w-full relative">
            <UCarousel
              :items="imgs"
              :ui="{
                item: 'basis-1/3 snap-start',
              }"
            >
              <template #default="{ item }">
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
          <div class="flex flex-row gap-2 overflow-x-auto scrollbar-none w-full max-w-full pb-1">
            <div v-for="(item, index) in product.highlights" :key="index" class="bg-accent px-3 py-1 flex items-center justify-center rounded-full shrink-0">
              <span class="text-xs font-body font-medium text-[#271900] whitespace-nowrap">
                {{ item }}
              </span>
            </div>
          </div>
          <h2 class="font-sans font-bold text-nottooblack text-3xl sm:text-4xl lg:text-5xl leading-tight">{{ product.name }}</h2>
          <span class="font-body text-base sm:text-lg text-nottooblack">
            <NuxtLink v-if="product.category?.slug" :to="`/products?category=${product.category.slug}#${product.category.slug}`">{{ product.category?.name || 'Tanpa Kategori' }}</NuxtLink>
            <span v-else>Tanpa Kategori</span> • {{ product.subTitle }}
          </span>
          <div class="p-6 bg-[#F3F2FF] border border-[#E0BFB94D] rounded-md">
            <div class="flex flex-col gap-1">
              <div class="flex gap-4 items-end justify-start">
                <span class="text-primary font-sans font-semibold text-[2rem]">Rp {{ product.price.toLocaleString("id-ID") }}</span>
                <span v-if="product.originalPrice && product.originalPrice > product.price" class="text-darkprimary font-body font-semibold text-sm tracking-[0.7px] line-through pb-1.5">
                  Rp {{ product.originalPrice.toLocaleString("id-ID") }}
                </span>
              </div>
              <span class="italic font-body text-xs text-darkprimary font-medium">*Harga belum termasuk ongkir</span>
            </div>
          </div>

          <!-- Tombol WhatsApp Dinamis dari Contacts -->
          <NuxtLink
            :to="`https://wa.me/${whatsappNumber}?text=Halo%20Iwakula,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`"
            target="_blank"
            class="bg-primary py-4 w-full flex items-center justify-center text-white rounded-md font-bold font-sans text-lg cursor-pointer transition-colors duration-150 hover:bg-primary/90"
          >
            <span>Pesan Sekarang via WhatsApp</span>
          </NuxtLink>

          <!-- Grid Marketplace Dinamis (grid-cols-1 jika hanya salah satu, grid-cols-1 sm:grid-cols-2 jikaeduanya ada) -->
          <div v-if="product.shopeeUrl || product.tokopediaUrl" class="grid gap-4" :class="[product.shopeeUrl && product.tokopediaUrl ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1']">
            <NuxtLink
              v-if="product.shopeeUrl"
              :to="product.shopeeUrl"
              target="_blank"
              class="bg-white py-3 w-full flex items-center justify-center text-secondary border border-secondary rounded-md font-medium tracking-[0.7px] gap-2 font-body text-base cursor-pointer transition-colors duration-150 hover:bg-gray-100"
            >
              <NuxtImg src="/images/shopee-icon.svg" class="h-6" />
              <span>Shopee</span>
            </NuxtLink>
            <NuxtLink
              v-if="product.tokopediaUrl"
              :to="product.tokopediaUrl"
              target="_blank"
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
            label: 'data-[state=inactive]:text-darkprimary data-[state=inactive]:hover:text-[#3e2d29] data-[state=active]:text-primary transition-colors whitespace-nowrap',
            indicator: 'bg-primary h-0.5 -bottom-px',
          }"
        >
          <template #description>
            <ProductTabDescription :description="product.description" />
          </template>
        </UTabs>
      </div>
    </section>

    <!-- Section Rekomendasi Menu -->
    <section class="w-full bg-bone px-4 md:px-10 pt-4">
      <div class="w-full container mx-auto flex flex-col gap-8">
        <div class="w-full flex items-end justify-between">
          <div class="flex flex-col">
            <h2 class="text-[2rem] font-semibold font-sans text-nottooblack">Rekomendasi Menu Lainnya</h2>
            <p class="hidden text-nottooblack md:block">Lengkapi hidangan Anda dengan produk unggulan kami</p>
          </div>
          <NuxtLink to="/products" class="flex items-center justify-end gap-2 text-primary text-base transition-all duration-150 hover:gap-2.5">
            <span>Lihat Semua</span>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-6">
          <ProductCard
            v-for="item in recommendationProducts"
            :key="item.id"
            :name="item.name"
            :slug="item.slug"
            :subtitle="item.subTitle"
            :main-image="item.mainImage"
            :category="item.category"
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

const route = useRoute();
const slug = route.params.slug as string;

const { fetchProductBySlug, fetchProducts } = useProducts();
const { fetchContacts } = useContacts();

// 1. Fetch Detail Produk Berdasarkan Slug
const { data: productResponse, pending, error } = await fetchProductBySlug(slug);
const product = computed(() => productResponse.value?.data);

// 2. Fetch Nomor WhatsApp Dinamis dari Contacts API
const { data: contactResponse } = await fetchContacts();
const whatsappNumber = computed(() => {
  const contacts = contactResponse.value?.data || [];
  const waContact = contacts.find((item) => item.key === "whatsapp");
  if (!waContact) return "628119844941"; // Fallback nomor bawaan
  return waContact.value.replace(/\D/g, ""); // Bersihkan dari karakter non-angka
});

// 3. Fetch Rekomendasi 4 Produk
const { data: recResponse } = await fetchProducts({ limit: 4 });
const recommendationProducts = computed(() => {
  const allProducts = recResponse.value?.data || [];
  // Filter agar produk yang sedang dilihat tidak muncul di rekomendasi
  return allProducts.filter((p) => p.slug !== slug).slice(0, 4);
});

// State VueEasyLightbox & Galeri Gambar
const visibleRef = ref(false);
const indexRef = ref(0);

const imgs = computed(() => {
  if (!product.value) return [];
  const gallery = product.value.images?.map((img) => img.imageUrl) || [];
  return [product.value.mainImage, ...gallery];
});

const activeImage = ref<string>("");

// Sync activeImage saat data produk berhasil dimuat
watch(
  imgs,
  (newImgs) => {
    if (newImgs.length > 0) {
      activeImage.value = newImgs[0] ?? "";
    }
  },
  { immediate: true },
);

const showImg = (index: number) => {
  if (index < 0) return;
  indexRef.value = index;
  visibleRef.value = true;
};

const onHide = () => {
  visibleRef.value = false;
};

const tabsItems = ref<TabsItem[]>([
  {
    label: "DESKRIPSI & CARA PENYAJIAN",
    slot: "description",
  },
]);

// Dynamic Breadcrumb
const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  {
    label: "Home",
    to: "/",
    ui: { link: "text-darkprimary hover:text-primary/80 font-medium" },
  },
  {
    label: "Produk",
    to: "/products",
    ui: { link: "text-darkprimary hover:text-primary/80 font-medium" },
  },
  {
    label: product.value?.category.name || "Kategori",
    to: `/products?category=${product.value?.category.slug || ""}#${product.value?.category.slug || ""}`,
    ui: { link: "text-darkprimary hover:text-primary/80 font-medium" },
  },
  {
    label: product.value?.name || "Detail",
    to: route.path,
    ui: { link: "text-[#171B2B] font-bold" },
  },
]);
</script>

<style></style>
