<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage class="font-body text-nottooblack" />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "IWAKULA",
});
useHead({
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "icon", type: "image/png", href: "/images/logo.png" },
    { rel: "apple-touch-icon", href: "/images/logo.png" },
  ],
});
</script>
