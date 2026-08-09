# Iwakula Website - Project Rules & Guidelines

Dokumen ini berisi informasi dan konvensi terverifikasi dari codebase `iwakula-website`. Gunakan informasi ini sebagai acuan saat melakukan pengembangan.

## 1. Tujuan Project
Aplikasi website profil perusahaan (Company Profile) dan katalog produk untuk UMKM bernama Iwakula (olahan menu ikan). Fungsi utamanya adalah menampilkan profil, daftar pencapaian (achievements), informasi kontak, serta menampilkan daftar produk yang dikelompokkan secara dinamis (beserta harga dan pengarahan link pembelian ke marketplace seperti Shopee/Tokopedia).

## 2. Tech Stack
- **Framework Utama**: Nuxt 4 (dengan mode Nuxt 4 `compatibilityVersion: 4`)
- **Frontend**: Vue 3.5, TailwindCSS 4 (`@tailwindcss/vite`), Nuxt UI, Nuxt Image, Nuxt Fonts
- **Rich Text Editor**: Tiptap (tersedia di package, disiapkan untuk CMS)
- **Backend / API**: Nitro (built-in Nuxt server)
- **Database & ORM**: MySQL dipasangkan dengan Drizzle ORM (driver `mysql2`)
- **Tooling Tambahan**: TypeScript, Vite, Drizzle-Kit

## 3. Arsitektur Frontend dan Backend
- **Monorepo Server-Side Rendered (SSR)**: Proyek bersifat fullstack dalam satu repositori.
- **Frontend (Vue/Nuxt)**: Bertanggung jawab terhadap UI, interaktivitas, dan SEO. Mengambil data dari internal API.
- **Backend (Nitro)**: Berjalan secara server-side. Membaca/menulis data langsung dari/ke MySQL database melalui Drizzle ORM.

## 4. Alur Data
1. Data mentah tersimpan di **MySQL**.
2. **Drizzle ORM** (Backend) menarik data menggunakan fungsi query relasional (seperti `db.query.products.findMany({ with: { category: true } })`).
3. **Endpoint API Nitro** mereturn JSON ke pengguna dengan struktur tetap: `{ success: boolean, message: string, data: any }`.
4. **Composable** (Frontend) seperti `useProducts` menembak endpoint menggunakan `useFetch`.
5. **Halaman Vue** mengeksekusi composable di dalam `Promise.all()`, melakukan pengelompokan data di properti `computed`, dan menyalurkan data (props) ke **Komponen** untuk dirender.

## 5. Struktur Folder
Struktur folder ini mengacu pada standar Nuxt 4:
- `/app/` -> Folder khusus Frontend.
  - `/app/pages/` (Halaman navigasi Vue)
  - `/app/components/` (Komponen UI Vue reusable)
  - `/app/composables/` (Logic state dan pemanggilan API)
  - `/app/layouts/` (Struktur template global)
- `/server/` -> Folder khusus Backend API & DB.
  - `/server/api/` (Endpoint backend Nitro)
  - `/server/database/` (Skema Drizzle dan seeder)
  - `/server/utils/` (Koneksi db, dsb)
- `/public/` -> File/aset statis (gambar, favicon, dsb).

## 6. Pola Composable
- Composable dipisah per-entitas (misal: `useProducts.ts`, `useCategories.ts`).
- Fungsi di dalam composable mengembalikan pemanggilan `useFetch`.
- Menggunakan query parameter HTTP apabila dibutuhkan filter, contoh: `query: { category, limit }`.

## 7. Pola Server / API
- Endpoint dibungkus dengan `defineEventHandler(async (event) => { ... })`.
- Parameter input atau query ditangkap melalui fungsi `getQuery(event)` bawaan Nitro.
- Semua panggilan Drizzle wajib dibungkus dalam blok `try / catch`.
- Jika error, gunakan `throw createError({ statusCode: ..., statusMessage: ... })`.
- Pola pengambilan data ORM menggunakan Drizzle Relational API (bukan raw query): `db.query.[tabel].findMany(...)` atau `findFirst(...)`.

## 8. Konvensi Penamaan
- **Komponen Vue**: PascalCase (cth: `ProductTile.vue`, `CategoryCard.vue`).
- **Composables**: camelCase menggunakan awalan `use` (cth: `useProducts.ts`).
- **File Halaman (Pages)**: lowercase, menggunakan folder untuk routing bersarang (cth: `pages/products/index.vue`).
- **Endpoint API Nitro**: menggunakan penamaan RESTful dan akhiran metode HTTP (cth: `index.get.ts`, `[slug].get.ts`).
- **Database Schema**: penamaan field database berupa `snake_case` di MySQL (`created_at`), namun diubah pemetaannya di TypeScript/Drizzle menjadi `camelCase` (`createdAt`).

## 9. Aturan yang Harus Dipertahankan Ketika Mengembangkan CMS
- **Standar Response**: Semua API baru (Admin CUD) wajib mengembalikan format struktur `{ success, message, data }`.
- **Nama File Suffix HTTP**: Pembuatan/pembaruan rute API untuk CMS harus secara eksplisit mendefinisikan *method* di akhir nama file, contoh: `index.post.ts`, `[id].put.ts`, `[id].delete.ts`.
- **Middleware & Keamanan**: Karena belum ada fitur otentikasi saat ini, pengembangan CMS **wajib** menyertakan logika pengecekan otorisasi (Session/JWT) yang memvalidasi user admin terhadap tabel `users`, agar endpoint POST/PUT/DELETE tidak terbuka untuk publik.
- **Konsistensi ORM**: Wajib menggunakan `import { db } from "~~/server/utils/db"` saat memanipulasi database di sisi server CMS.

## 10. Status Implementasi Saat Ini
- **Selesai**: Setup kerangka project, skema tabel dasar Drizzle, *seeder* (`db:seed`), endpoint API *Read-Only* (`GET`), beserta halaman Frontend (Homepage, Katalog) yang sudah berfungsi me-render data dari database.
- **Belum Selesai (Pending)**: 
  - Belum ada antarmuka (UI) Admin Panel CMS.
  - Logika login dan validasi User Admin belum dibuat (tabelnya sudah ada).
  - API CUD (Create, Update, Delete) untuk produk, kategori, dsb sama sekali belum ada.
  - Tabel spesifik (`storages`, `credentials`) di `schema.ts` masih di-comment dan relasi tambahannya belum aktif.

## 11. UI / Design Constraints
- **Admin CMS harus menggunakan Nuxt UI** sebagai komponen utama.
- **Warna, tipografi, spacing, radius, dan gaya visual** harus konsisten dengan frontend publik Iwakula.
- **Jangan membuat tema dashboard** yang berbeda dari website publik.
- **Gunakan palet warna** yang sudah digunakan pada frontend publik sebagai design system utama.
- **Semua halaman CMS harus responsive** pada mobile, tablet, dan desktop.
- **Sidebar** harus berubah menjadi drawer/collapsible pada layar kecil.
- **Tabel** harus memiliki tampilan mobile-friendly.
- **Form** harus dapat digunakan dengan nyaman pada viewport sempit.
- **Dashboard cards** harus responsif (1 kolom mobile, 2 tablet, 4 desktop).
