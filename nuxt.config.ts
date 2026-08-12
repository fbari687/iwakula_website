import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    sessionSecret: process.env.NUXT_SESSION_SECRET || 'fallback_secret_must_be_32_chars_long_123',
  },

  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: "https://iwakula.com",
    name: "IWAKULA",
  },

  modules: [
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/ui",
    "nuxt-easy-lightbox",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
  ],

  i18n: {
    locales: [
      { code: "id", language: "id-ID", name: "ID", file: "id.json", icon: "flag:id-4x3" },
      { code: "en", language: "en-US", name: "EN", file: "en.json", icon: "flag:us-4x3" },
    ],
    defaultLocale: "id",
    langDir: "../i18n/locales",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "iwakula_locale",
      redirectOn: "root",
      alwaysRedirect: false,
    },
  },

  fonts: {
    families: [
      { name: "Plus Jakarta Sans", provider: "google" },
      { name: "Inter", provider: "google" },
    ],
  },
});