<template>
  <footer class="w-full bg-secondary text-white">
    <div class="w-full px-10 py-20 container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 items-start justify-between">
      <!-- Logo and Description -->
      <div class="flex flex-col gap-4">
        <NuxtImg src="/images/logo.png" alt="Logo" class="h-17.5 w-fit" />
        <p class="text-white text-base font-body">Solusi Enak Makan Ikan. Menyajikan olahan ikan tenggiri premium yang praktis, sehat, dan lezat.</p>
        <p class="text-white text-sm font-body">Wisma Harapan 2 Blok H2 No. 14, RT. 03 RW. 20, Kel. Mekarsari, Kec Cimanggis, Kota Depok, Jawa Barat.</p>
      </div>
      <!-- Logo and Description -->
      <!-- Navigation -->
      <div class="flex flex-col gap-4">
        <h3 class="font-body text-accent text-sm font-bold">Navigasi</h3>
        <div class="flex flex-col gap-2">
          <NuxtLink to="/products" class="text-base text-white">Katalog Produk</NuxtLink>
          <NuxtLink to="/services" class="text-base text-white">Layanan & Kemitraan</NuxtLink>
          <NuxtLink to="/about" class="text-base text-white">Tentang Kami</NuxtLink>
          <NuxtLink to="/policy" class="text-base text-white">Kebijakan Privasi</NuxtLink>
          <NuxtLink to="/terms" class="text-base text-white">Syarat & Ketentuan</NuxtLink>
        </div>
      </div>
      <!-- Navigation -->

      <!-- Contact -->
      <div class="flex flex-col gap-4">
        <h3 class="font-body text-accent text-sm font-bold">Hubungi Kami</h3>
        <div class="flex flex-col gap-2">
          <span class="text-base text-white">WhatsApp: 0811-9844-941</span>
          <span class="text-base text-white">Email: iwakulafood@gmail.com</span>
        </div>
        <div class="flex gap-4 items-center justify-start">
          <NuxtLink to="/tiktok" class="transition-all duration-150 hover:text-[#EE1D52]">
            <Icon name="i-ic-baseline-tiktok" size="24" />
          </NuxtLink>
          <NuxtLink to="/instagram" class="transition-all duration-150 hover:text-[#E1306C]">
            <Icon name="i-mdi-instagram" size="24" />
          </NuxtLink>
        </div>
      </div>
      <!-- Contact -->

      <!-- Location -->
      <div class="flex flex-col gap-4">
        <h3 class="font-body text-accent text-sm font-bold">Lokasi Kedai</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.17287237431!2d106.86735447573308!3d-6.371669462329494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed001adbe0e7%3A0xf792b8a62559e9d0!2sPempek%20Iwakula%20Tipar!5e0!3m2!1sid!2sid!4v1785651755190!5m2!1sid!2sid"
          class="w-full aspect-square"
          style="border: 0"
          allowfullscreen="false"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <!-- Location -->
    </div>
    <div class="w-full border-t border-t-[rgba(255, 255, 255, 0.20)]">
      <div class="w-full px-10 py-6 container mx-auto">
        <p class="text-[#9CA3AF] text-center font-body">© 2026 Iwakula (CV Berkah Samudera Nusantara). All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup></script>

<style></style>
