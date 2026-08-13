# Sprint 8 Review: CMS Multilingual Content

## Ringkasan Sprint

Sprint 8 berfokus pada transformasi aplikasi Iwakula dari website statis bilingual menjadi **full-stack Multilingual Content Management System (CMS)** secara *end-to-end*. 

Melalui sprint ini, seluruh konten dinamis basis data—meliputi **Kategori Produk (Categories)**, **Katalog Produk (Products)**, dan **Pencapaian/Sertifikasi (Achievements)**—kini mendukung penuh pengelolaan dalam Bahasa Indonesia (`id`) dan Bahasa Inggris (`en`). Antarmuka publik secara otomatis menyajikan konten sesuai *locale* aktif peramban atau pilihan pengguna, sementara antarmuka Admin CMS menyediakan tab input multibahasa yang intuitif.

Seluruh peningkatan arsitektur ini dicapai dengan menerapkan prinsip **Public API Payload Normalization**, sehingga kontrak data API publik tetap stabil tanpa mengekspos struktur internal basis data, serta mempertahankan strategi **Fallback Bahasa Indonesia** sebagai sumber data utama.

## Tujuan yang Berhasil Dicapai

* **Skema Basis Data Bilingual**: Penambahan kolom terjemahan Bahasa Inggris opsional pada tabel `categories`, `products`, dan `achievements` tanpa merusak data lama.
* **Migrasi Database Terotomatisasi**: Mengaplikasikan pembaruan skema Drizzle ORM ke MySQL secara aman menggunakan `drizzle-kit push`.
* **Server-Side Locale Helper**: Pembuatan utility terpusat (`resolveLocalizedField` dan `getHeaderOrQueryLocale`) pada `server/utils/locale.ts` untuk menangani resolusi bahasa dan fallback.
* **Repository Multilingual Dual-Mode**: Pembaharuan *Repository Layer* yang mendukung dua mode operasi: *Public Context* (menormalisasi payload dan membuang bidang internal `_en`) dan *Admin Context* (menyajikan entitas mentah untuk kebutuhan penyuntingan CMS).
* **Public API Payload Normalization**: Memastikan seluruh endpoint API publik (`/api/categories`, `/api/products`, `/api/products/[slug]`, `/api/achievements`) tetap mengembalikan struktur JSON yang identik dengan sprint sebelumnya tanpa merusak kompatibilitas frontend.
* **Validator Zod Bilingual**: Penyesuaian skema validasi Nitro server untuk menerima masukan opsional Bahasa Inggris (`nameEn`, `descriptionEn`, `subTitleEn`, `highlightsEn`, `badgeEn`, `titleEn`).
* **Formulir Admin CMS Bilingual (`UTabs`)**: Antarmuka pembacaan dan pengisian dua bahasa menggunakan komponen `UTabs` dari Nuxt UI v4 pada seluruh halaman Create dan Edit Admin.
* **Generasi Slug Unik Otomatis**: Integrasi `generateUniqueSlug` pada `server/utils/slug.ts` untuk menangani duplikasi slug secara otomatis (penambahan akhiran `-1`, `-2`) serta menyederhanakan formulir admin dengan menghapus bidang input slug manual.
* **Public Composables Locale-Aware**: Pembaruan `useProducts`, `useCategories`, dan `useAchievements` agar mengirimkan *query parameter* `locale` secara reaktif dan memperbarui kunci cache peramban.
* **Integrasi SEO Multibahasa**: Metadata SEO (Title, Description, OG Image, Canonical, Hreflang) secara dinamis merefleksikan bahasa konten yang sedang aktif melalui `usePageSeo()`.

## Fitur yang Diimplementasikan

### 1. Database & Drizzle Schema Layer
* **Tabel `categories`**: Menambahkan kolom `name_en` (`nameEn`) dan `description_en` (`descriptionEn`).
* **Tabel `products`**: Menambahkan kolom `name_en` (`nameEn`), `sub_title_en` (`subTitleEn`), `description_en` (`descriptionEn`), dan `highlights_en` (`highlightsEn`).
* **Tabel `achievements`**: Menambahkan kolom `badge_en` (`badgeEn`), `title_en` (`titleEn`), dan `description_en` (`descriptionEn`).
* Seluruh kolom terjemahan Bahasa Inggris dikonfigurasi sebagai *nullable* agar masukan Bahasa Inggris bersifat opsional.

### 2. Locale Resolution & Fallback Strategy (`server/utils/locale.ts`)
* **Fungsi `resolveLocalizedField(idValue, enValue, locale)`**:
  * Mengembalikan `enValue` jika *locale* aktif adalah `en` dan `enValue` memiliki isi teks.
  * Mengembalikan `idValue` (Bahasa Indonesia) sebagai *fallback* otomatis jika `enValue` kosong, `null`, atau hanya berisi spasi.
* **Fungsi `getHeaderOrQueryLocale(event)`**: Menangkap preferensi bahasa dari *query parameter* `?locale=en` atau *header* HTTP (`x-i18n-locale` / `accept-language`).
* **Fungsi Normalisasi Payload**: `normalizeCategory`, `normalizeProduct`, dan `normalizeAchievement` bertugas menyaring data sebelum dikirimkan ke endpoint publik.

### 3. Repository Dual Modes & Payload Normalization
* **Public Context**: Saat opsi `{ locale }` diberikan pada metode repository (`getAll`, `getById`, `getBySlug`), repository memanggil fungsi normalisasi untuk mengganti teks bidang utama (`name`, `description`, `highlights`, dll) sesuai *locale* dan membuang (*strip*) bidang internal bernakhiran `_en`.
* **Admin Context**: Saat opsi `locale` diabaikan, repository mengembalikan entitas mentah basis data lengkap dengan bidang `_en` agar formulir CMS dapat mengedit kedua versi bahasa.

### 4. Form Admin CMS Multibahasa (`UTabs`)
* **Pemisahan Tab Bahasa**: Menggunakan `UTabs` dari Nuxt UI v4 dengan pilihan tab **🇮🇩 Bahasa Indonesia (Utama)** dan **🇬🇧 English (Opsional)** pada halaman Create & Edit Kategori, Produk, dan Pencapaian.
* **Generasi Slug Otomatis**: Bidang input `slug` dihapus dari formulir CMS. Slug dihasilkan dan diperbarui secara otomatis di sisi server Nitro menggunakan `generateUniqueSlug()`. Jika terjadi bentrok nama, server otomatis menambahkan sufiks numerik (contoh: `ikan-asap-1`).

### 5. Frontend Public Locale-Aware Data Rendering
* Composables publik (`useProducts`, `useCategories`, `useAchievements`) secara otomatis mengikat *locale* dari `useI18n().locale.value` ke dalam *query parameter* HTTP dan kunci cache `useFetch`.
* Halaman Publik (**Home**, **Products**, **Product Detail**, **Categories**, **Achievements**) secara instan me-render data dinamis bahasa yang sesuai saat pengguna mengganti bahasa melalui *Language Switcher* di Navbar/Mobile Drawer.

## Perubahan Arsitektur

Sprint 8 memperkenalkan 5 pola arsitektur utama pada lapisan data dan backend:

1. **Multilingual Content Layer**: Penyimpanan konten bilingual yang terstruktur langsung pada kolom tabel utama MySQL tanpa memerlukan tabel relasi translasi terpisah (*translation table pattern*), sehingga menjaga efisiensi query database.
2. **Locale Resolution Layer (`server/utils/locale.ts`)**: Lapisan terpusat di sisi server Nitro yang bertanggung jawab melakukan penentuan bahasa dan eksekusi logika *fallback*.
3. **Public Payload Normalization**: Memastikan batas (*boundary*) repository publik memfilter bidang internal `_en` sehingga kontrak JSON API publik aman, konsisten, dan terisolasi dari struktur internal DB.
4. **Repository-based Translation Mapping**: Repository bertindak sebagai *single source of truth* untuk pemilihan translasi dan transformasi payload.
5. **Fallback Translation Strategy**: Bahasa Indonesia ditetapkan sebagai sumber data utama (*source language*) yang selalu siap menjadi *fallback* jika terjemahan Bahasa Inggris belum diisi oleh admin.

## File yang Dibuat

Berikut adalah daftar berkas baru yang dibuat pada Sprint 8:

* `server/utils/locale.ts` (Utility terpusat resolusi locale, ekstraksi header/query, dan normalisasi payload publik)
* `server/utils/slug.ts` (Utility pembentukan slug otomatis dan penanganan konflik duplikasi slug)
* `server/api/admin/categories/index.get.ts` (Endpoint GET Nitro Admin untuk mengambil daftar kategori mentah)
* `server/api/admin/categories/[id].get.ts` (Endpoint GET Nitro Admin untuk mengambil detail kategori mentah)
* `docs/SPRINT_8_REVIEW.md` (Dokumentasi review dan pencapaian Sprint 8)

## File yang Diubah

Beberapa berkas utama diperbarui untuk mendukung sistem CMS multibahasa:

* `server/database/schema.ts` (Penambahan kolom bilingual `_en` pada skema `categories`, `products`, dan `achievements`)
* `server/repositories/categoryRepository.ts` (Dukungan dual-mode normalization, bidang bilingual, dan CUD)
* `server/repositories/productRepository.ts` (Dukungan dual-mode normalization, bidang bilingual `highlightsEn`, dan CUD)
* `server/repositories/achievementRepository.ts` (Dukungan dual-mode normalization, bidang bilingual, dan CUD)
* `server/validators/category.ts` (Penambahan bidang `nameEn` dan `descriptionEn` pada Zod schema)
* `server/validators/product.ts` (Penambahan bidang `nameEn`, `subTitleEn`, `descriptionEn`, `highlightsEn` pada Zod schema)
* `server/validators/achievement.ts` (Penambahan bidang `badgeEn`, `titleEn`, `descriptionEn` pada Zod schema)
* `server/api/categories/index.get.ts` (Ekstraksi locale dan eksekusi repository public mode)
* `server/api/products/index.get.ts` (Ekstraksi locale dan eksekusi repository public mode)
* `server/api/products/[slug].get.ts` (Ekstraksi locale dan eksekusi repository public mode)
* `server/api/achievements/index.get.ts` (Ekstraksi locale dan eksekusi repository public mode)
* `server/api/admin/categories/index.post.ts` & `[id].put.ts` (Penanganan CUD bilingual & auto-generate unique slug)
* `server/api/admin/products/index.post.ts` & `[id].put.ts` (Penanganan CUD bilingual & auto-generate unique slug)
* `server/api/admin/achievements/index.post.ts` & `[id].put.ts` (Penanganan CUD bilingual)
* `app/composables/useProducts.ts` (Injeksi `locale` reaktif pada query `useFetch` & cache key)
* `app/composables/useCategories.ts` (Injeksi `locale` reaktif pada query `useFetch` & cache key)
* `app/composables/useAchievements.ts` (Injeksi `locale` reaktif pada query `useFetch` & cache key)
* `app/composables/useAdminCategories.ts` (Mengarahkan pemanggilan data admin ke endpoint raw `/api/admin/categories`)
* `app/composables/useAdminProducts.ts` (Mengarahkan kategori dropdown ke endpoint admin `/api/admin/categories`)
* `app/composables/useAdminAchievements.ts` (Mengarahkan pemanggilan data admin ke endpoint raw `/api/admin/achievements`)
* `app/pages/admin/categories/create.vue` & `[id].vue` (Integrasi `UTabs` bilingual & pembersihan bidang slug)
* `app/pages/admin/products/create.vue` & `[id].vue` (Integrasi `UTabs` bilingual & pembersihan bidang slug)
* `app/pages/admin/achievements/create.vue` & `[id].vue` (Integrasi `UTabs` bilingual)

## Hasil Verifikasi

Seluruh fungsi yang dibangun pada Sprint 8 telah dilewati dengan hasil sukses:

### 1. Verification Database
- [x] **Migrasi Database**: Perintah `npx drizzle-kit push` berhasil dieksekusi dengan status `[✓] Changes applied`.
- [x] **Integritas Data Lama**: Seluruh data yang sudah ada di database MySQL tetap utuh tanpa mengalami kerusakan atau kehilangan informasi.

### 2. Verification Repository & API
- [x] **Locale Mapping**: Resolusi teks `resolveLocalizedField()` mengembalikan Bahasa Inggris jika tersedia dan *locale* `en` aktif.
- [x] **Payload Normalization**: Payload API publik (`/api/products`, `/api/categories`, `/api/achievements`) mengembalikan bidang `name`, `description`, dll. tanpa membocorkan bidang `_en`.
- [x] **Fallback Strategy**: Apabila data Bahasa Inggris kosong (`null`), sistem secara otomatis menggunakan teks Bahasa Indonesia.

### 3. Verification Admin CMS
- [x] **Create Bilingual**: Pengisian data pada Tab Indonesia dan Tab Inggris berhasil disimpan ke database.
- [x] **Edit Bilingual**: Data lama Bahasa Indonesia dan Bahasa Inggris terisi (*pre-filled*) dengan sempurna pada formulir edit.
- [x] **Validasi & Save**: Validasi Zod bekerja secara presisi dan notifikasi toast sukses tampil setelah penyimpanan.
- [x] **Auto Unique Slug**: Penambahan produk/kategori dengan nama sama berhasil menghasilkan slug unik dengan akhiran numerik (contoh: `ikan-asap-1`).

### 4. Verification Public Website & SEO
- [x] **Public Locale ID & EN**: Halaman Utama, Katalog Produk, Detail Produk, dan Pencapaian menampilkan konten dinamis database sesuai *locale* yang dipilih.
- [x] **Dynamic SEO Metadata**: Judul halaman, deskripsi meta, Open Graph, canonical URL, dan tag `hreflang` beradaptasi dengan *locale* aktif melalui `usePageSeo()`.

### 5. Regression Testing (Fitur Lama Tetap Berjalan)
- [x] **Autentikasi & Login Admin**: Sesi login dan middleware admin tetap berjalan normal.
- [x] **Upload Gambar**: Fitur unggah gambar tunggal (`/api/admin/upload`) dan konversi WebP berfungsi dengan baik.
- [x] **Multi-Image Gallery**: Pengelolaan galeri foto ekstra pada produk tetap berjalan lancar.
- [x] **CRUD Restrukturisasi**: Operasi Tambah, Edit, Hapus untuk Kategori, Produk, dan Pencapaian berjalan stabil.
- [x] **Delete Category Restrict**: Proteksi penghapusan kategori yang masih memiliki produk terkait tetap mengembalikan HTTP 409 Conflict secara benar.
- [x] **Rich Text Editor Tiptap**: Editor deskripsi Tiptap dapat digunakan dengan nyaman pada Tab Indonesia maupun Tab Inggris.
- [x] **Responsive Layout**: Antarmuka Admin CMS dan Website Publik tetap responsif pada perangkat mobile, tablet, dan desktop.

## Dampak terhadap Proyek

1. **Ekosistem CMS Multilingual Utuh**: Iwakula kini memiliki CMS yang mampu mengelola konten dua bahasa secara mandiri dan profesional.
2. **Stabilitas Kontrak API Publik**: Aplikasi frontend publik tidak memerlukan perubahan besar karena kontrak data API publik tetap dinormalisasi di sisi server.
3. **Pengalaman Pengelola (UX Admin) Lebih Efisien**: Penggunaan tab terpisah dan pembentukan slug otomatis menghilangkan kerumitan teknis bagi pengelola UMKM.
4. **Kesiapan Pasar Global**: Seluruh informasi produk dan profil bisnis Iwakula dapat disajikan secara elegan kepada pembeli lokal maupun internasional.

## Catatan Teknis

* Penggunaan kolom flat (`name_en`, `description_en`) pada skema MySQL terbukti jauh lebih ringan dan cepat dibandingkan pembuatan tabel translasi terpisah (*translation table pattern*), sangat cocok untuk skala UMKM dengan dua bahasa resmi.
* Injeksi `locale.value` ke dalam properti `query` dan `key` pada `useFetch` Nuxt memastikan mekanisme reaktivitas Vue 3 dan invalidasi cache peramban berjalan secara otomatis saat bahasa diubah.

## Known Limitations

Sprint 8 difokuskan pada pengolahan konten teks dinamis basis data dan belum mencakup fitur-fitur tingkat lanjut berikut:

* **AI Translation**: Belum ada fitur penerjemahan otomatis menggunakan kecerdasan buatan (AI).
* **Automatic Translation Workflow**: Belum ada *workflow* translasi otomatis saat admin mengisi teks Bahasa Indonesia.
* **Translation Approval Workflow**: Belum ada sistem persetujuan (*approval*) terpisah untuk hasil terjemahan.
* **Locale-Specific Slug**: Slug URL produk/kategori bersifat universal (satu slug untuk semua bahasa).
* **Locale-Specific Image**: Media gambar produk/kategori bersifat universal (sama untuk semua bahasa).
* **Locale-Specific Upload**: Belum ada manajemen berkas terpisah per bahasa.
* **Locale-Specific Tiptap Styling**: Pengaturan format WYSIWYG Tiptap menggunakan konfigurasi standar yang sama.
* **Multilingual File Management**: Manajemen berkas media publik belum dipisah berdasarkan *locale*.

## Kesiapan untuk Sprint Berikutnya

Dengan selesainya Sprint 8, proyek Iwakula kini telah memiliki:
* Admin CMS multilingual yang stabil
* Public website multilingual yang reaktif
* SEO & Metadata multibahasa
* Routing bilingual (`id` & `en`)
* Payload normalization & Fallback translation
* Layout responsif dan fitur CRUD yang aman dari regresi

Proyek Iwakula kini sepenuhnya siap untuk melangkah ke **Sprint 9: Performance & Advanced SEO**, yang akan berfokus pada:

* **Lighthouse Optimization & Core Web Vitals**: Peningkatan skor performa, LCP, CLS, dan FID.
* **Image Optimization & Lazy Loading**: Penerapan gambar responsif, format modern, dan *lazy loading* aset.
* **Structured Data (JSON-LD)**: Implementasi skema Schema.org terstruktur untuk *Organization*, *Product*, dan *BreadcrumbList*.
* **Font & Bundle Optimization**: Optimasi pemuatan Google Fonts dan pengurangan ukuran berkas *bundle* JavaScript Nitro/Vite.
* **Route Payload Optimization**: Efisiensi pemuatan data payload pada proses navigasi rute publik.
