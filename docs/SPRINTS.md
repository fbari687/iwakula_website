# CMS Implementation Sprints: Iwakula Website

Dokumen ini memecah implementasi keseluruhan *Blueprint CMS* menjadi beberapa tahap (*sprint*) kecil. Setiap sprint didesain agar dapat diselesaikan dalam waktu 1-3 jam kerja. Prioritas utama adalah membangun pondasi keamanan (autentikasi) dan tata letak (*layout*) yang kokoh sebelum mengimplementasikan operasi CRUD data.

---

## Sprint 1A: Backend Authentication Foundation
**Tujuan Sprint:** Membangun lapisan keamanan di sisi server secara modular dengan memusatkan logika autentikasi (hashing & sesi) ke dalam satu utilitas utama.

- **Daftar Task:**
  - Install dependensi `bcrypt` untuk proses *hashing password*.
  - Buat utilitas autentikasi `server/utils/auth.ts` yang berisi fungsi-fungsi: `hashPassword(password)`, `verifyPassword(password, hash)`, `createSessionCookie(user)`, `readSessionCookie(event)`, dan `clearSessionCookie(event)`.
  - Buat API Login (`/api/admin/auth/login.post.ts`) yang memanggil fungsi utilitas untuk validasi tabel `users` dan membuat *HttpOnly cookie*.
  - Buat API Logout (`/api/admin/auth/logout.post.ts`) yang memanggil fungsi utilitas untuk menghapus *cookie*.
  - Buat API Info User (`/api/admin/auth/me.get.ts`) yang memanggil fungsi utilitas untuk mendapatkan dan memvalidasi data sesi saat ini.
- **File yang akan dibuat/diubah:**
  - `package.json`
  - `server/utils/auth.ts` (Baru)
  - `server/api/admin/auth/login.post.ts`, `logout.post.ts`, `me.get.ts`
- **Dependency:** Tidak ada (tabel `users` sudah tersedia).
- **Acceptance Criteria (Uji Manual):**
  - Seluruh manipulasi cookie dan hashing password terbukti dipusatkan di `server/utils/auth.ts` (API routes tidak menduplikasi logika ini).
  - Mengirim HTTP POST ke `/api/admin/auth/login` dengan kredensial benar via Postman akan mengembalikan HttpOnly Cookie.
  - Mengirim kredensial salah akan mengembalikan HTTP 401.
  - Men-hit `/api/admin/auth/me` dengan membawa cookie akan mengembalikan data admin (email, id).
- **Risiko:** 
  - Konfigurasi cookie (SameSite, Secure, Max-Age) harus ter-setup dengan benar di dalam fungsi `createSessionCookie` agar aman di *environment* produksi.

---

## Sprint 1B: Frontend Authentication & Login UI
**Tujuan Sprint:** Membangun antarmuka untuk login admin dan *composable* untuk mengelola *state* sesi di Nuxt.

- **Daftar Task:**
  - Buat Composable `useAuth.ts` untuk membungkus pemanggilan API (login, logout, fetchUser) dan menyimpan state pengguna secara global.
  - Buat Halaman UI Login Admin (`app/pages/admin/login.vue`) menggunakan Nuxt UI.
- **File yang akan dibuat/diubah:**
  - `app/composables/useAuth.ts`
  - `app/pages/admin/login.vue`
- **Dependency:** Menyelesaikan Sprint 1A (Backend APIs).
- **Acceptance Criteria (Uji Manual):**
  - Pengguna dapat mengetikkan email/password di form `/admin/login` dan berhasil login.
  - Saat login gagal, muncul pesan error di UI (toast/alert).
  - Tampilan login responsif di layar HP dan konsisten dengan *design system* publik.
- **Risiko:**
  - Penanganan loading state di UI saat request API berjalan agar mencegah *double submit*.

---

## Sprint 1C: Middleware & Route Protection
**Tujuan Sprint:** Mengunci akses API dan halaman UI agar hanya bisa diakses oleh admin yang sudah terauntentikasi.

- **Daftar Task:**
  - Buat Backend Middleware (`server/middleware/adminAuth.ts`) untuk memblokir akses ke semua rute `/api/admin/**` (kecuali auth).
  - Buat Frontend Middleware (`app/middleware/auth.ts`) untuk meredirect tamu ke `/admin/login`.
- **File yang akan dibuat/diubah:**
  - `server/middleware/adminAuth.ts`
  - `app/middleware/auth.ts`
- **Dependency:** Menyelesaikan Sprint 1B.
- **Acceptance Criteria (Uji Manual):**
  - Mencoba mengakses rute rahasia (misal `/api/admin/tes`) tanpa *cookie* via Postman akan diblokir dengan status 401 Unauthorized.
  - Mengetikkan URL `/admin` langsung di browser tanpa login otomatis dialihkan ke halaman `/admin/login`.
- **Risiko:**
  - Middleware frontend salah konfigurasi sehingga menyebabkan *infinite redirect loop*.

---

## Sprint 2: Layout & Dashboard Core
**Tujuan Sprint:** Membuat kerangka utama halaman Admin yang responsif tanpa menggunakan tema *dashboard* eksternal.

- **Daftar Task:**
  - Buat tata letak (`app/layouts/admin.vue`) khusus yang menampung *Sidebar* dan *Topbar*.
  - Buat komponen `Sidebar.vue` (Nuxt UI) yang berfungsi sebagai *drawer/collapsible* ketika di layar kecil.
  - Buat komponen `Topbar.vue` (Nuxt UI) yang memuat nama user dan tombol Logout.
  - Buat Halaman Dashboard Utama (`app/pages/admin/index.vue`).
  - Desain *dashboard cards* untuk ringkasan data.
- **File yang akan dibuat/diubah:**
  - `app/layouts/admin.vue`
  - `app/components/admin/Sidebar.vue`
  - `app/components/admin/Topbar.vue`
  - `app/pages/admin/index.vue`
- **Dependency:** Menyelesaikan Sprint 1C.
- **Acceptance Criteria (Uji Manual):**
  - Membuka halaman `/admin` menampilkan sidebar dan topbar.
  - Diubah ukurannya ke resolusi HP (Inspeksi elemen browser), sidebar otomatis bersembunyi menjadi laci (*drawer*) yang bisa di-*toggle*.
  - Grid pada *Dashboard Cards* berubah dari 4 kolom (desktop) menjadi 1 kolom (mobile).
  - Mengklik tombol "Logout" di Topbar akan menghapus sesi dan menendang admin kembali ke halaman login.
- **Risiko:** 
  - CSS atau z-index dari Nuxt UI bertabrakan dengan komponen Tailwind manual.

---

## Sprint 3: Fitur Upload Gambar Lokal
**Tujuan Sprint:** Menyiapkan fasilitas sentral yang aman untuk menyimpan file multimedia (gambar) secara lokal di server.

- **Daftar Task:**
  - Buat endpoint POST `/api/admin/upload` dengan `readMultipartFormData(event)`.
  - Validasi ketat: cek ekstensi (*whitelist mime type* seperti `image/jpeg`, `image/png`, `image/webp`) dan limitasikan ukuran file maksimal (misal: 2MB).
  - Ekstraksi gambar dan *rename* file menggunakan UUID generik (`crypto.randomUUID()`) agar terhindar dari konflik nama file atau *path traversal*.
  - Simpan di lokal ke `/public/uploads/` dan kembalikan URL yang aman (tidak mengekspos nama file asli pengguna).
- **File yang akan dibuat/diubah:**
  - `server/api/admin/upload.post.ts`
- **Dependency:** Menyelesaikan Sprint 1C (Proteksi Endpoint).
- **Acceptance Criteria (Uji Manual):**
  - Mengunggah file `.jpg` berukuran < 2MB via Postman/form sukses disimpan dengan nama acak (contoh: `/uploads/123e4567-e89b-12d3-a456-426614174000.jpg`).
  - Mengunggah file `.exe` atau PDF ditolak dengan pesan error yang jelas (Status 400).
  - Mengunggah file `.jpg` berukuran > 2MB ditolak (Status 400 atau 413).
- **Risiko:** 
  - Direktori `/public/uploads/` perlu diberi izin tulis yang tepat jika di-deploy di VPS.

---

## Sprint 4: CMS Kategori (CRUD Dasar)
**Tujuan Sprint:** Mengimplementasikan pola *Repository* dan UI Manajemen Kategori sebagai fondasi sebelum menggarap Produk.

- **Daftar Task:**
  - Buat layer `categoryRepository.ts` (dengan metode `create`, `update`, `delete`).
  - Ubah endpoint `GET /api/categories` Publik agar menggunakan Repository yang baru.
  - Buat Endpoint API Admin CUD (`index.post.ts`, `[id].put.ts`, `[id].delete.ts`).
  - Buat Halaman List Kategori dengan tabel yang *mobile-friendly* (Nuxt UI Table).
  - Buat Halaman Formulir Kategori (bisa *Inline Modal* atau Rute Baru `create.vue` / `[id].vue`).
- **File yang akan dibuat/diubah:**
  - `server/repositories/categoryRepository.ts`
  - `server/api/admin/categories/...` (Endpoint mutasi)
  - `server/api/categories/index.get.ts` (Modifikasi: diarahkan ke repository)
  - `app/composables/useAdminCategories.ts`
  - `app/pages/admin/categories/index.vue`
  - `app/pages/admin/categories/create.vue` & `[id].vue`
- **Dependency:** Menyelesaikan Sprint 2 (Layout) dan Sprint 3 (Untuk gambar kategori).
- **Acceptance Criteria (Uji Manual):**
  - Admin dapat mengisi formulir, mengunggah gambar kategori, dan menyimpannya.
  - Setelah kategori dibuat, data baru langsung muncul di tabel Admin.
  - Buka halaman publik Iwakula di *tab* baru, kategori baru langsung muncul.
  - Admin dapat menekan tombol "Hapus" pada tabel dan kategori tersebut terhapus dari sistem.
- **Risiko:** 
  - Relasi database: jika ada produk yang nyangkut ke kategori yang dihapus, bisa terjadi *error constraint*.

---

## Sprint 5: CMS Produk (CRUD Kompleks & Tiptap)
**Tujuan Sprint:** Melengkapi manajemen produk yang paling kritis dengan integrasi Editor Rich Text (Tiptap).

- **Daftar Task:**
  - **Tahap 1 (CRUD Standar)**:
    - Buat `productRepository.ts` dan modifikasi `GET /api/products` Publik untuk menggunakannya.
    - Buat Endpoint API Admin (CUD) Produk.
    - Buat UI List Produk (Tabel).
    - Buat UI Form Edit Produk standar (menggunakan *textarea* biasa untuk kolom deskripsi) dan fitur *upload* gambar.
  - **Tahap 2 (Integrasi Tiptap)**:
    - Integrasikan Tiptap secara eksklusif ke kolom *description* untuk merubah input menjadi format HTML (dilakukan setelah operasi CRUD dasar terbukti berjalan lancar).
- **File yang akan dibuat/diubah:**
  - `server/repositories/productRepository.ts`
  - `server/api/admin/products/...`
  - `server/api/products/...` (Modifikasi Publik)
  - `app/composables/useAdminProducts.ts`
  - `app/pages/admin/products/index.vue`, `create.vue`, `[id].vue`
- **Dependency:** Menyelesaikan Sprint 3 (Upload Gambar) dan Sprint 4 (Kategori).
- **Acceptance Criteria (Uji Manual):**
  - **Uji CRUD**: Produk baru berhasil disimpan lengkap dengan gambar utama dan *slug* otomatis.
  - **Uji Tiptap**: Memasukkan deskripsi produk berformat tebal (*bold*), garis miring (*italic*), atau daftar peluru (*bullet points*) via Tiptap dapat tersimpan dengan benar sebagai HTML.
  - **Uji Publik**: Membuka halaman detail produk di frontend publik sukses merender teks HTML dari Tiptap menggunakan `v-html`.
- **Risiko:** 
  - Render HTML mentah via `v-html` di sisi publik berisiko XSS jika data HTML tidak disanitasi sebelum disimpan (bisa menggunakan *sanitize-html*).

---

## Sprint 6: CMS Ekstra (Penyelesaian CMS)
**Tujuan Sprint:** Melengkapi CMS untuk entitas sisanya (Achievements & Contacts).

- **Daftar Task:**
  - Implementasikan pola Repositori, Endpoint Admin, dan Frontend UI Admin untuk entitas `Achievements`.
  - Lakukan langkah serupa untuk manajemen data statis `Contacts`.
- **File yang akan dibuat/diubah:**
  - Repositori dan rute API Admin serta API Publik terkait.
  - Halaman UI Admin untuk Achievements dan Contacts.
- **Dependency:** Sprint 4 (Struktur CRUD sudah matang).
- **Acceptance Criteria (Uji Manual):**
  - Prestasi (Achivements) baru (beserta gambarnya) dapat ditambahkan melalui CMS dan muncul di halaman profil perusahaan publik.
  - Nomor kontak atau tautan media sosial dapat diubah via CMS dan langsung terganti di *footer/navbar* publik.
- **Risiko:** 
  - Tingkat risiko rendah, kebanyakan hanya tugas repetitif.
