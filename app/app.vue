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
  link: [{ rel: "icon", type: "image/x-icon", href: "/images/logo.png" }],
});
</script>
