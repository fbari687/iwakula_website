<script setup lang="ts"></script>

<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Navbar />
    <main class="grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style></style>
