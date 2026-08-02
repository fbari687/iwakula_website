<template>
  <div class="lg:h-75 rounded-[16px] bg-[#FFFFFF0D] p-8 border border-[#FFFFFF1A] flex flex-col justify-between items-center gap-6">
    <Icon :name="icon" size="48" class="text-accent" />
    <h2 class="font-bold font-sans text-2xl">{{ title }}</h2>
    <p class="font-body text-center text-base">{{ description }}</p>
    <NuxtLink
      to="/services"
      :class="[
        'py-3 px-6 rounded-lg text-base flex flex-col items-center justify-center gap-1 transition duration-150 w-fit',
        isColorPrimary ? 'text-white bg-primary hover:bg-primary/90' : 'text-accent bg-transparent border border-accent hover:bg-accent hover:text-nottooblack',
      ]"
    >
      <span class="text-center">{{ button }}</span>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  icon: string;
  title: string;
  description: string;
  button: string;
  isColorPrimary: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<style></style>
