<template>
  <div class="flex flex-col gap-4 sm:gap-8 bg-bone overflow-x-hidden">
    <!-- Hero Section -->
    <main class="relative min-h-80 md:min-h-100 h-full w-full overflow-hidden">
      <NuxtImg src="/images/bg.jpg" alt="Background" preload fetchpriority="high" loading="eager" class="absolute inset-0 h-full w-full object-cover object-center" />

      <div class="relative bg-black/60 min-h-80 md:min-h-100 h-full flex items-center">
        <div class="container w-full h-full mx-auto flex items-center justify-center">
          <div class="py-16 md:py-32 px-4 sm:px-8 lg:px-0 max-w-160 text-white flex flex-col gap-4 md:gap-6">
            <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-14 font-heading text-center">Katalog Menu Olahan Ikan</h1>
            <p class="text-sm sm:text-base lg:text-lg font-body font-normal leading-relaxed text-graysubtitle text-center">Praktis, lezat, dan kaya gizi. Temukan pilihan hidangan olahan ikan terbaik untuk keluarga Anda.</p>
          </div>
        </div>
      </div>
    </main>
    <!-- Hero Section -->

    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center py-20">
      <UIcon name="i-lucide-loader-2" class="w-10 h-10 animate-spin text-primary" />
    </div>

    <!-- Dynamic Catalog Section By Category -->
    <template v-else-if="categoriesWithProducts.length > 0">
      <section
        v-for="(catGroup, index) in categoriesWithProducts"
        :key="catGroup.category.id"
        :id="catGroup.category.slug"
        class="w-full bg-bone px-4 sm:px-6 md:px-10 py-6 sm:py-8"
        :class="{ 'pb-12 sm:pb-16': index === categoriesWithProducts.length - 1 }"
      >
        <div class="w-full container mx-auto flex flex-col gap-4 sm:gap-6">
          <!-- Title Section -->
          <div class="w-full flex items-center justify-start gap-3 sm:gap-4">
            <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold font-sans text-nottooblack">
              {{ catGroup.category.name }}
            </h2>
            <div class="w-8 sm:w-12 h-1 bg-primary rounded-full shrink-0"></div>
          </div>
          <!-- Title Section -->

          <!-- Product Grid -->
          <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <ProductTile
              v-for="item in catGroup.products"
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
    </template>

    <!-- Empty State -->
    <div v-else class="text-center py-20 text-gray-500 font-body">Belum ada produk yang tersedia saat ini.</div>
  </div>
</template>

<script lang="ts" setup>
const { fetchCategories } = useCategories();
const { fetchProducts } = useProducts();

// 1. Fetch data kategori dan produk secara bersamaan
const [{ data: categoriesResponse, pending: categoriesPending }, { data: productsResponse, pending: productsPending }] = await Promise.all([fetchCategories(), fetchProducts()]);

const pending = computed(() => categoriesPending.value || productsPending.value);

const categories = computed(() => categoriesResponse.value?.data || []);
const allProducts = computed(() => productsResponse.value?.data || []);

// 2. Kelompokkan produk berdasarkan kategorinya secara dinamis
const categoriesWithProducts = computed(() => {
  return (
    categories.value
      .map((category) => {
        // Filter produk yang berelasi dengan kategori ini
        const categoryProducts = allProducts.value.filter((product) => product.categoryId === category.id || product.category.id === category.id);

        return {
          category,
          products: categoryProducts,
        };
      })
      // Hanya tampilkan section kategori yang memiliki minimal 1 produk
      .filter((group) => group.products.length > 0)
  );
});
</script>

<style></style>
