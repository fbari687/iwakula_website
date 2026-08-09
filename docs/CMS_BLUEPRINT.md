# CMS Blueprint: Iwakula Website

Dokumen ini adalah acuan jangka panjang untuk implementasi dan pemeliharaan fitur Admin CMS pada `iwakula-website`. Blueprint ini disusun agar pengembangan CMS tidak merusak atau menduplikasi logika dari ekosistem publik (frontend/read-only API) yang sudah ada.

## Keputusan Arsitektur Inti
- Manajemen sesi (Auth) menggunakan HttpOnly Cookies demi mencegah XSS.
- File upload (gambar) akan disimpan secara lokal di `/public/uploads/`.
- Hashing password menggunakan modul pihak ketiga `bcrypt`.

---

## 1. Struktur Folder Admin
Untuk menjaga kerapian dan tidak mengotori file publik, semua UI dan logika admin dipisah ke sub-folder khusus:
- **Pages**: `app/pages/admin/login.vue`, `app/pages/admin/index.vue` (Dashboard), `app/pages/admin/products/index.vue`, dll.
- **Layouts**: `app/layouts/admin.vue` (Berisi Sidebar dan Topbar, terpisah dari layout default publik).
- **Middleware Frontend**: `app/middleware/auth.ts` (melindungi rute `/admin/**` dari akses tanpa login).
- **Endpoint API**: `server/api/admin/...` (Isolasi endpoint spesifik untuk manajemen CMS).

## 2. UI Consistency & Responsive Requirements
- Admin CMS harus menggunakan **Nuxt UI** sebagai komponen utama.
- Warna, tipografi, spacing, radius, dan gaya visual harus konsisten dengan frontend publik Iwakula.
- Jangan membuat tema dashboard generik yang berbeda dari website publik.
- Gunakan design token atau palet warna yang sudah digunakan pada frontend publik.
- Semua halaman CMS harus responsive pada mobile, tablet, dan desktop.
- Sidebar harus berubah menjadi drawer/collapsible pada layar kecil.
- Tabel harus memiliki tampilan mobile-friendly.
- Form harus dapat digunakan dengan nyaman pada viewport sempit.
- Dashboard cards harus responsif (1 kolom mobile, 2 tablet, 4 desktop).

## 3. Endpoint API Admin yang Diperlukan
Mengacu pada standar response `{ success, message, data }` dan wajib menetapkan *method* pada akhiran file:
- **Autentikasi**:
  - `POST /api/admin/auth/login.post.ts` (Memverifikasi kredensial)
  - `POST /api/admin/auth/logout.post.ts`
  - `GET /api/admin/auth/me.get.ts` (Membaca sesi user saat ini)
- **Modul Produk (Contoh CUD)**:
  - `POST /api/admin/products/index.post.ts` (Create)
  - `PUT /api/admin/products/[id].put.ts` (Update)
  - `DELETE /api/admin/products/[id].delete.ts` (Delete)
*(Hal yang sama juga berlaku untuk entitas Kategori, Achievements, dan Kontak)*.

## 4. Composable Admin yang Diperlukan
- **`useAuth.ts`**: Menangani logika login, logout, dan status otentikasi (membaca dari cookie/state).
- **`useAdminProducts.ts`**: Composable khusus CUD produk (misal: fungsi `createProduct`, `updateProduct`, `deleteProduct`). Ini sengaja dipisah dari `useProducts.ts` milik publik agar ukurannya lebih ringkas dan *concern*-nya berbeda.

## 5. Alur Autentikasi (Login, Session/JWT, Middleware)
- **Login Flow**: Admin masuk ke `/admin/login`, mengirim email dan password ke `/api/admin/auth/login`. Jika cocok, server merespons dengan Header `Set-Cookie` (mengandung token sesi HttpOnly) dan status sukses.
- **Backend Middleware**: Dibuat file utilitas `server/utils/requireAuth.ts` atau event handler Nitro di `/server/middleware/adminAuth.ts` yang akan mengecek token di setiap *request* yang mengarah ke `/api/admin/**`. Jika tidak ada token atau token tidak valid, blokir (401 Unauthorized).
- **Frontend Middleware**: Nuxt route middleware (`app/middleware/auth.ts`) ditempelkan di halaman `/admin/**`. Jika Nuxt tidak mendeteksi sesi yang valid, paksa redirect ke `/admin/login`.

## 6. Repository / Layer Database
Untuk mencegah duplikasi logika Drizzle antara endpoint publik dan admin, seluruh akses database akan dipusatkan menggunakan pola *Repository*:
- `server/repositories/productRepository.ts`
- `server/repositories/categoryRepository.ts`
- `server/repositories/achievementRepository.ts`
- `server/repositories/contactRepository.ts`

Setiap endpoint API (baik publik maupun admin) hanya bertugas menangani Request/Response HTTP, sementara operasi ke database memanggil fungsi dari *repository* tersebut (contoh: `productRepository.getAll()`).

## 7. Halaman Admin yang Diperlukan
1. **`/admin/login`**: Formulir otentikasi (Email & Password).
2. **`/admin`**: Dasbor ringkasan (misal, jumlah produk, kategori).
3. **`/admin/categories`**: Manajemen master kategori.
4. **`/admin/products`**: Tabel daftar produk.
5. **`/admin/products/create` & `/admin/products/[id]`**: Form input panjang yang akan mengintegrasikan Rich Text Editor **Tiptap** untuk kolom deksripsi (rute `/admin/products/[id]` akan bertindak sebagai halaman *edit*).
6. **`/admin/achievements`**: Manajemen profil dan pencapaian.

## 8. Strategi Upload Gambar Produk
- **Backend Setup**: Membuat endpoint `POST /api/admin/upload.post.ts` menggunakan utilitas bawaan Nitro `readMultipartFormData(event)`.
- **Eksekusi**: Gambar disimpan di dalam direktori proyek `public/uploads/` menggunakan library seperti Node `fs` / `path`.
- **Database**: URL relatif gambar (misal `/uploads/gambar1.jpg`) disimpan ke kolom `main_image` (tabel produk) atau ke tabel `product_images` (untuk galeri).

## 9. Cara Membuat Frontend Publik Tetap Menggunakan Endpoint Publik
- Halaman UI `app/pages/products/index.vue` dan Composable `app/composables/useProducts.ts` dibiarkan apa adanya (tidak diubah).
- Endpoint publik di `server/api/products/index.get.ts` tetap murni mengambil data (`read-only`) secara efisien untuk pelanggan, tanpa dibebani pengecekan *Auth* middleware (karena tidak masuk ke scope folder `server/api/admin`).

## 10. Cara Menggunakan Endpoint Admin Tanpa Menduplikasi Logika Database
- Kedua jenis API (Publik dan Admin) tidak akan menulis query database secara langsung, melainkan berbagi file yang sama dari direktori `server/repositories/`.
- Endpoint publik akan memanggil metode *read-only* dari *repository* (seperti `.getAll()`, `.findBySlug()`).
- Endpoint admin akan memanfaatkan metode mutasi dari *repository* yang sama (seperti `.create()`, `.update()`, `.delete()`). Hal ini memastikan logika *query* Drizzle hanya ditulis satu kali dan terpusat.

## 11. Urutan Implementasi yang Paling Aman
1. **Fase 1: Setup Security & Auth**
   - Instal library *hashing* (`bcrypt` / utilitas web crypto bawaan).
   - Buat API Login & Logout, serta validasi Session/Cookies.
   - Buat halaman `/admin/login` dan Frontend Middleware (protect route).
2. **Fase 2: Layout & Core CMS**
   - Buat `admin.vue` layout.
   - Buat endpoint fitur Upload Gambar (sebagai basis bagi entitas yang memiliki gambar).
3. **Fase 3: Kategori (Entitas Induk)**
   - API Admin CRUD Kategori.
   - Halaman Admin Manajemen Kategori.
4. **Fase 4: Produk (Entitas Anak)**
   - API Admin CRUD Produk (termasuk integrasi Tiptap).
   - Halaman Admin Manajemen Produk.
5. **Fase 5: Ekstra**
   - Modul Achievements & Contacts.
   - Review flow dan pembersihan UI Admin (UX).
