<template>
  <div class="flex flex-col gap-2 items-center justify-center p-6">
    <Icon :name="icon" size="42" class="bg-primary text-primary" />
    <h3 class="font-sans font-bold text-nottooblack text-xl text-center">{{ title }}</h3>
    <p class="text-sm text-nottooblack text-center">{{ subtitle }}</p>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  icon: string;
  title: string;
  subtitle: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style></style>
