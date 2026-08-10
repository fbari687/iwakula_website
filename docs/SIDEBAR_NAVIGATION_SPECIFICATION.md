# Sidebar Navigation Specification

## Navigation Order
Struktur menu navigasi utama pada *Sidebar* harus disusun secara sekuensial dengan urutan baku sebagai berikut:
1. Dasbor
2. Produk
3. Kategori
4. Achievement
5. Kontak
6. Logout

## Route Mapping
Masing-masing menu navigasi dipetakan ke dalam rute *frontend* spesifik sebagai berikut:
- **Dasbor:** `/admin`
- **Produk:** `/admin/products`
- **Kategori:** `/admin/categories`
- **Achievement:** `/admin/achievements`
- **Kontak:** `/admin/contacts`
- **Logout:** (Tidak menggunakan rute statis). Menu ini hanya bertindak sebagai *trigger* untuk menjalankan aksi eksekusi fungsi asinkron `logout()` secara langsung tanpa memicu navigasi rute standar.

## Icon Mapping
Ikon yang dipasangkan bersumber dari Heroicons (disediakan secara *native* oleh modul Nuxt UI). Ikon harus memiliki ketebalan *outline* yang ringan dan elegan:
- **Dasbor:** `i-heroicons-squares-2x2` (Dashboard)
- **Produk:** `i-heroicons-cube`
- **Kategori:** `i-heroicons-tag`
- **Achievement:** `i-heroicons-trophy`
- **Kontak:** `i-heroicons-phone`
- **Logout:** `i-heroicons-arrow-right-on-rectangle`

## Active State
Saat sebuah rute sesuai dengan halaman yang sedang dikunjungi (*active route*), komponen `NuxtLink` wajib mengimplementasikan spesifikasi visual presisi berikut:
- **Background aktif:** Menggunakan warna aksen utama Iwakula (`#C65A3A`).
- **Teks aktif:** Mewajibkan font berwarna putih (`#FFFFFF`) demi menjaga kontras legibilitas yang sempurna.
- **Ikon aktif:** Di-set menjadi warna putih (`#FFFFFF`) agar menyatu dengan palet teks.
- **Radius:** Melengkung sebesar 16px (`rounded-2xl`).
- **Transisi:** Dilengkapi efek halus menggunakan utilitas seperti `transition-all duration-200`.

## Hover State
Saat kursor tetikus (*mouse cursor*) bersandar di atas menu navigasi yang saat ini dalam keadaan tidak aktif:
- **Warna Hover:** Background akan berubah sedikit menjadi krem lembut khas ornamen Iwakula (misalnya `#E7E1D8` atau padanan translusensi yang setara). Teks dan ikon tetap mempertahankan warna aslinya (`#24324A` atau sekunder).
- **Transisi:** Transisi warna halus wajib diaplikasikan (`transition-colors duration-200`).

## Sidebar Behavior
Perilaku peletakan navigasi akan beradaptasi secara agresif berdasarkan dimensi jendela peramban (*viewport*):
- **Desktop:** *Sidebar* tampil secara permanen dan merekat (*sticky/fixed*) di sisi kiri monitor pengguna.
- **Mobile & Tablet:** Panel *Sidebar* utama hilang dan perannya digantikan secara penuh oleh komponen laci pendorong Nuxt UI (`<USlideover>`).
- **Konsistensi Menu:** Daftar *link* navigasi yang digunakan pada versi Desktop dan versi *Slideover* Mobile adalah komponen *looping* yang persis identik.
- **Interaksi Penutupan Mobile:** Apabila diakses via *Slideover*, mengklik menu *link* mana pun harus secara otomatis merubah *state* (menutup *drawer*), guna menghindari laci yang terus menutupi layar setelah proses pindah rute selesai.

## Future Expansion
Susunan dan cetak biru *Sidebar* ini dipersiapkan secara dini (*future-proof*) sebagai fondasi eksekusi Sprint 4, 5, dan 6. Dengan demikian, tombol tautan untuk Produk, Kategori, Achievement, dan Kontak **sudah sah untuk dirender dan ditampilkan sepenuhnya secara visual di layar** meskipun halaman sasarannya kelak di Sprint 2 belum dirakit atau masih me-return blank/404.
