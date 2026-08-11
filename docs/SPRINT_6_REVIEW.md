# Sprint 6 Review: CMS Achievements & Contacts

## Sprint Overview

Sprint 6 berfokus pada penyelesaian dua entitas CMS terakhir dalam ekosistem Iwakula, yaitu **Achievements** (Pencapaian & Penghargaan) dan **Contacts** (Kontak & Media Sosial). 

Dengan diselesaikannya Sprint 6, seluruh fondasi **Core CMS Iwakula** (Categories, Products, Achievements, dan Contacts) kini dapat dikelola sepenuhnya secara dinamis melalui Admin Dashboard. Sprint ini secara penuh mempertahankan arsitektur dan konvensi teruji yang telah dibangun sejak Sprint 4 dan Sprint 5, seperti penerapan *Repository Pattern*, Zod Validation, Nuxt UI v4, serta integrasi pemrosesan gambar WebP.

## Scope Implemented

Berikut adalah rangkuman seluruh fitur yang telah berhasil diimplementasikan pada Sprint 6:

* **Achievement Repository**: Pengelolaan data kueri database untuk entitas pencapaian.
* **Contact Repository**: Pengelolaan data kueri database untuk entitas kontak & sosial media.
* **Zod Validation**: Validasi skema *input* pada lapis *server* untuk entitas *achievements* dan *contacts*.
* **Admin CRUD API**: Rangkaian *handler* HTTP Nitro (POST, GET, PUT, DELETE) untuk pengelolaan pencapaian dan kontak.
* **Public API Refactor**: Refaktorisasi endpoint publik agar mengonsumsi *repository* secara konsisten.
* **`useAdminAchievements` & `useAdminContacts`**: Composable frontend khusus manajemen state dan komunikasi API admin.
* **Admin UI (List/Create/Edit)**: Antarmuka administrator berbasis Nuxt UI v4 yang responsif untuk Achievements dan Contacts.
* **Integrasi Upload Gambar Achievement**: Dukungan unggah gambar sertifikat/foto pencapaian yang terkonversi otomatis ke format WebP via `/api/admin/upload`.
* **Integrasi Contacts ke Frontend Publik**: Penghubungan data kontak dinamis ke komponen Navbar, Footer, serta Halaman Layanan & Kemitraan (Services).

## Files Created

Berikut adalah daftar seluruh berkas baru yang dibuat selama Sprint 6:

### Repository
* `server/repositories/achievementRepository.ts`
* `server/repositories/contactRepository.ts`

### Validator
* `server/validators/achievement.ts`
* `server/validators/contact.ts`

### Backend (Admin API)
* `server/api/admin/achievements/index.get.ts`
* `server/api/admin/achievements/index.post.ts`
* `server/api/admin/achievements/[id].get.ts`
* `server/api/admin/achievements/[id].put.ts`
* `server/api/admin/achievements/[id].delete.ts`
* `server/api/admin/contacts/index.get.ts`
* `server/api/admin/contacts/index.post.ts`
* `server/api/admin/contacts/[id].get.ts`
* `server/api/admin/contacts/[id].put.ts`
* `server/api/admin/contacts/[id].delete.ts`

### Composable
* `app/composables/useAdminAchievements.ts`
* `app/composables/useAdminContacts.ts`

### Pages
* `app/pages/admin/achievements/index.vue`
* `app/pages/admin/achievements/create.vue`
* `app/pages/admin/achievements/[id].vue`
* `app/pages/admin/contacts/index.vue`
* `app/pages/admin/contacts/create.vue`
* `app/pages/admin/contacts/[id].vue`

## Files Modified

Beberapa berkas yang telah ada diubah untuk menyelaraskan alur data dan tampilan:

* `server/api/achievements/index.get.ts` (Refaktor menggunakan `achievementRepository`)
* `server/api/contacts/index.get.ts` (Refaktor menggunakan `contactRepository`)
* `app/components/Navbar.vue` (Integrasi tautan WhatsApp dinamis dari API contacts)
* `app/components/Footer.vue` (Integrasi kontak WhatsApp, Email, dan tautan sosial media dinamis)
* `app/pages/services/index.vue` (Integrasi tautan pengiriman formulir kemitraan ke nomor WhatsApp aktif)
* `app/components/admin/Sidebar.vue` (Navigasi menu admin ke Achievements dan Contacts)

## Repository Pattern Implementation

Pengelolaan data untuk entitas `achievements` dan `contacts` kini secara penuh mengadopsi **Repository Pattern**. Objek `achievementRepository` dan `contactRepository` bertindak sebagai **Single Source of Truth** untuk seluruh akses basis data menggunakan Drizzle ORM.

Method standar yang tersedia pada masing-masing *repository*:
* `getAll`: Mengambil seluruh daftar entitas.
* `getById`: Mengambil data spesifik berdasarkan primary key ID.
* `create`: Menyimpan entri baru ke basis data.
* `update`: Memutakhirkan sebagian atau seluruh properti entitas.
* `delete`: Menghapus entri secara permanen dari tabel.

*(Khusus `contactRepository`, tersedia pula method tambahan `getByKey` untuk memeriksa keunikan jenis platform kontak).*

## Public API Refactor

Endpoint publik telah direfaktor sehingga tidak lagi melakukan pemanggilan kueri basis data langsung di dalam event handler Nitro, melainkan memanggil *repository*:

* `/api/achievements`: Mengonsumsi `achievementRepository.getAll()` untuk menampilkan daftar pencapaian di frontend publik.
* `/api/contacts`: Mengonsumsi `contactRepository.getAll()` untuk menyalurkan informasi kontak ke seluruh komponen publik.

## Admin CMS

### Achievements
* **List Page**: Menampilkan statistik ringkas (Total, Dengan Gambar, Terbaru), filter pencarian, tabel pratinjau thumbnail gambar sertifikat, badge gelar, serta tombol aksi *edit* dan *delete*.
* **Create Page**: Formulir penambahan pencapaian baru yang mewajibkan input `badge`, `title`, `description`, serta pengunggahan fail gambar.
* **Edit Page**: Pre-fill data otomatis dari server dan fasilitas pembaharuan media sertifikat.
* **Upload Gambar WebP & Preview**: Menggunakan endpoint `/api/admin/upload` untuk melakukan konversi otomatis fail sertifikat ke WebP dengan fitur pratinjau gambar secara *real-time*.
* **Delete**: Penghapusan entri pencapaian dengan konfirmasi dialog.

### Contacts
* **List Page**: Menampilkan daftar saluran komunikasi lengkap dengan penanda *Key*, *Value*, *Icon*, statistik kategori, serta tombol aksi.
* **Proteksi Kontak Utama**: Kontak `whatsapp` dan `email` ditandai sebagai kontak utama. Tombol hapus pada UI ter-disable (ikon gembok) dan API backend menolak penghapusan kedua kontak tersebut untuk menjamin website publik selalu memiliki saluran kontak dasar.
* **Create & Edit Page**: Penginputan `key` menggunakan `USelect` yang memuat pilihan platform populer (WhatsApp, Email, Instagram, TikTok, YouTube, Facebook, Twitter/X, LinkedIn, Website, Phone). Platform yang sudah terdaftar otomatis di-disable untuk mencegah duplikasi. Pemilihan platform secara otomatis mengisi nama ikon bawaan yang kompatibel dengan Iconify.

## Frontend Public Integration

Sebelumnya, beberapa komponen publik seperti tautan WhatsApp pada Navbar dan halaman Layanan masih menggunakan nomor statis (*hardcoded*). Pada Sprint 6, seluruh komponen tersebut telah terintegrasi secara dinamis:

* **Navbar**: Tautan tombol "Pesan Sekarang" secara otomatis membaca nomor WhatsApp terbaru yang dikelola via CMS.
* **Footer**: Tautan WhatsApp, Email, dan ikatan ikon media sosial (Instagram, TikTok, dll) dirender secara dinamis dari API.
* **Halaman Layanan & Kemitraan**: Tombol kirim permohonan kemitraan otomatis mengarahkan pesan ke nomor WhatsApp aktif dari API.

Manfaat utama dari integrasi ini adalah pemilik toko dapat memperbarui nomor WhatsApp, email perusahaan, atau akun media sosial kapan saja melalui Admin Dashboard tanpa memerlukan perubahan kode (*re-deployment*).

## Design System Consistency

Seluruh halaman admin baru pada Sprint 6 secara konsisten mengadopsi standar sistem desain Iwakula dan Nuxt UI v4:

* **Warna Latar & Kartu**: `#F7F6F2` (Latar Utama) dan `#FBFAF8` (Permukaan Kartu/Panel).
* **Border & Pembatas**: `#E7E1D8` dan `#D6CEC2`.
* **Tipografi & Teks Utama**: `#24324A` (Teks Utama/Heading) dan `#6B7280` (Muted/Sub-deskripsi).
* **Aksen Utama**: `#C65A3A` (Terracotta khas Iwakula) digunakan pada tombol primer, indikator loading, serta *highlight* dropdown.

## Verification Checklist

- [x] Achievement Create (Formulir tambah pencapaian tersimpan ke database)
- [x] Achievement Read (Daftar pencapaian tampil di tabel admin)
- [x] Achievement Update (Pembaruan data & foto sertifikat berfungsi)
- [x] Achievement Delete (Pencapaian dapat dihapus dari admin)
- [x] Achievement Image Upload (Pengunggahan gambar sertifikat terkonversi ke WebP)
- [x] Achievement Public API (Endpoint `/api/achievements` mengembalikan data dari repository)
- [x] Contact Create (Formulir tambah kontak dengan dropdown platform berfungsi)
- [x] Contact Read (Daftar kontak tampil di tabel admin)
- [x] Contact Update (Pembaruan value & icon kontak berfungsi)
- [x] Contact Delete (Kontak selain WhatsApp & Email dapat dihapus)
- [x] Contact Public API (Endpoint `/api/contacts` mengembalikan data dari repository)
- [x] Navbar Integration (Tombol "Pesan Sekarang" mengarahkan ke nomor WhatsApp dinamis)
- [x] Footer Integration (Sosial media & kontak di footer dirender dinamis)
- [x] Contact Page / Services Integration (Formulir kemitraan menggunakan nomor WhatsApp dinamis)
- [x] Responsive UI (Halaman admin & modal/drawer responsif di mobile & desktop)
- [x] Repository Pattern (Achievement & Contact repository terintegrasi sebagai Single Source of Truth)
- [x] Validation (Validasi Zod berjalan pada seluruh rute POST/PUT kontak & achievement)
- [x] Authentication Protection (Proteksi kontak utama WhatsApp & Email dari aksi delete)

## Architecture Decisions

Beberapa keputusan arsitektur penting yang dipertahankan dan diterapkan:

* **Repository Pattern**: Dipertahankan sebagai layer tunggal komunikasi ORM untuk menjamin konsistensi pemanggilan data.
* **Single Source of Truth**: Seluruh handler API Nitro mengandalkan *repository* tanpa menulis kueri Drizzle mentah di dalam handler.
* **Zod Validation**: Setiap payload dari *client* diverifikasi oleh skema Zod sebelum diproses oleh repositori.
* **Nuxt UI v4 Integration**: Menggunakan komponen bawaan Nuxt UI v4 (`UCard`, `UFormField`, `UInput`, `USelect`, `UButton`, `UDrawer`) dengan penyesuaian CSS token Iwakula.
* **Public API Synchronization**: Seluruh komponen publik menyinkronkan data kontak secara asinkron via composable `useContacts()`.

## Known Limitations

Beberapa fitur tingkat lanjut yang memang belum diimplementasikan pada sprint ini:

* Belum ada fitur *drag-and-drop ordering* untuk menentukan urutan tampilan *achievements*.
* Belum tersedia fitur pengunggahan masal (*bulk upload*) untuk entitas pencapaian.
* Pengelompokan kontak (*contact grouping*) berdasarkan kategori kustom belum dibuat (masih berbasis *key*).
* Belum ada dukungan konten multibahasa (*multi-language content*) pada judul/deskripsi pencapaian.
* Belum tersedia pencatatan riwayat perubahan (*audit log*).
* Penghapusan data masih menggunakan *hard delete* (belum menerapkan *soft delete*).

## Sprint Outcome

Sprint 6 berhasil menyelesaikan seluruh **Core CMS Iwakula**. Saat ini, keempat entitas utama aplikasi — **Categories, Products, Achievements, dan Contacts** — telah dapat dikelola secara penuh melalui Admin Dashboard dengan arsitektur, pola kode, serta sistem desain yang padu dan konsisten.
