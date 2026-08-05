import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/ui",
    "nuxt-easy-lightbox",
  ],
  fonts: {
    families: [
      { name: "Plus Jakarta Sans", provider: "google" },
      { name: "Inter", provider: "google" },
    ],
  },
});