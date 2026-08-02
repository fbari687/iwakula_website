<script setup>
// 1. Inisialisasi composable Nuxt Image
const img = useImage()

// 2. Data untuk 3 section gambar Anda
const sections = [
  {
    title: 'Section Pertama',
    subtitle: 'Petualangan Dimulai',
    fileName: '/bg-one.jpg' // Taruh file ini di folder /public/bg-one.jpg
  },
  {
    title: 'Section Kedua',
    subtitle: 'Eksplorasi Fitur',
    fileName: '/bg-two.jpg'
  },
  {
    title: 'Section Ketiga',
    subtitle: 'Hubungi Kami',
    fileName: '/bg-three.jpg'
  }
]

// 3. Fungsi pembantu untuk menghasilkan inline style background yang optimal
const getBgStyle = (fileName) => {
  const optimizedUrl = img(fileName, {
    width: 1920,      // Resolusi maksimal lebar desktop
    quality: 80,      // Kompresi kualitas (80 adalah standar terbaik)
    format: 'webp'    // Otomatis ubah JPG/PNG menjadi WebP yang super ringan
  })
  
  return { backgroundImage: `url('${optimizedUrl}')` }
}
</script>

<template>
  <div class="space-y-12">
    <!-- 4. Lakukan looping untuk menampilkan ketiga gambar -->
    <div 
      v-for="(item, index) in sections" 
      :key="index"
      :style="getBgStyle(item.fileName)" 
      class="w-full h-[60vh] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white text-center p-6 shadow-lg rounded-xl"
    >
      <!-- Konten di atas background -->
      <h2 class="text-4xl font-bold mb-2 drop-shadow-md">{{ item.title }}</h2>
      <p class="text-lg opacity-90 drop-shadow-sm">{{ item.subtitle }}</p>
    </div>
  </div>
</template>

const getBgStyleWithOverlay = (fileName) => {
const optimizedUrl = img(fileName, { width: 1920, quality: 80, format: 'webp' })

// Menambahkan overlay hitam transparan (opacity 50%) sebelum gambar background
return {
backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${optimizedUrl}')`
}
}
