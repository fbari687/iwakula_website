# Sprint 5 & 5.1 Review: Product CMS CRUD & Multi-Image Gallery

## Sprint Overview

Tujuan utama dari Sprint 5 adalah membangun CMS Produk secara penuh (Create, Read, Update, Delete) yang mumpuni. Implementasi pada sprint ini menggunakan pendekatan *Repository Pattern*, Drizzle ORM untuk manajemen *database*, Zod Validation untuk validasi *payload*, Nuxt UI v4 untuk antarmuka administrator, serta integrasi unggah gambar (WebP Normalization) yang efisien.

Sprint 5.1 merupakan penyempurnaan langsung (ekstensi) dari Sprint 5 yang memperluas sistem agar mendukung **galeri multi-gambar produk**. Hal ini dicapai melalui penggunaan tabel `product_images` yang memungkinkan setiap produk memiliki lebih dari satu representasi visual.

## Scope Implemented

Berikut adalah cakupan fitur utama yang telah berhasil diimplementasikan:

* Product Repository (Pusat logika data produk)
* Admin CRUD API (Endpoint pengelolaan data produk)
* Public API (Penyesuaian respons data produk untuk katalog publik)
* Zod Validation (Validasi tipe data dan skema *input*)
* `useAdminProducts` composable (Manajemen *state* frontend)
* Admin Product List (Tabel daftar produk)
* Product Create/Edit Form (Formulir pembuatan dan penyuntingan produk)
* Upload Image Integration (Integrasi endpoint unggah gambar WebP)
* Multi Image Gallery (Fitur unggah dan pratinjau multi-gambar)
* Database enhancement (Penambahan `displayOrder`, relasi `product_images`, dan optimasi indeks)

## Files Created

Selama Sprint 5 dan Sprint 5.1, beberapa berkas baru telah dibuat dan dikelompokkan berdasarkan lapisannya:

**Backend (API & Repositories)**
* `server/api/admin/products/index.get.ts`
* `server/api/admin/products/index.post.ts`
* `server/api/admin/products/[id].get.ts`
* `server/api/admin/products/[id].put.ts`
* `server/api/admin/products/[id].delete.ts`
* `server/database/repositories/productRepository.ts`

**Validator**
* `server/utils/validators.ts`

**Frontend (Composables & Pages)**
* `app/composables/useAdminProducts.ts`
* `app/pages/admin/products/index.vue`
* `app/pages/admin/products/create.vue`
* `app/pages/admin/products/[id].vue`

## Files Modified

Beberapa berkas yang sudah ada mengalami modifikasi penting:

* `server/database/schema.ts` (Penambahan/penyesuaian skema tabel `products` dan `product_images`)
* `server/api/products/index.get.ts` (Penyesuaian balikan API publik agar mengembalikan data galeri dan kategori)
* `server/api/products/[slug].get.ts` (Sama seperti indeks produk, ditambah ekstraksi `extraImages`)
* `server/api/products/featured.get.ts` (Penyesuaian untuk kompatibilitas struktur respons)
* `app/pages/admin/categories/create.vue` (Perbaikan tautan API unggahan dan param data *form*)
* `app/pages/admin/categories/[id].vue` (Perbaikan tautan API unggahan dan param data *form*)

## Database Changes

Perubahan pada skema basis data dilakukan untuk mendukung fitur galeri dan memastikan integritas data:

* **Tabel `product_images`**: Diperbarui untuk mendukung manajemen urutan.
  * Penambahan kolom `displayOrder` tipe *integer* untuk menentukan urutan pratinjau gambar.
  * Relasi `foreign key` `productId` secara spesifik didefinisikan.
  * Menggunakan `ON DELETE CASCADE` sehingga ketika sebuah entri `products` dihapus, seluruh gambar terkait pada `product_images` otomatis terhapus (mencegah *orphan data*).
  * Penambahan *index* pada `productId` untuk mempercepat kueri *join*.

Alasan utama perubahan tersebut adalah untuk memfasilitasi urutan gambar pada *carousel* di halaman publik dan memudahkan pengelolaan siklus hidup data melalui operasi *cascade delete*.

## Repository Pattern Implementation

`productRepository` (`server/database/repositories/productRepository.ts`) telah diimplementasikan sebagai **Single Source of Truth** untuk seluruh transaksi yang berinteraksi dengan tabel `products`.

Method yang tersedia pada repositori ini meliputi:
* `getAll`
* `getById`
* `getBySlug`
* `getFeatured`
* `getByCategory`
* `create`
* `update`
* `delete`

**Mapping Gambar:**
Repositori menyederhanakan data relasional dengan melakukan *mapping*:
* Atribut `image` pada produk dipetakan secara internal sebagai `mainImage`.
* Atribut gambar-gambar relasional dari `product_images` dipetakan ke dalam *array* `extraImages`.

## Transaction Strategy

Implementasi pembuatan (`create`) dan pembaruan (`update`) produk menggunakan **Drizzle Transaction** (`db.transaction`).

Transaksi digunakan karena operasi-operasi ini memanipulasi lebih dari satu tabel (contoh: tabel `products` dan `product_images`). Penggunaan blok transaksi memastikan prinsip ACID (khususnya *Atomicity*); jika salah satu proses penyisipan/pembaruan gambar gagal, maka seluruh operasi pada produk tersebut akan di-*rollback*.

## Multi Image Gallery

Sistem galeri diimplementasikan melalui beberapa mekanisme terintegrasi:

* **`extraImages`**: Array penampung referensi gambar tambahan.
* **Upload Multi-file**: Komponen UI yang mendukung pemilihan dan pengunggahan beberapa fail gambar secara asinkronus ke layanan internal.
* **Preview Grid**: Menampilkan tata letak grid *(thumbnails)* untuk gambar yang baru diunggah maupun yang sudah ada.
* **Remove Image**: Fitur untuk menghapus salah satu pratinjau gambar dari *list* lokal sebelum dikirim ke server.
* **Penyimpanan (`product_images`)**: Gambar tambahan disimpan sebagai entri independen yang merujuk pada `productId` terkait.
* **`displayOrder`**: Nilai urutan gambar yang di-assign berdasarkan indeks pada *array* saat *submit*.
* **Strategi MVP `delete all + insert all`**: Untuk *update* produk dengan gambar tambahan, sistem mengandalkan strategi ringkas dengan cara menghapus seluruh rekaman `product_images` milik produk tersebut terlebih dahulu, kemudian menyisipkan ulang `extraImages` dengan `displayOrder` yang baru. Hal ini mempermudah proses MVP sebelum fitur sinkronisasi inkremental yang lebih kompleks dibuat.

## Public API Compatibility

Endpoint API publik (`/api/products/*`) telah diperbarui agar selalu mengembalikan blok data lengkap yang terstruktur:
* `image`: Gambar utama (*thumbnail* produk).
* `extraImages`: Array gambar-gambar sekunder untuk mendukung komponen galeri/slider di *frontend*.
* `category`: Objek kategori lengkap.

Hal ini menjamin kompatibilitas parsial yang lebih baik untuk komponen *frontend* publik yang mengharapkan properti-properti tersebut tersedia, meminimalisir kesalahan pemetaan UI.

## Admin UI

Antarmuka *Administrator* menggunakan Nuxt UI v4 dengan spesifikasi berikut:

* **Product Listing Premium**: Menampilkan tabel produk bergaya profesional.
* **Thumbnail**: Menampilkan gambar utama setiap produk di kolom tabel.
* **Category Badge**: Penanda visual yang merepresentasikan kategori asal produk.
* **Status & Featured Badge**: Menggunakan variasi warna indikatif untuk ketersediaan dan status produk unggulan.
* **Responsive Layout**: Kontainer tabel (*card*) dapat beradaptasi dari layar *mobile* hingga *desktop*.
* **Create/Edit Form**: Formulir responsif yang dibatasi panjang dan dikategorikan (Informasi, Harga & Stok, Status, Media).
* **Upload WebP Integration**: Tampilan zona seret-jatuh (drag & drop zone) untuk mendukung pengunggahan yang terintegrasi dengan utilitas WebP Sharp.
* **Galeri Tambahan**: Penempatan kotak gambar tambahan pada sesi media yang intuitif.

## Verification Checklist

- [x] Product Create (Dapat menyimpan produk beserta kategori)
- [x] Product Read (Dapat memuat tabel produk dan melihat detail tunggal)
- [x] Product Update (Dapat menyunting field teks, harga, boolean, dan media)
- [x] Product Delete (Dapat menghapus entitas produk)
- [x] Multi Image Upload (Endpoint dapat memproses multi file via *loop*)
- [x] Gallery Preview (UI dapat menampilkan grid pratinjau gambar ekstra)
- [x] Public API (Kesesuaian respon JSON dengan schema yang didefinisikan)
- [x] Featured API (API produk unggulan beroperasi normal dengan model terbaru)
- [x] Slug Generation (Atribut form auto-slug berfungsi jika belum diedit)
- [x] Validation (Zod secara handal menolak *payload* yang buruk dari *client*)
- [x] Transaction (Database Transaction diaplikasikan pada CUD repository)
- [x] Cascade Delete (`ON DELETE CASCADE` terkonfirmasi fungsional pada tingkat skema)
- [x] Responsive UI (Halaman *mobile* dan *desktop* berfungsi dan rapi)

## Architecture Decisions

Beberapa keputusan fundamental yang diambil pada sprint ini:

* **Repository Pattern**: Diaplikasikan guna mengabstraksi pemanggilan Drizzle ORM, menjadikan berkas API (*Nitro Handlers*) bersih dan fokus menangani validasi HTTP (Zod) serta kontrol respons (HTTP status).
* **Single Source of Truth**: Semua operasi data untuk produk diwajibkan melewati `productRepository` tanpa ada bypass langsung dari handler API.
* **Drizzle Transaction**: Keputusan krusial untuk menjaga integritas data antar tabel.
* **ON DELETE CASCADE**: Digunakan pada struktur relasi database untuk mengurangi kode *cleanup* manual pada repositori (`clean product_images before delete product`).
* **`displayOrder`**: Menjawab fleksibilitas presentasi gambar pada masa depan.
* **WebP Normalization**: Memastikan semua gambar yang diunggah akan otomatis memiliki *footprint* kecil agar performa katalog tetap superior.
* **MVP Gallery Strategy**: Keputusan untuk mengimplementasikan *delete-and-reinsert* pada `product_images` sewaktu *update* produk adalah pendekatan yang meminimalisir kesalahan kompleksitas mutasi *state array* di tahap awal.

## Known Limitations

Ada beberapa keterbatasan (*limitations*) teknis maupun UI yang disadari dan ditunda penyelesaiannya:

* Tidak ada *drag-and-drop reorder* untuk gambar galeri di form antarmuka admin.
* Strategi sinkronisasi galeri masih menghapus seluruh *row* (`incremental gallery update` belum tersedia).
* Belum tersedia *gallery manager* tersendiri untuk mengelola *asset pool* yang tidak terkait ke satu produk spesifik.
* Tidak mendukung optimasi unggahan sekumpulan file yang sangat masif (*bulk upload optimization*) dengan *queueing* di *background*.
* Tidak ada layanan pemotongan gambar otomatis (*image cropping* UI).
* *Thumbnail generation* secara asinkron ke beberapa ukuran spesifik belum berjalan (hanya resolusi 1600px).

## Sprint Outcome

Sprint 5 berhasil secara substantif mentransformasi iterasi sebelumnya (yang hanya mengelola CMS Kategori) menjadi **CMS Produk yang *full-featured***. Dengan penyempurnaan di Sprint 5.1, aplikasi kini dibekali fondasi pengolahan media yang ekstensif melalui fitur pratinjau galeri multi-gambar. Struktur *Repository Pattern* dan integrasi transaksi basis data telah menyiapkan kerangka aplikasi agar mudah diskalakan, sehingga pada iterasi/sprint berikutnya dapat dikembangkan fitur-fitur yang melengkapi fungsionalitas UI modern seperti manipulasi presisi *carousel*, *drag-and-drop reordering*, dan tata kelola media tingkat lanjut.
