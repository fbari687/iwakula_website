<template>
  <div class="flex flex-col gap-2 items-center justify-center p-6">
    <NuxtImg :src="image" :alt="title" loading="lazy" format="webp" class="h-25 w-fit mix-blend-multiply" />
    <h3 class="font-sans font-bold text-nottooblack text-base text-center">{{ title }}</h3>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  image: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style></style>
