# Sprint 2 Review

## Sprint Goal
Membangun fondasi tata letak (layout) utama CMS Admin yang terdiri dari antarmuka *Sidebar* dan *Topbar*, serta menyiapkan kerangka konten dasbor (*Dashboard Shell*). Sprint ini berfokus kuat pada implementasi identitas visual (Design System) khusus Iwakula yang premium, terang, dan responsif tanpa menggunakan *template admin* yang generik.

## Scope Implemented
- **Admin Layout:** Memisahkan secara total kanvas admin dari tata letak pengunjung publik.
- **Sidebar:** Membuat panel navigasi sisi vertikal kustom menggunakan integrasi `NuxtLink` dan Tailwind.
- **Topbar:** Mengimplementasikan palang *header* atas yang dapat menampilkan variabel profil admin (via `useAuth`) dan pemicu *hamburger menu*.
- **Dashboard Shell:** Menyusun kisi (grid) metrik dasbor (*placeholder cards*) yang selaras secara visual.
- **Responsive Behavior:** Menjamin bahwa area panel administrasi adaptif terhadap rasio perangkat.
- **Mobile Drawer:** Integrasi Nuxt UI v4 (`UDrawer`) untuk menampung panel *Sidebar* pada resolusi sempit (Mobile/Tablet).
- **Visual Identity:** Penegakan spesifikasi palet warna (*off-white/Terracotta*) serta parameter *spacing/radius*.

## Files Created / Modified
- `app/layouts/admin.vue` (Baru)
- `app/components/admin/Sidebar.vue` (Baru)
- `app/components/admin/Topbar.vue` (Baru)
- `docs/SIDEBAR_NAVIGATION_SPECIFICATION.md` (Baru)
- `app/pages/admin/index.vue` (Diubah secara menyeluruh)

## Functional Verification
- **Akses `/admin`:** Berhasil memuat layout administrasi secara spesifik berkat konfigurasi `layout: 'admin'`.
- **Proteksi Middleware:** Halaman dasbor sukses dilindungi sesi `auth`, mencegah manipulasi tanpa otentikasi.
- **Responsive Desktop/Tablet/Mobile:** Tata letak bertransisi sempurna. *Sidebar* tampil kokoh di mode Desktop (`lg`), dan menyisakan ruang navigasi ke laci pada mode *Mobile*.
- **Drawer Mobile:** Penekanan tombol *hamburger* berhasil memicu animasi laci `<UDrawer>` Nuxt UI.
- **Overlay Drawer:** Kegelapan latar belakang laci (*backdrop*) berhasil dioverride transparan (warna biru/navy transparan ber-opacity).
- **Isolasi Publik:** *Header* (Navbar) dan *Footer* publik situs tidak akan tembus ke dalam hierarki, memastikan area `/admin/**` terisolir absolut.

## UI / UX Verification
- **Warna & Permukaan:** Diterapkan 100% konsisten. Latar utama `#F7F6F2`, permukaan komponen `#FBFAF8`, perbatasan (*border*) `#E7E1D8`. Tidak ada satupun blok gradasi warna pekat yang bertentangan dengan pedoman hangat Iwakula.
- **Spacing & Radius:** Jarak antar elemen dirancang bernapas (*margin/padding* area konten yang luas), dan seluruh kartu menggunakan radius melengkung yang tinggi (misalnya `16px-20px`).
- **Shadow:** Penerapan `shadow-sm` yang menempel sangat lembut di sekitar kartu dan panel navigasi.
- **Active State:** Secara instan memberikan pendaran `bg-[#C65A3A]` bagi elemen navigasi sidebar yang diaktifkan, memicu warna font dan logo menjadi `text-white`.
- **Tipografi:** Elegan, koheren, dan proporsional.
- **Responsivitas:** Tata letak tidak terkompres paksa, sukses di-*render* secara lapang berkat penggunaan strategi blok independen tanpa limitasi pendorongan elemen tersembunyi.

## Problems Encountered
- **Hot-Reload Bug:** Layout `admin.vue` yang baru dibuat awalnya tidak terdeteksi oleh mesin Nuxt akibat kendala *caching* *file watcher*. **Penyelesaian:** Instruksi *restart* server manual `npm run dev`.
- **Konflik Styling Default UCard:** `UCard` memiliki determinasi internal mengacu ke mode gelap bawaan Nuxt UI, mengakibatkan inkonsistensi rendering visual gelap pada cangkang kartu. **Penyelesaian:** Seluruh unit `UCard` diubah murni ke blok tag reguler `<div>` Tailwind yang bebas mutasi.
- **Penyusutan Konten (Flex-Squish) di Mobile:** Layout *main content* sempat terdorong setengah porsi layar oleh hantu ruang Sidebar di mode `flex`. **Penyelesaian:** Menganulir kelas *flex container* di level akar (*root*), menggantinya dengan formasi susunan *blok* berspesifikasi `lg:pl-64` dan menabrakkan `min-w-0` pada kotak utama.
- **Pergeseran API Nuxt UI v4 (USlideover ke UDrawer):** Komponen lama `<USlideover>` telah berubah menjadi `<UDrawer>` pada *environment* Nuxt v4. Kesalahan menembak `<USlideover>` membuat Vue menganggapnya tag HTML tak dikenali yang di-*render inline*, merusak layout seketika. **Penyelesaian:** Melakukan audit di dalam ekosistem (berkaca pada `Navbar.vue`), kemudian mengubah pemanggilan langsung menjadi `UDrawer` yang relevan.
- **Overlay/Backdrop Terlampau Gelap:** Lapisan redup dari *Drawer* menindas estetika *brand*. **Penyelesaian:** Properti *:ui* ditegaskan memakai `overlay: 'bg-[#24324A]/40'`.

## Architectural Decisions
- **Eksklusivitas Navigasi (NuxtLink):** Menjaga navigasi *Sidebar* dengan integrasi HTML primitif dipadu `NuxtLink` menggaransi presisi penuh atas pewarnaan parameter tautan rute.
- **Mobilisasi menggunakan UDrawer:** Secara langsung melimpahkan mekanika sentuh antarmuka layar sempit ke *Slideover Drawer*.
- **Desktop Sidebar Permanen:** Meningkatkan aksesibilitas konstan yang mencitrakan alat produktivitas profesional bagi admin.
- **Topbar Reactive:** Mengonsumsi *property user* (Admin Name) tanpa latensi dengan menjemput `useAuth`.
- **Dashboard Menggunakan Placeholder Cards:** Memutus rantai limitasi ketergantungan pada tabel *database*, memusatkan fokus mutlak arsitektur tata letak visual dalam bingkai ruang hampa.
- **Pemisahan Layout Admin Mutlak:** Menolak tumpang tindih elemen antara kanal pemasaran dan kanal pengelolaan operasional.

## Lessons Learned
- *Source of Truth* terbaik dalam lingkungan pengembangan yang bergantung kepada dependensi yang acap kali berubah (*volatile*) seperti *Nuxt UI v4 (alpha)* adalah dengan menilik bagaimana utilitas tersebut dieksekusi secara nyata di komponen lain (contohnya melakukan studi komparatif komponen `UDrawer` pada modul Navbar publik).
- Pendekatan antarmuka statis (*plain Tailwind div*) kadang jauh lebih terukur, bisa diandalkan, dan murah pengembangannya dibanding mendebat perilaku komponen terenkapsulasi *library UI*.

## Technical Debt
- **Statistik Placeholder:** Seluruh kuantitas yang dipampang (contoh "12 Total Produk") sama sekali tidak nyata, belum terkait dengan Drizzle ORM.
- **Rute Kosong:** Mengeklik menu `Produk` / `Kategori` pada *Sidebar* saat ini tidak akan membuahkan panel kerja melainkan ruang hampa tanpa antarmuka, menanti Sprint lanjutan.
- **Absennya Breadcrumb & Fitur Makro:** Tidak ada navigasi tapak historis pelacakan URL.
- **Dark Mode:** Sama sekali tidak ditangani sebab instruksi identitas CMS sudah jelas memveto estetik warna redup (mengunci portal pada palet terang-cerah).
- **Integrasi Operasional Data:** Nol. Murni sebatas kerangka etalase fiktif.

## Sprint 2 Outcome
Berdasarkan parameter pengujian kualitas implementasi, **Sprint 2 dikonfirmasi berstatus "SELESAI", terkunci stabil, dan berkinerja sempurna**. Arsitektur fondasional CMS kini telah siap berperan sebagai dinding penyangga bagi konstruksi panel manajerial aplikasi pada tingkatan operasional di iterasi berikutnya.

## Readiness for Sprint 3
Pelaksanaan fase **Sprint 3 (Local Image Upload)** kini disimpulkan memiliki probabilitas risiko implementasi (*friction risk*) yang amat rendah dan **Sangat Siap Dimulai**. Fondasi kerangka tata letak yang kuat, rapi, dan terisolasi memastikan tim dapat memusatkan energi kognitif sepenuhnya kepada manajemen fungsi pengelolaan berkas mutakhir, *multipart storage*, dan optimasi manipulasi gambar lokal, tanpa perlu lagi risau diganggu gugat oleh masalah tabrakan tampilan CSS maupun malfungsi pergerakan antar gawai.
