import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
// Reload trigger for Sprint 9 Tahap 5 SEO Audit
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

  robots: {
    disallow: ["/admin", "/api/admin"],
    sitemap: "https://iwakula.com/sitemap.xml",
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },

  nitro: {
    compressPublicAssets: true,
  },

  icon: {
    serverBundle: {
      collections: ["lucide", "flag", "ic", "mdi"],
    },
    clientBundle: {
      scan: true,
    },
  },

  experimental: {
    payloadExtraction: true,
  },

  routeRules: {
    // Static assets caching headers (1 year max-age)
    "/images/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
    "/_nuxt/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },

    // Public SSR Pages: SWR (Stale-While-Revalidate) Caching
    "/": { swr: 60 },
    "/en": { swr: 60 },
    "/about": { swr: 3600 },
    "/en/about": { swr: 3600 },
    "/services": { swr: 3600 },
    "/en/services": { swr: 3600 },
    "/products": { swr: 60 },
    "/en/products": { swr: 60 },
    "/products/**": { swr: 60 },
    "/en/products/**": { swr: 60 },

    // Public API SWR Caching
    "/api/categories": { swr: 3600 },
    "/api/achievements": { swr: 3600 },
    "/api/contacts": { swr: 3600 },
    "/api/products": { swr: 60 },
    "/api/products/**": { swr: 60 },

    // Admin UI & API: NO CACHE (Security & Instant Auth State)
    "/admin/**": { ssr: false, headers: { "cache-control": "no-store, no-cache, must-revalidate" } },
    "/api/admin/**": { headers: { "cache-control": "no-store, no-cache, must-revalidate" } },
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

  image: {
    quality: 80,
    format: ["webp", "png", "jpeg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

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
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
    },
    families: [
      {
        name: "Plus Jakarta Sans",
        provider: "google",
        weights: [400, 500, 600, 700, 800],
        styles: ["normal"],
        subsets: ["latin"],
        display: "swap",
        preload: true,
      },
      {
        name: "Inter",
        provider: "google",
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        subsets: ["latin"],
        display: "swap",
        preload: true,
      },
    ],
  },
});