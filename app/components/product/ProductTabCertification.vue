<!-- components/product/ProductTabCertification.vue -->
<template>
  <div class="flex flex-col gap-4">
    <!-- List Card Sertifikasi -->
    <div v-for="cert in certifications" :key="cert.id" class="bg-white rounded-xl p-5 border border-gray-100/80 flex items-center justify-between gap-4 transition-all duration-200 hover:border-gray-200 hover:shadow-2xs">
      <!-- Left Side: Icon + Title & Code -->
      <div class="flex items-center gap-3.5">
        <div class="w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E8E6DF] flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-badge-check" class="w-5 h-5 text-primary shrink-0" />
        </div>

        <div class="flex flex-col gap-0.5">
          <h4 class="text-sm sm:text-base font-bold text-[#171B2B]">
            {{ cert.title }}
          </h4>
          <span class="text-xs text-darkprimary/70 font-medium">
            {{ cert.code }}
          </span>
        </div>
      </div>

      <button type="button" class="text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer shrink-0" @click="openModal(cert)">{{ $t("products.viewCert") }}</button>
    </div>

    <!-- MODAL PREVIEW SERTIFIKAT (Nuxt UI v4) -->
    <UModal
      v-model:open="isOpen"
      :ui="{
        content: 'max-w-md w-full bg-white rounded-2xl p-6 shadow-xl border border-gray-100',
      }"
    >
      <template #content>
        <div v-if="selectedCert" class="flex flex-col gap-5">
          <!-- Header Modal: Title + Close Button -->
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm font-semibold text-[#171B2B]">
              {{ selectedCert.title }}
            </h3>
            <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="xs" class="text-gray-500 hover:text-gray-700 cursor-pointer p-1" @click="isOpen = false" />
          </div>

          <!-- Preview Container (Image / Placeholder) -->
          <div class="w-full aspect-3/4 bg-[#F0EFFC] rounded-xl border border-dashed border-[#C5C0F5] flex flex-col items-center justify-center overflow-hidden">
            <img v-if="selectedCert.imageUrl" :src="selectedCert.imageUrl" :alt="selectedCert.title" class="w-full h-full object-contain" />
            <UIcon v-else name="i-lucide-file-text" class="w-12 h-12 text-[#9A93DB]" />
          </div>

          <!-- Certificate Meta Info -->
          <div class="text-center flex flex-col gap-1">
            <p class="text-sm font-bold text-[#171B2B]">{{ $t("products.validUntil") }}: {{ selectedCert.validUntil }}</p>
            <span class="text-xs text-darkprimary/70">
              {{ selectedCert.code }}
            </span>
          </div>

          <!-- Action Button: Download -->
          <a :href="selectedCert.pdfUrl || '#'" target="_blank" download class="w-full py-3 px-4 bg-primary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
            <UIcon name="i-lucide-download" class="w-4 h-4 shrink-0" />
            <span>{{ $t("products.downloadCert") }}</span>
          </a>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
interface Certification {
  id: number;
  title: string;
  code: string;
  validUntil: string;
  imageUrl?: string;
  pdfUrl?: string;
}

const isOpen = ref(false);
const selectedCert = ref<Certification | null>(null);

const certifications = ref<Certification[]>([
  {
    id: 1,
    title: "Halal Indonesia",
    code: "ID00110000234560721",
    validUntil: "2027",
    imageUrl: "", // Kosongkan jika ingin tampilkan placeholder icon file
    pdfUrl: "/files/sertifikat-halal.pdf",
  },
  {
    id: 2,
    title: "BPOM MD Official",
    code: "MD 243210001234",
    validUntil: "2028",
    imageUrl: "",
    pdfUrl: "/files/sertifikat-bpom.pdf",
  },
  {
    id: 3,
    title: "P-IRT Official",
    code: "P-IRT 2023271010046-26",
    validUntil: "2026",
    imageUrl: "",
    pdfUrl: "/files/sertifikat-pirt.pdf",
  },
  {
    id: 4,
    title: "Sertifikat Kelayakan Pengolahan (SKP)",
    code: "SKP-KKP-2024-001",
    validUntil: "2029",
    imageUrl: "",
    pdfUrl: "/files/sertifikat-skp.pdf",
  },
]);

function openModal(cert: Certification) {
  selectedCert.value = cert;
  isOpen.value = true;
}
</script>
