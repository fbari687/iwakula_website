<template>
  <footer class="w-full bg-secondary text-white">
    <div class="w-full px-4 sm:px-6 md:px-10 py-12 md:py-20 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 items-start justify-between">
      <!-- Logo and Description -->
      <div class="flex flex-col gap-4">
        <NuxtImg src="/images/logo.png" alt="Logo IWAKULA" class="h-17.5 w-fit" />
        <p class="text-white text-base font-body">{{ $t("footer.desc") }}</p>
        <p class="text-white text-sm font-body">{{ $t("footer.address") }}</p>
      </div>
      <!-- Logo and Description -->

      <!-- Navigation -->
      <div class="flex flex-col gap-4">
        <h3 class="font-body text-accent text-sm font-bold">{{ $t("footer.navTitle") }}</h3>
        <div class="flex flex-col gap-2">
          <NuxtLink :to="localePath('/products')" class="text-base text-white hover:text-accent transition-colors">{{ $t("nav.products") }}</NuxtLink>
          <NuxtLink :to="localePath('/dine-in')" class="text-base text-white hover:text-accent transition-colors">{{ $t("nav.dineIn") }}</NuxtLink>
          <NuxtLink :to="localePath('/services')" class="text-base text-white hover:text-accent transition-colors">{{ $t("nav.services") }}</NuxtLink>
          <NuxtLink :to="localePath('/about')" class="text-base text-white hover:text-accent transition-colors">{{ $t("nav.about") }}</NuxtLink>
        </div>
      </div>
      <!-- Navigation -->

      <!-- Contact -->
      <div class="flex flex-col gap-4">
        <h3 class="font-body text-accent text-sm font-bold">{{ $t("footer.contactTitle") }}</h3>
        <div class="flex flex-col gap-2">
          <!-- WhatsApp (Kanal Komunikasi Utama) -->
          <NuxtLink v-if="contactMap.whatsapp" :to="contactMap.whatsapp.link" target="_blank" rel="noopener noreferrer" class="text-base text-white hover:text-accent transition-colors"> WhatsApp: {{ contactMap.whatsapp.formattedValue }} </NuxtLink>

          <!-- Email -->
          <NuxtLink v-if="contactMap.email" :to="contactMap.email.link" class="text-base text-white hover:text-accent transition-colors"> Email: {{ contactMap.email.value }} </NuxtLink>
        </div>

        <!-- Social Media Icons (Dinamis v-for untuk semua sosial media selain whatsapp & email) -->
        <div class="flex gap-4 items-center justify-start flex-wrap">
          <NuxtLink v-for="social in socialMediaList" :key="social.id" :to="social.link" target="_blank" rel="noopener noreferrer" :aria-label="'Kunjungi ' + social.key + ' IWAKULA'" class="transition-all duration-150 hover:text-primary">
            <Icon :name="social.icon || 'i-lucide-link'" size="24" />
          </NuxtLink>
        </div>
      </div>
      <!-- Contact -->

      <!-- Location -->
      <div class="flex flex-col gap-4">
        <h3 class="font-body text-accent text-sm font-bold">{{ $t("footer.locationTitle") }}</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.17287237431!2d106.86735447573308!3d-6.371669462329494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed001adbe0e7%3A0xf792b8a62559e9d0!2sPempek%20Iwakula%20Tipar!5e0!3m2!1sid!2sid!4v1785651755190!5m2!1sid!2sid"
          title="Lokasi Pempek Iwakula Tipar di Google Maps"
          class="w-full aspect-square rounded-lg"
          style="border: 0"
          allowfullscreen="false"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <!-- Location -->
    </div>
    <div class="w-full border-t border-white/20">
      <div class="w-full px-4 sm:px-6 md:px-10 py-6 container mx-auto">
        <p class="text-[#9CA3AF] text-center font-body text-sm sm:text-base">{{ $t("footer.copyright") }}</p>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import type { Contact } from "~~/server/database/schema";

const localePath = useLocalePath();
const { fetchContacts } = useContacts();
const { data: response } = await fetchContacts();

const contacts = computed<Contact[]>(() => response.value?.data || []);

// Helper untuk WhatsApp & Email
const contactMap = computed(() => {
  const map: Record<string, { value: string; formattedValue?: string; link: string; icon?: string }> = {};

  contacts.value.forEach((item) => {
    let link = item.value;
    let formattedValue = item.value;

    if (item.key === "whatsapp") {
      const cleanPhone = item.value.replace(/\D/g, "");
      link = `https://wa.me/${cleanPhone}`;

      if (cleanPhone.startsWith("62")) {
        const localNum = "0" + cleanPhone.slice(2);
        formattedValue = localNum.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
      }
    } else if (item.key === "email") {
      link = `mailto:${item.value}`;
    }

    map[item.key] = {
      value: item.value,
      formattedValue,
      link,
      icon: item.icon ?? undefined,
    };
  });

  return map;
});

// Computed khusus untuk daftar Social Media (Memfilter semua item KECUALI whatsapp & email)
const socialMediaList = computed(() => {
  return contacts.value
    .filter((item) => item.key !== "whatsapp" && item.key !== "email")
    .map((item) => {
      let link = item.value;

      if (item.key === "instagram") {
        const handle = item.value.replace("@", "");
        link = `https://instagram.com/${handle}`;
      } else if (item.key === "tiktok") {
        const handle = item.value.startsWith("@") ? item.value : `@${item.value}`;
        link = `https://tiktok.com/${handle}`;
      } else if (item.key === "youtube") {
        const handle = item.value.startsWith("@") ? item.value : `@${item.value}`;
        link = `https://youtube.com/${handle}`;
      } else if (item.key === "facebook") {
        link = item.value.startsWith("http") ? item.value : `https://facebook.com/${item.value}`;
      } else if (!item.value.startsWith("http")) {
        // Fallback jika memasukkan domain/link tanpa https://
        link = `https://${item.value}`;
      }

      return {
        id: item.id,
        key: item.key,
        icon: item.icon ?? undefined,
        link,
      };
    });
});
</script>

<style></style>
