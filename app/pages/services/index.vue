<template>
  <div class="flex flex-col gap-4 sm:gap-10 bg-bone overflow-x-hidden">
    <!-- Hero Section -->
    <main class="relative min-h-105 sm:min-h-150 h-full w-full overflow-hidden">
      <NuxtImg src="/images/layanan.jpg" alt="Layanan dan Kemitraan Iwakula Background" preload fetchpriority="high" loading="eager" class="absolute inset-0 h-full w-full object-cover object-center" />

      <div class="relative bg-black/65 min-h-105 sm:min-h-150 h-full flex items-center">
        <div class="container w-full mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-start py-12 sm:py-20">
          <div class="max-w-3xl text-white flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-14 font-heading">{{ $t("services.heroTitle") }}</h1>
            <p class="text-sm sm:text-base lg:text-lg font-body font-normal leading-relaxed text-graysubtitle">
              {{ $t("services.heroSubtitle") }}
            </p>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto mt-2">
              <a href="#form-kemitraan" @click.prevent="scrollToSection('form-kemitraan')" class="text-white bg-primary py-3 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-primary/90 w-full sm:w-fit cursor-pointer">
                <span>{{ $t("services.registerNow") }}</span>
              </a>
              <a
                href="#program-kemitraan"
                @click.prevent="scrollToSection('program-kemitraan')"
                class="text-white bg-transparent border border-white/30 py-3 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-black/20 w-full sm:w-fit cursor-pointer"
              >
                <span>{{ $t("services.viewProgram") }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Hero Section -->

    <!-- Partnership Section -->
    <section id="program-kemitraan" class="w-full bg-bone px-4 sm:px-6 md:px-10 text-nottooblack scroll-mt-24">
      <div class="w-full container mx-auto flex flex-col gap-8 md:gap-12">
        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-between">
          <!-- Card Agen & Reseller -->
          <div class="bg-white flex flex-col justify-between p-6 sm:p-10 gap-6 rounded-2xl shadow-sm">
            <div class="flex flex-col gap-4">
              <div class="bg-primary/10 text-primary p-3 sm:p-4 w-fit rounded-full flex items-center justify-center">
                <Icon name="i-lucide-store" class="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <h2 class="font-sans font-semibold text-2xl sm:text-[2rem] text-secondary">{{ $t("services.resellerTitle") }}</h2>

              <p class="text-sm sm:text-base font-normal text-darkprimary">{{ $t("services.resellerDesc") }}</p>

              <div class="flex flex-col items-start gap-3 sm:gap-4 mt-2">
                <div v-for="(item, idx) in resellerBenefits" :key="idx" class="flex gap-3 items-start sm:items-center">
                  <Icon name="i-lucide-badge-check" class="text-primary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5 sm:mt-0" />
                  <p class="font-body text-sm sm:text-base text-darkprimary leading-relaxed">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>

            <a href="#form-kemitraan" @click.prevent="scrollToSection('form-kemitraan')" class="text-white bg-primary py-3.5 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-primary/90 w-full cursor-pointer">
              <span>{{ $t("services.joinAgent") }}</span>
            </a>
          </div>

          <!-- Card B2B & Katering -->
          <div class="bg-white flex flex-col justify-between p-6 sm:p-10 gap-6 rounded-2xl shadow-sm">
            <div class="flex flex-col gap-4">
              <div class="bg-secondary/10 text-secondary p-3 sm:p-4 w-fit rounded-full flex items-center justify-center">
                <Icon name="i-lucide-factory" class="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <h2 class="font-sans font-semibold text-2xl sm:text-[2rem] text-secondary">{{ $t("services.b2bTitle") }}</h2>

              <p class="text-sm sm:text-base font-normal text-darkprimary">{{ $t("services.b2bDesc") }}</p>

              <div class="flex flex-col items-start gap-3 sm:gap-4 mt-2">
                <div v-for="(item, idx) in b2bBenefits" :key="idx" class="flex gap-3 items-start sm:items-center">
                  <Icon name="i-lucide-badge-check" class="text-secondary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5 sm:mt-0" />
                  <p class="font-body text-sm sm:text-base text-darkprimary leading-relaxed">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#form-kemitraan"
              @click.prevent="scrollToSection('form-kemitraan')"
              class="text-secondary bg-white py-3.5 px-6 rounded-lg font-semibold border border-secondary text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-secondary/5 w-full cursor-pointer"
            >
              <span>{{ $t("services.contactB2b") }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <!-- Partnership Section -->

    <!-- Trust & Legalities Section -->
    <section class="w-full px-4 sm:px-6 md:px-10 py-8 md:py-12 bg-white">
      <div class="w-full container mx-auto flex flex-col gap-6 md:gap-8">
        <div class="flex flex-col gap-2 items-center justify-center">
          <h2 class="text-xl sm:text-2xl font-sans font-semibold text-center text-nottooblack">{{ $t("home.trustTitle") }}</h2>
        </div>

        <div class="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <LegalityCard v-for="(item, index) in legalities" :key="index" :image="item.image" :title="item.title" />
        </div>
      </div>
    </section>
    <!-- Trust & Legalities Section -->

    <!-- Flow Section -->
    <section class="w-full px-4 sm:px-6 md:px-10 py-8 md:py-12 bg-bone">
      <div class="w-full container mx-auto flex flex-col gap-6 md:gap-12">
        <div class="flex flex-col gap-2 items-center justify-center">
          <h2 class="text-2xl sm:text-[2rem] font-sans font-semibold text-center text-nottooblack">{{ $t("services.flowTitle") }}</h2>
        </div>

        <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(item, index) in workSteps" :key="index" class="p-6 bg-white rounded-xl shadow-sm flex flex-col gap-4 items-center border border-gray-100">
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full border-2 border-black font-sans text-xl sm:text-2xl font-bold bg-bone shrink-0"
              style="
                box-shadow:
                  0 10px 15px -3px rgba(0, 0, 0, 0.1),
                  0 4px 6px -4px rgba(0, 0, 0, 0.1);
              "
            >
              <span>{{ formatter.format(index + 1) }}</span>
            </div>
            <div class="flex flex-col gap-1.5 items-center text-center">
              <span class="font-body text-base font-bold text-nottooblack">{{ item.title }}</span>
              <span class="text-sm text-darkprimary leading-relaxed">{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Flow Section -->

    <!-- Lead Form Section -->
    <section id="form-kemitraan" class="w-full px-4 sm:px-6 md:px-10 py-8 md:py-16 bg-bone scroll-mt-24">
      <div class="w-full container mx-auto bg-white rounded-2xl shadow-md p-6 sm:p-10 md:p-14 border border-gray-100">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <!-- Text Info Left -->
          <div class="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div class="flex flex-col gap-2">
              <h2 class="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-secondary leading-tight">{{ $t("services.formTitle") }}</h2>
              <p class="font-body text-sm sm:text-base text-darkprimary leading-relaxed">
                {{ $t("services.formSubtitle") }}
              </p>
            </div>

            <div class="flex flex-col gap-3 pt-2">
              <div class="flex items-center gap-3">
                <Icon name="i-lucide-check-circle-2" class="text-primary w-5 h-5 shrink-0" />
                <span class="text-sm text-gray-700 font-medium">{{ $t("services.freeConsult") }}</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="i-lucide-check-circle-2" class="text-primary w-5 h-5 shrink-0" />
                <span class="text-sm text-gray-700 font-medium">{{ $t("services.fastResponse") }}</span>
              </div>
            </div>
          </div>

          <!-- Form Right -->
          <div class="lg:col-span-7 bg-[#F9F9FF] p-6 sm:p-8 rounded-xl border border-gray-200/60">
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
              <div class="flex flex-col gap-1.5">
                <label for="service-full-name" class="text-sm font-semibold text-gray-800">{{ $t("services.fullName") }} <span class="text-primary">*</span></label>
                <input id="service-full-name" v-model="form.name" type="text" required autocomplete="name" aria-required="true" :placeholder="$t('services.namePlaceholder')" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="service-phone" class="text-sm font-semibold text-gray-800">{{ $t("services.waNumber") }} <span class="text-primary">*</span></label>
                <input id="service-phone" v-model="form.phone" type="tel" required autocomplete="tel" aria-required="true" :placeholder="$t('services.waPlaceholder')" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="service-city" class="text-sm font-semibold text-gray-800">{{ $t("services.city") }} <span class="text-primary">*</span></label>
                <input id="service-city" v-model="form.city" type="text" required autocomplete="address-level2" aria-required="true" :placeholder="$t('services.cityPlaceholder')" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="service-choice" class="text-sm font-semibold text-gray-800">{{ $t("services.serviceChoice") }} <span class="text-primary">*</span></label>
                <select id="service-choice" v-model="form.service" aria-required="true" class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer">
                  <option value="Program Agen & Reseller">{{ $t("services.optAgent") }}</option>
                  <option value="Suplai Katering & Bisnis B2B">{{ $t("services.optB2b") }}</option>
                </select>
              </div>

              <button type="submit" class="mt-2 w-full py-4 bg-primary text-white font-sans font-bold text-base rounded-lg transition duration-150 hover:bg-primary/90 shadow-sm cursor-pointer">
                {{ $t("services.submitForm") }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- Lead Form Section -->
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const localePath = useLocalePath();

usePageSeo({
  title: t("services.seoTitle"),
  description: t("services.seoDesc"),
  breadcrumbs: [
    { name: t("nav.home"), url: localePath("/") },
    { name: t("nav.services"), url: localePath("/services") },
  ],
});

const formatter = new Intl.NumberFormat("id-ID", {
  minimumIntegerDigits: 2,
});

const { fetchContacts } = useContacts();
const { data: contactsResponse } = await fetchContacts();

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const form = ref({
  name: "",
  phone: "",
  city: "",
  service: "Program Agen & Reseller",
});

const handleSubmit = () => {
  const contacts = contactsResponse.value?.data || [];
  const waContact = contacts.find((c) => c.key === "whatsapp");
  let phone = waContact?.value ? waContact.value.replace(/\D/g, "") : "";

  if (phone.startsWith("0")) {
    phone = "62" + phone.slice(1);
  }

  if (!phone) {
    phone = "628123456789";
  }

  const message =
    `${t("services.waMessage")}\n\n` +
    `- ${t("services.fullName")}: ${form.value.name}\n` +
    `- ${t("services.waNumber")}: ${form.value.phone}\n` +
    `- ${t("services.city")}: ${form.value.city}\n` +
    `- ${t("services.serviceChoice")}: ${form.value.service}`;

  const targetUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(targetUrl, "_blank");
};

const resellerBenefits = computed(() => [
  t("services.resellerBenefits.item1"),
  t("services.resellerBenefits.item2"),
  t("services.resellerBenefits.item3"),
  t("services.resellerBenefits.item4"),
]);

const b2bBenefits = computed(() => [
  t("services.b2bBenefits.item1"),
  t("services.b2bBenefits.item2"),
  t("services.b2bBenefits.item3"),
  t("services.b2bBenefits.item4"),
]);

const workSteps = computed(() => [
  {
    title: t("services.workSteps.step1Title"),
    desc: t("services.workSteps.step1Desc"),
  },
  {
    title: t("services.workSteps.step2Title"),
    desc: t("services.workSteps.step2Desc"),
  },
  {
    title: t("services.workSteps.step3Title"),
    desc: t("services.workSteps.step3Desc"),
  },
  {
    title: t("services.workSteps.step4Title"),
    desc: t("services.workSteps.step4Desc"),
  },
]);

const legalities = computed(() => [
  {
    title: t("home.legalities.badampom"),
    image: "/images/BADAN_POM.png",
  },
  {
    title: t("home.legalities.halal"),
    image: "/images/Halal_Indonesia.webp",
  },
  {
    title: t("home.legalities.kkp"),
    image: "images/Logo_Kementerian_Kelautan_dan_Perikanan.png",
  },
  {
    title: t("home.legalities.depok"),
    image: "/images/Lambang_Kota_Depok.png",
  },
]);
</script>
