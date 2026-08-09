<template>
  <div class="flex flex-col gap-4 sm:gap-10 bg-bone overflow-x-hidden">
    <!-- Hero Section -->
    <main class="relative min-h-105 sm:min-h-150 h-full w-full overflow-hidden">
      <NuxtImg src="/images/layanan.jpg" alt="Background" preload fetchpriority="high" loading="eager" class="absolute inset-0 h-full w-full object-cover object-center" />

      <div class="relative bg-black/65 min-h-105 sm:min-h-150 h-full flex items-center">
        <div class="container w-full mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-start py-12 sm:py-20">
          <div class="max-w-3xl text-white flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            <h1 class="font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight lg:leading-14 font-heading">Tumbuh Bersama Iwakula</h1>
            <p class="text-sm sm:text-base lg:text-lg font-body font-normal leading-relaxed text-graysubtitle">
              Buka peluang bisnis kuliner olahan ikan yang legal, sehat, dan menguntungkan di kota Anda. Kami menghadirkan standar kualitas premium untuk setiap mitra kami di seluruh Indonesia.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full sm:w-auto mt-2">
              <NuxtLink to="#form-kemitraan" class="text-white bg-primary py-3 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-primary/90 w-full sm:w-fit">
                <span>Daftar Sekarang</span>
              </NuxtLink>
              <NuxtLink
                to="#program-kemitraan"
                class="text-white bg-transparent border border-white/30 py-3 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-black/20 w-full sm:w-fit"
              >
                <span>Lihat Program</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- Hero Section -->

    <!-- Partnership Section -->
    <section id="program-kemitraan" class="w-full bg-bone px-4 sm:px-6 md:px-10 text-nottooblack">
      <div class="w-full container mx-auto flex flex-col gap-8 md:gap-12">
        <div class="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-between">
          <!-- Card Agen & Reseller -->
          <div class="bg-white flex flex-col justify-between p-6 sm:p-10 gap-6 rounded-2xl shadow-sm">
            <div class="flex flex-col gap-4">
              <div class="bg-primary/10 text-primary p-3 sm:p-4 w-fit rounded-full flex items-center justify-center">
                <Icon name="i-lucide-store" class="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <h2 class="font-sans font-semibold text-2xl sm:text-[2rem] text-secondary">Program Agen & Reseller</h2>

              <p class="text-sm sm:text-base font-normal text-darkprimary">Ideal untuk perorangan atau UMKM yang ingin memulai bisnis kuliner dengan modal terjangkau dan dukungan penuh.</p>

              <div class="flex flex-col items-start gap-3 sm:gap-4 mt-2">
                <div v-for="(item, idx) in resellerBenefits" :key="idx" class="flex gap-3 items-start sm:items-center">
                  <Icon name="i-lucide-badge-check" class="text-primary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5 sm:mt-0" />
                  <p class="font-body text-sm sm:text-base text-darkprimary leading-relaxed">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>

            <NuxtLink to="#form-kemitraan" class="text-white bg-primary py-3.5 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-primary/90 w-full">
              <span>Gabung Jadi Agen</span>
            </NuxtLink>
          </div>

          <!-- Card B2B & Katering -->
          <div class="bg-white flex flex-col justify-between p-6 sm:p-10 gap-6 rounded-2xl shadow-sm">
            <div class="flex flex-col gap-4">
              <div class="bg-secondary/10 text-secondary p-3 sm:p-4 w-fit rounded-full flex items-center justify-center">
                <Icon name="i-lucide-factory" class="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <h2 class="font-sans font-semibold text-2xl sm:text-[2rem] text-secondary">Suplai Katering & Bisnis B2B</h2>

              <p class="text-sm sm:text-base font-normal text-darkprimary">Solusi rantai pasok profesional untuk hotel, katering, restoran, dan toko retail modern skala besar.</p>

              <div class="flex flex-col items-start gap-3 sm:gap-4 mt-2">
                <div v-for="(item, idx) in b2bBenefits" :key="idx" class="flex gap-3 items-start sm:items-center">
                  <Icon name="i-lucide-badge-check" class="text-secondary w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5 sm:mt-0" />
                  <p class="font-body text-sm sm:text-base text-darkprimary leading-relaxed">
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>

            <NuxtLink
              to="#form-kemitraan"
              class="text-secondary bg-white py-3.5 px-6 rounded-lg font-semibold border border-secondary text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-secondary/5 w-full"
            >
              <span>Hubungi Tim B2B</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <!-- Partnership Section -->

    <!-- Trust & Legalities Section -->
    <section class="w-full px-4 sm:px-6 md:px-10 py-8 md:py-12 bg-white">
      <div class="w-full container mx-auto flex flex-col gap-6 md:gap-8">
        <div class="flex flex-col gap-2 items-center justify-center">
          <h2 class="text-xl sm:text-2xl font-sans font-semibold text-center text-nottooblack">Jaminan Mutu & Kualitas Terbina</h2>
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
          <h2 class="text-2xl sm:text-[2rem] font-sans font-semibold text-center text-nottooblack">Alur Kerja Sama</h2>
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
    <section id="form-kemitraan" class="w-full px-4 sm:px-6 md:px-10 py-8 md:py-16 bg-bone">
      <div class="w-full container mx-auto">
        <div class="w-full bg-white grid grid-cols-1 lg:grid-cols-2 shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <!-- Banner Kiri -->
          <div class="w-full p-6 sm:p-10 lg:p-12 bg-secondary text-white flex flex-col justify-center gap-4 sm:gap-6">
            <h2 class="font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">Mulai Langkah Anda</h2>
            <p class="text-white/80 text-sm sm:text-base leading-relaxed">Isi formulir di samping dan tim kami akan segera menghubungi Anda untuk mendiskusikan peluang kerja sama terbaik.</p>
            <div class="flex flex-col gap-3 mt-2 sm:mt-4">
              <div class="flex items-center gap-3 text-sm text-white/90">
                <Icon name="i-lucide-check-circle-2" class="text-accent w-5 h-5 shrink-0" />
                <span>Konsultasi gratis tanpa biaya pendaftaran</span>
              </div>
              <div class="flex items-center gap-3 text-sm text-white/90">
                <Icon name="i-lucide-check-circle-2" class="text-accent w-5 h-5 shrink-0" />
                <span>Respon cepat dari tim sales resmi Iwakula</span>
              </div>
            </div>
          </div>

          <!-- Form Kanan -->
          <form @submit.prevent="handleSubmit" class="w-full p-6 sm:p-8 lg:p-10 flex flex-col gap-4">
            <div class="w-full flex flex-col gap-1.5">
              <label class="text-xs sm:text-sm text-secondary font-semibold tracking-wider uppercase">Nama Lengkap</label>
              <div class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary transition-colors">
                <input v-model="form.name" type="text" required class="w-full outline-none text-sm font-body text-nottooblack" placeholder="Masukkan nama sesuai KTP" />
              </div>
            </div>

            <div class="w-full flex flex-col gap-1.5">
              <label class="text-xs sm:text-sm text-secondary font-semibold tracking-wider uppercase">Nomor WhatsApp</label>
              <div class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary transition-colors">
                <input v-model="form.phone" type="tel" required class="w-full outline-none text-sm font-body text-nottooblack" placeholder="08xx-xxxx-xxxx" />
              </div>
            </div>

            <div class="w-full flex flex-col gap-1.5">
              <label class="text-xs sm:text-sm text-secondary font-semibold tracking-wider uppercase">Kota Lokasi</label>
              <div class="w-full px-4 py-3 border border-gray-300 rounded-lg focus-within:border-primary transition-colors">
                <input v-model="form.city" type="text" required class="w-full outline-none text-sm font-body text-nottooblack" placeholder="Sebutkan kota domisili/usaha" />
              </div>
            </div>

            <div class="w-full flex flex-col gap-1.5">
              <label class="text-xs sm:text-sm text-secondary font-semibold tracking-wider uppercase">Pilihan Layanan</label>
              <select v-model="form.program" name="layanan" class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none bg-white text-sm font-body text-nottooblack focus:border-primary transition-colors">
                <option value="agen">Program Agen & Reseller</option>
                <option value="b2b">Suplai Katering & Bisnis B2B</option>
              </select>
            </div>

            <button type="submit" class="text-white bg-primary py-3.5 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition duration-150 hover:bg-primary/90 w-full mt-2 cursor-pointer">
              <span>Kirim Permohonan</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const formatter = new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 });

const resellerBenefits = ["Margin keuntungan tinggi & harga khusus grosir", "Gratis Marketing Kit (Flyer, Foto Produk HD, Konten Sosmed)", "Pendampingan edukasi produk dan strategi penjualan", "Proteksi area eksklusif bagi Agen Kota"];

const b2bBenefits = ["Produksi kapasitas besar (mencapai ribuan porsi per hari)", "Kualitas dan standardisasi rasa yang konsisten", "Layanan pengiriman terjadwal armada Frozen", "Dukungan dokumen legalitas lengkap (BPOM/Halal)"];

const legalities = [
  {
    title: "Tersertifikasi BADAN POM",
    image: "/images/BADAN_POM.png",
  },
  {
    title: "Tersertifikasi Halal Indonesia",
    image: "/images/Halal_Indonesia.webp",
  },
  {
    title: "Tersertifikasi Kementerian Kelautan dan Perikanan",
    image: "images/Logo_Kementerian_Kelautan_dan_Perikanan.png",
  },
  {
    title: "Binaan Pemkot Depok",
    image: "/images/Lambang_Kota_Depok.png",
  },
];

const workSteps = [
  {
    title: "Hubungi Kontak",
    desc: "Konsultasi awal melalui tim marketing WhatsApp kami.",
  },
  {
    title: "Verifikasi Kota",
    desc: "Pengecekan ketersediaan wilayah atau kapasitas produksi.",
  },
  {
    title: "Pembayaran Grosir",
    desc: "Transaksi aman melalui rekening resmi perusahaan.",
  },
  {
    title: "Pengiriman Frozen",
    desc: "Pengiriman terjadwal menggunakan kargo berpendingin.",
  },
];

const form = reactive({
  name: "",
  phone: "",
  city: "",
  program: "agen",
});

function handleSubmit() {
  const message = `Halo Iwakula, saya berminat mendaftar Kemitraan.%0A%0A*Nama:* ${form.name}%0A*WhatsApp:* ${form.phone}%0A*Kota:* ${form.city}%0A*Pilihan Program:* ${form.program === "agen" ? "Program Agen & Reseller" : "Suplai Katering & B2B"}`;

  window.open(`https://wa.me/628111234567?text=${message}`, "_blank");
}
</script>
