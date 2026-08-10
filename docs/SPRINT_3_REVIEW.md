# Sprint 3 Review

## Sprint Goal
Merancang dan mengimplementasikan endpoint API khusus untuk pengunggahan gambar lokal (*local image upload*) yang sangat aman, ringan, dan termodulasi. Sprint ini berfokus pada standardisasi seluruh berkas biner ke dalam format mutakhir (*WebP Normalization*) guna menyokong efisiensi konsumsi jaringan dari aplikasi sisi klien tanpa perlu mengorbankan resolusi detail katalog produk Iwakula.

## Scope Implemented
- **Endpoint `POST /api/admin/upload`**: Pembangunan jalur lalu lintas data form-data.
- **Local Image Upload**: Mekanisme penyimpanan berkas fisik ke disk server (`fs/promises`).
- **WebP Normalization**: Standardisasi paksa seluruh format input (.png, .jpg) ke ekstensi murni `.webp`.
- **Sharp Integration**: Pemanfaatan *library* Node.js `sharp` sebagai motor utama pengolah visual biner.
- **Image Validation**: Pengecekan ukuran, ketersediaan field `image`, hingga keutuhan struktur *buffer* biner file.
- **Resize Policy**: Restriksi pemangkasan dimensi maksimal di 1600px (proporsional).
- **EXIF Stripping**: Perlindungan privasi administratif melalui penghapusan atribut metadata GPS dan perangkat.
- **UUID File Naming**: Penggunaan `crypto.randomUUID()` guna menghasilkan identitas fail absolut tak-terprediksi.
- **Automatic Directory Creation**: Penerapan perakitan pohon direktori otomatis (*recursive mkdir*).
- **Reusable Upload Architecture**: Desain utilitas yang berdiri secara mandiri (modular) sehingga siap dipanggil berulang kali dari modul mana pun (Produk, Kategori, Tiptap).

## Files Created / Modified
- `server/api/admin/upload.post.ts` (Baru)
- `package.json` & `package-lock.json` (Diperbarui dengan instalasi dependensi `sharp`)

## Functional Verification
- **Upload JPG**: Berhasil dimuat dan diproses penuh tanpa kendala.
- **Upload PNG**: Berhasil dimuat dan diproses penuh tanpa kendala.
- **Upload WebP**: Berhasil dimuat dan diproses penuh tanpa kendala.
- **Validasi Field `image`**: Apabila penguji mengirimkan nama parameter form yang salah (misal: `photo`), API patuh memberikan penolakan `400 Bad Request`.
- **Validasi Ukuran File**: Penahanan mutlak beban gambar bila melebihi 5MB dengan respons `413 Payload Too Large`.
- **Validasi MIME Type**: Pemangkasan dini jenis fail di luar *whitelist* (`image/jpeg, image/png, image/webp`).
- **Request Tanpa Login**: Dihalau sempurna oleh selimut *middleware* (merespons dengan `401 Unauthorized`).
- **Konversi Otomatis ke WebP**: Gambar yang masuk walau awalnya berformat JPG, akan direkam di disk mutlak dengan ekstensi `.webp`.
- **Akses File Hasil Upload**: File tersimpan berhasil ditinjau langsung di jendela pramban publik lewat jalur lokal `/uploads/[uuid].webp`.

## Image Pipeline Verification
Pipa operasional pengolahan gambar (Image Pipeline) telah sukses melampaui seluruh prasyarat target:
- **Auto-rotate**: Posisi gambar otomatis mematuhi pijakan gravitasi EXIF (menghindari foto terbalik akibat gawai).
- **Resize Maksimal 1600px**: Resolusi gambar 4K menyusut halus tanpa merusak proporsi gambar (*aspect ratio fit*).
- **No Upscale**: Resolusi gambar mungil (misal 500px) tidak dipaksa melar menjadi buram karena properti `withoutEnlargement: true`.
- **Quality WebP 82**: Keunggulan algoritme keseimbangan, menciutkan ratusan KB hingga menjadi hitungan puluhan KB dengan visual menawan.
- **EXIF Stripping**: Sharp otomatis membakar metadata jejak lokasi GPS.
- **Output Selalu `.webp`**: Terkunci presisi absolut, tidak pernah meloloskan tipe *file* lain.

## Security Verification
- **Whitelist MIME Type**: Validasi lapis pertama menghentikan aliran jika tipe berkas yang disuntikkan secara eksplisit bertentangan.
- **Sharp Sebagai Validator Akhir**: Segala taktik penanaman perangkat lunak perusak (*malware*) / skrip `.php` berbalut nama `.png` berhasil dipatahkan mutlak karena Sharp gagal merender binernya.
- **UUID Naming**: Seluruh rekaman identitas nama orisinal dibantai dari ingatan server, menghindari pancingan eksploitasi URL (*predictable URL guessing*).
- **Overwrite Prevention**: Karena perpaduan alfanumerik kriptografis mustahil mengalami bentrok *(collision)*.
- **Path Traversal Mitigation**: Tak ada lagi peninggalan sisa titik retas eksploitasi `../../` dari klien.
- **Proteksi Middleware Admin**: Area pengunggahan dikarantina ketat oleh parameter JWT/sesi Admin Nitro.

## Problems Encountered
- **Sharp HEIC Decoupling**: Ditemukan masalah kompatibilitas saat lingkungan pengembangan OS lokal (Windows) tak dibekali pre-kompilasi `libheif` oleh *prebuilt* Sharp, mengakibatkan foto format `HEIC` (dari Apple) melempar eror *engine* yang membingungkan.
- **Penyelesaian**: Melakukan modifikasi eliminasi dengan mencoret perlindungan `image/heic` dan `image/heif` dari *whitelist* MIME API. Keputusan asertif ini membuat aplikasi bereaksi anggun (mengeluarkan penolakan 415 "Format tidak didukung" sedari gerbang awal) dibanding mati tercekik (*crash*) di dalam koridor perenderan Sharp.

## Architectural Decisions
- **Seluruh Aset Dinormalisasi ke WebP**: Keputusan memangkas perdebatan soal tipe gambar dan mengunci secara ekstrem pada standar WebP guna mendulang beban muat halaman tercepat (*fastest page load*) pada Frontend Publik CMS Iwakula.
- **Penggunaan Sharp**: Terpilih menggantikan pemrosesan murni CLI eksternal karena Sharp jauh lebih matang (*mature*) dalam menerjemahkan dan mengompresi struktur (*buffer in, buffer out*).
- **Penyimpanan Lokal**: Sengaja mempertahankan muara pengunggahan fisik di direktori statis `public/uploads/` guna memaksimalkan performa *caching* bawaan Nuxt.
- **Struktur Folder Upload Extensible**: Membenamkan utilitas pemicu ketersediaan *path* (`mkdir recursive`) sehingga sewaktu-waktu jalur bisa dibelokkan menuju subdirektori manapun (seperti parameter `?folder=products`).
- **Penundaan Routing Subfolder**: Keputusan bijak *(Out of Scope)* untuk menahan alur klasifikasi fail (*Category/Product*) agar diselesaikan tepat pada waktunya bersamaan dengan perakitan tabel relasional (Sprint 5).

## Lessons Learned
- Implementasi API biner yang tangguh di Node/Nitro tidak selalu membutuhkan dependensi perantara semacam `Multer`. Fitur bawaan `readMultipartFormData` terbukti amat mumpuni untuk dijahit secara langsung dengan mesin validator kompresi seperti Sharp.
- Mempertimbangkan keterbatasan dari sebuah ekosistem peladen pengembangan lokal (contoh ketiadaan paten HEIC bawaan) di fase paling awal sukses menyelamatkan proyek dari pendarahan jam operasional (*debugging hell*).

## Technical Debt
- **Routing ke `/uploads/products` dll**: Pendistribusian berkas biner ke kompartemen unik terpisah belum disalurkan.
- **Thumbnail Generation**: Pembangkit miniatur foto katalog derivatif belum dirancang.
- **Watermark**: Perlindungan lisensi cap hak cipta gambar *(copyright).*
- **Gallery Management**: Belum ada komponen galeri aset (*media library*) untuk meninjau secara grafis daftar foto yang menumpuk di memori.
- **Database Integration**: Rekaman rute URL (*URL Relational Reference*) yang harus didaftarkan di ORM Drizzle.
- **UI Upload Component**: Komponen *drag & drop* serta status bar persentase belum dibangun di laman muka.

## Sprint 3 Outcome
Tinjauan mutu operasional secara konklusif menyatakan bahwasanya **Sprint 3 (Local Image Upload) SELESAI 100%, terkunci stabil mutlak, dan aman dari kerentanan biner**. Modul mikro-API utilitas yang lincah ini telah berdiri mandiri menjadi jembatan kukuh penyambung alur unggah bagi berbagai rute operasional CMS di masa depan.

## Readiness for Sprint 4
Keberhasilan Sprint 3 membawakan garansi bahwa salah satu urat nadi teknis tersulit (manajemen pengolahan memori biner visual) telah selesai dilewati. **Sprint 4 (Category CMS CRUD)** saat ini dapat berjalan lepas landas dengan probabilitas gesekan hambatan (*friction risk*) yang nyaris nol. Tanpa harus diganggu oleh arsitektur pengolahan citra lagi, tim kini bisa mengerahkan seluruh tenaga logikanya seratus persen demi menyusun skema tabel kategori Drizzle ORM, titik endpoint operasi GET/POST/PUT/DELETE, hingga penganyaman respons reaktif Vue *frontend table list*.
