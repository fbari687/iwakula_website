# Sprint 7 Review: Internationalization (i18n), SEO Foundation & Locale Persistence

## Ringkasan Sprint

Sprint 7 berfokus pada transformasi aplikasi website profil perusahaan dan katalog produk Iwakula menjadi **bilingual-ready**, **SEO-ready**, dan **international-ready**. 

Melalui sprint ini, seluruh fondasi dasar internasionalisasi (*internationalization*), pengorganisasian metadata SEO, pembuatan peta situs (*sitemap*), kontrol perayapan mesin pencari (*robots.txt*), serta persistensi preferensi bahasa berbasis *cookie* berhasil diintegrasikan dengan sempurna. 

Seluruh peningkatan ini dicapai secara bersih **tanpa mengubah skema database** yang ada dan **tanpa mengganggu CMS** yang telah dibangun pada sprint-sprint sebelumnya (Sprint 4, 5, dan 6).

## Tujuan yang Berhasil Dicapai

* **Integrasi Modul Internationalization & SEO**: Berhasil memasang dan mengonfigurasi `@nuxtjs/i18n`, `@nuxtjs/sitemap`, serta `@nuxtjs/robots`.
* **Konfigurasi Dual-Locale**: Mendukung Bahasa Indonesia (`id`) sebagai bahasa default dan Bahasa Inggris (`en`).
* **Strategi Routing Bilingual**: Menerapkan strategi `prefix_except_default` sehingga rute default (Bahasa Indonesia) tidak menggunakan awalan URL (contoh: `/products`), sedangkan rute Bahasa Inggris menggunakan awalan `/en` (contoh: `/en/products`).
* **Lazy-Loaded Locale Files**: Berkas terjemahan dipisah ke dalam `i18n/locales/id.json` dan `i18n/locales/en.json` untuk optimasi pemuatan aset secara efisien.
* **Language Switcher UI**: Antarmuka pemilih bahasa interaktif berbasis `UDropdownMenu` pada Navbar desktop dan Mobile Drawer lengkap dengan indikator bendera.
* **Locale Persistence**: Menyimpan preferensi bahasa pengguna pada *cookie* `iwakula_locale` agar preferensi bahasa tetap bertahan saat navigasi maupun kunjungan berikutnya.
* **Penerjemahan Antarmuka Publik**: Seluruh teks statis pada halaman utama, katalog produk, detail produk, layanan & kemitraan, tentang kami, serta komponen Navbar dan Footer telah terintegrasi dengan fungsi terjemahan `$t()`.
* **Abstraksi SEO Layer (`usePageSeo.ts`)**: Membuat composable terpusat untuk mengelola meta judul (*dynamic page title*), deskripsi (*meta description*), Open Graph (OG), Twitter Card, dan Canonical URL.
* **Automated Technical SEO**: Pemasangan otomatis tag `hreflang`, atribut `lang` pada tag `<html>`, generasi otomatis `sitemap.xml`, serta berkas `robots.txt`.

## Fitur yang Diimplementasikan

### 1. Core Internationalization (`@nuxtjs/i18n`)
* Pengaturan modul pada `nuxt.config.ts` dengan menentukan `locales` (`id-ID` dan `en-US`), `defaultLocale: "id"`, `langDir: "../i18n/locales"`, serta `strategy: "prefix_except_default"`.
* Pemisahan berkas terjemahan publik ke dalam format JSON yang terstruktur rapi per komponen/halaman (`nav`, `hero`, `home`, `products`, `services`, `about`, `footer`, `common`).

### 2. Language Switcher & Locale Persistence
* **Desktop & Mobile Switcher**: Pilihan bahasa menggunakan `UDropdownMenu` dengan ikon bendera (`flag:id-4x3` dan `flag:us-4x3`) yang mudah diakses di bagian atas halaman maupun di dalam menu *drawer* perangkat seluler.
* **Cookie-Based Persistence**: Menggunakan fitur bawaan `detectBrowserLanguage` untuk menyimpan pilihan bahasa pengguna ke dalam cookie `iwakula_locale`. Saat pengguna kembali mengunjungi website, bahasa yang digunakan akan otomatis disesuaikan dengan pilihan terakhir.
* **Script Reactivity Support**: Mengubah array dan objek data statis pada skrip halaman (`reasons`, `partnerships`, `legalities`, `resellerBenefits`, `b2bBenefits`, `workSteps`, `kitchenZoning`, `facilityImages`, `breadcrumbItems`, `tabsItems`) menjadi `computed(() => [...])` yang membungkus `t(...)`. Hal ini memastikan seluruh teks pada antarmuka diperbarui secara instan saat terjadi pergantian bahasa tanpa memerlukan pemuatan ulang halaman (*full reload*).

### 3. SEO Abstraction Layer (`usePageSeo.ts`)
* Dibuat composable `usePageSeo(options)` yang memanfaatkan `useSeoMeta()` dan `useHead()` Nuxt.
* Secara otomatis menggenerasi:
  * `<title>` dengan format standar `Title - IWAKULA`.
  * `<meta name="description">` untuk hasil pencarian mesin pencari.
  * Tag Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`).
  * Tag Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
  * Tag Canonical URL (`<link rel="canonical">`) yang selalu menunjuk ke URL lengkap halaman saat ini.

### 4. Search Engine Automation (`sitemap` & `robots`)
* Integrasi `@nuxtjs/sitemap` yang secara otomatis mendaftarkan seluruh rute publik termasuk varian bahasanya ke dalam `/sitemap.xml`.
* Integrasi `@nuxtjs/robots` yang menyajikan aturan perayapan resmi pada `/robots.txt` serta mengarahkan bot mesin pencari ke berkas sitemap.
* Generasi tag `hreflang` otomatis (`<link rel="alternate" hreflang="id" ...>` dan `<link rel="alternate" hreflang="en" ...>`) pada setiap halaman untuk memberitahu mesin pencari mengenai hubungan antar versi bahasa.

## Perubahan Arsitektur

Sprint 7 memperkenalkan 5 lapisan arsitektur baru pada sisi antarmuka publik:

1. **Internationalization Layer**: Menjadi lapisan perantara antara komponen Vue dan berkas kamus terjemahan statis (`i18n/locales/*.json`).
2. **SEO Abstraction Layer (`usePageSeo`)**: Memastikan seluruh halaman publik mengadopsi standar meta tag SEO yang konsisten tanpa perlu mendefinisikan ulang tag header secara manual di setiap halaman.
3. **Locale-Aware Routing Layer**: Penggunaan `useLocalePath()` dan strategi `prefix_except_default` secara otomatis memetakan navigasi rute internal sesuai dengan locale aktif pengguna.
4. **Cookie-Based Locale Persistence**: Mekanisme penyimpanan preferensi bahasa di peramban yang bekerja secara lancar baik pada mode Server-Side Rendering (SSR) maupun Client-Side Navigation.
5. **Automated Search Engine Discovery**: Sistem pembuatan peta situs dan pengarahan perayapan mesin pencari yang bekerja secara otomatis di sisi Nitro server.

## File yang Dibuat

Berikut adalah daftar berkas baru yang dibuat pada Sprint 7:

* `app/composables/usePageSeo.ts` (Composable abstraksi SEO & Metadata terpusat)
* `i18n/locales/id.json` (Kamus terjemahan statis Bahasa Indonesia)
* `i18n/locales/en.json` (Kamus terjemahan statis Bahasa Inggris)
* `docs/SPRINT_7_REVIEW.md` (Dokumentasi review dan pencapaian Sprint 7)

## File yang Diubah

Beberapa berkas yang telah ada diperbarui untuk mengintegrasikan fitur i18n dan SEO:

* `nuxt.config.ts` (Konfigurasi modul `@nuxtjs/i18n`, `@nuxtjs/sitemap`, `@nuxtjs/robots`, serta pengaturan locale)
* `package.json` (Penambahan paket dependensi i18n, sitemap, dan robots)
* `app/components/Navbar.vue` (Integrasi `UDropdownMenu` switcher bahasa & `localePath`)
* `app/components/Footer.vue` (Integrasi `$t()` & `localePath`)
* `app/components/ProductCard.vue` (Integrasi `$t()` & `localePath`)
* `app/components/ProductTile.vue` (Integrasi `$t()` & `localePath`)
* `app/components/product/ProductTabCertification.vue` (Penerjemahan teks modal & sertifikat via `$t()`)
* `app/components/product/ProductTabComposition.vue` (Penerjemahan komposisi & panduan penyimpanan via `$t()`)
* `app/components/product/ProductTabDescription.vue` (Penyesuaian prop deskripsi)
* `app/pages/index.vue` (Integrasi `usePageSeo`, `$t()`, `computed` arrays untuk `legalities`, `partnerships`, `reasons`)
* `app/pages/about/index.vue` (Integrasi `usePageSeo`, `$t()`, `computed` arrays untuk `kitchenZoning`, `facilityImages`)
* `app/pages/services/index.vue` (Integrasi `usePageSeo`, `$t()`, `computed` arrays untuk `resellerBenefits`, `b2bBenefits`, `workSteps`, `legalities`, dan formulir WA)
* `app/pages/products/index.vue` (Integrasi `usePageSeo`, `$t()`, `localePath`)
* `app/pages/products/[slug].vue` (Integrasi `usePageSeo`, `$t()`, `computed` `tabsItems` & `breadcrumbItems`, `localePath`, serta pesan error)

## Hasil Verifikasi

Seluruh fungsi yang dibangun pada Sprint 7 telah diverifikasi dan berjalan dengan baik:

- [x] **Verifikasi Rute Utama Bahasa Indonesia**: Rute `/`, `/products`, `/services`, dan `/about` dapat diakses tanpa awalan locale.
- [x] **Verifikasi Rute Utama Bahasa Inggris**: Rute `/en`, `/en/products`, `/en/services`, dan `/en/about` dapat diakses dengan konten Bahasa Inggris.
- [x] **Language Switcher Navbar Desktop**: Berfungsi mengubah bahasa secara instan saat dropdown diklik.
- [x] **Language Switcher Mobile Drawer**: Berfungsi dengan mulus pada layar HP/Tablet tanpa me-ruin tampilan.
- [x] **Verifikasi Persistensi Cookie**: Cookie `iwakula_locale` tersimpan di peramban dan mempertahankan bahasa pilihan saat halaman di-refresh.
- [x] **Canonical URL**: Tag `<link rel="canonical">` merefleksikan URL presisi halaman yang sedang dibuka.
- [x] **Hreflang Tags**: Tag `<link rel="alternate" hreflang="id">` dan `hreflang="en">` tergenerasi dengan benar pada header dokumen.
- [x] **HTML Lang Attribute**: Tag `<html>` secara dinamis memiliki atribut `lang="id-ID"` atau `lang="en-US"`.
- [x] **SEO Metadata**: Title, Description, Open Graph, dan Twitter Cards tampil secara tepat di seluruh halaman publik.
- [x] **Generasi Sitemap**: Akses ke `/sitemap.xml` menghasilkan XML valid yang memuat seluruh URL bilingual.
- [x] **Generasi Robots.txt**: Akses ke `/robots.txt` menyajikan aturan perayapan dan link sitemap yang sah.
- [x] **Tampilan Responsif**: Layout website tetap rapi pada breakpoint mobile, tablet, dan desktop setelah penambahan switcher bahasa.
- [x] **Kompatibilitas CMS**: Endpoint API Admin dan antarmuka CMS tetap berjalan normal tanpa adanya regresi.

## Dampak terhadap Proyek

1. **Jangkauan Pasar Lebih Luas**: Website Iwakula kini siap menyapa konsumen maupun calon mitra bisnis internasional melalui ketersediaan antarmuka Bahasa Inggris.
2. **Optimasi Mesin Pencari (SEO)**: Struktur metadata yang teratur, tersedianya `sitemap.xml`, `robots.txt`, dan arahan `hreflang` memberikan fondasi kuat agar Iwakula terindeks dengan baik di Google.
3. **Pengalaman Pengguna (UX) Yang Konsisten**: Pilihan bahasa pengguna tersimpan secara otomatis sehingga navigasi terasa personal dan nyaman.
4. **Keamanan & Stabilitas Core Backend**: Seluruh pembaruan frontend dan SEO ini dilakukan tanpa mengubah skema database atau mengganggu fungsi CMS yang sudah stabil.

## Catatan Teknis

* Pada `@nuxtjs/i18n` v10+, lazy loading untuk berkas terjemahan berjalan secara otomatis saat properti `file` didefinisikan pada array `locales`, sehingga properti `lazy: true` pada tingkat atas konfigurasi tidak lagi diperlukan.
* Pembungkusan array dan objek data pada skrip Vue dengan `computed(() => [...])` yang memanggil `t(...)` merupakan pola kunci untuk menjaga reaktivitas teks statis di Vue 3 saat pergantian bahasa terjadi tanpa me-reload peramban.

## Known Limitations

Beberapa hal yang memang sengaja dibatasi dan belum mencakup data dinamis basis data:

* **Konten Dinamis Database**: Judul dan deskripsi pada data **Products**, **Categories**, dan **Achievements** yang ditarik dari database masih menggunakan bahasa asli database (Bahasa Indonesia).
* **Entitas Contacts**: Informasi kontak belum memiliki deskripsi multibahasa.
* **CMS Admin Panel**: Form input pada Admin Dashboard belum menyediakan bidang isian dua bahasa (misalnya: `nameEn`, `descriptionEn`).
* **API CUD (Create, Update, Delete)**: Endpoint Nitro backend belum memproses atau menyimpan skema multibahasa.

*Seluruh dukungan translasi konten dinamis database dan antarmuka CMS bilingual akan dikerjakan secara komprehensif pada **Sprint 8**.*

## Kesiapan untuk Sprint Berikutnya

Fondasi internasionalisasi, rute bilingual, dan abstraksi SEO yang telah dibangun pada Sprint 7 memberikan dasar yang sangat kokoh untuk melangkah ke **Sprint 8**.

Sprint 8 akan berfokus pada penyelesaian tahap akhir *Bilingual Ecosystem*, yaitu:

* **Skema Database Bilingual**: Penambahan kolom terjemahan (seperti `name_en`, `description_en`) pada tabel `categories`, `products`, dan `achievements`.
* **Repository Multilingual**: Pembaruan *Repository Pattern* untuk mendukung ekstraksi data sesuai locale yang sedang aktif.
* **Validator Multilingual**: Penyesuaian skema Zod untuk memvalidasi input multi-bahasa dari CMS.
* **API Multilingual**: Penyesuaian Nitro API handler agar mereturn data dinamis sesuai *query parameter* atau *locale header*.
* **Admin Form Bilingual**: Pembaharuan antarmuka CMS (seperti tab atau bidang input Bahasa Indonesia & Bahasa Inggris) agar administrator dapat menginput konten dua bahasa secara langsung.
* **Frontend Locale-Aware Data Rendering**: Penyesuaian komponen publik agar menyajikan konten dinamis database sesuai dengan bahasa yang dipilih pengguna.
