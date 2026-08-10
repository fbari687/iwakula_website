# Sprint 1 Review

## Sprint Goal
Membangun fondasi autentikasi (*Backend* & *Frontend*) yang aman dan modular untuk sistem CMS Admin Iwakula, serta memastikan antarmuka (UI) otentikasi merefleksikan identitas visual premium dari Iwakula tanpa merusak alur aplikasi publik.

## Scope Implemented
- **Sprint 1A (Backend Auth Foundation):** Mengimplementasikan utilitas *hashing password* (bcrypt), manajemen sesi menggunakan *HttpOnly Cookies* (H3), dan pembuatan endpoint otentikasi esensial (`/api/admin/auth/login`, `logout`, `me`).
- **Sprint 1B (Frontend Auth & Login UI):** Membuat *composable* `useAuth` untuk mengelola *state* pengguna secara global dan mendesain antarmuka login admin (`/admin/login`) yang responsif, elegan, dan terintegrasi penuh dengan identitas visual Iwakula.
- **Sprint 1C (Middleware & Route Protection):** Merakit lapisan pertahanan menggunakan *named middleware* di sisi *frontend* (`app/middleware/auth.ts`) dan *global event handler* di sisi *backend* (`server/middleware/adminAuth.ts`) untuk memblokir akses tidak sah ke seluruh rute dan data admin.

## Files Created / Modified
**Backend:**
- `server/utils/auth.ts` (Sprint 1A - Utilitas H3 Session & Hashing)
- `server/api/admin/auth/login.post.ts` (Sprint 1A - Endpoint Login)
- `server/api/admin/auth/logout.post.ts` (Sprint 1A - Endpoint Logout)
- `server/api/admin/auth/me.get.ts` (Sprint 1A - Endpoint Validasi Sesi)
- `server/middleware/adminAuth.ts` (Sprint 1C - Proteksi Global API Admin)

**Frontend:**
- `app/composables/useAuth.ts` (Sprint 1B - Manajemen state login klien)
- `app/pages/admin/login.vue` (Sprint 1B - UI Login)
- `app/middleware/auth.ts` (Sprint 1C - Named route middleware Nuxt)
- `app/pages/admin/index.vue` (Sprint 1C - Placeholder Dasbor CMS)

## Functional Verification
- **Login:** Pengguna dapat memasukkan kredensial admin dan menerima sesi (cookie) yang sah dengan notifikasi berhasil.
- **Logout:** Menghancurkan sesi secara efektif, menghapus data pengguna dari memori klien, dan memulangkan admin ke halaman login.
- **Endpoint `me`:** Secara konsisten mereturn data *user* selama cookie belum kedaluwarsa.
- **Proteksi `/admin`:** Secara instan menendang pengguna (*redirect*) ke `/admin/login` apabila mencoba mengakses dasbor tanpa login.
- **Proteksi `/api/admin/**`:** Mencegat seluruh manipulasi API dan langsung mereturn `401 Unauthorized` apabila ditembak langsung (via Postman/cURL) tanpa cookie.
- **Redirect Cerdas:** Pengguna yang *sudah login* akan otomatis ter-redirect ke `/admin` apabila iseng kembali memanggil halaman `/admin/login`.
- **Session Persistence:** Menyegarkan (F5) halaman `/admin` tidak menyebabkan status *login* hilang berkat pemanggilan otomatis endpoint `me`.
- **Session Expiration:** Jika sesi habis di sisi server, akses navigasi berikutnya akan men-trigger 401, membersihkan *state* klien, dan memulangkan pengguna ke halaman login.

## Architectural Decisions
- **Menggunakan H3 Session:** Dipilih sebagai metode utilitas bawaan Nitro yang lebih kokoh dan aman (berbasis cookie HttpOnly tersandi) dibandingkan menyimpan token otentikasi ke LocalStorage.
- **Tidak Menggunakan JWT Standar:** Mengingat arsitektur *monorepo SSR*, manajemen *stateful/cookie session* dinilai jauh lebih tangguh terhadap serangan XSS *(Cross-Site Scripting)* daripada JWT yang harus di-passing bolak-balik via *header* secara manual oleh klien.
- **Named Middleware (Frontend):** Dipilih alih-alih *global middleware* agar performa rendering halaman publik Iwakula tidak terbebani oleh logika pengecekan otentikasi.
- **Nuxt UI v4 Adherence:** Mematuhi de-fakto framework terbaru `@nuxt/ui` v4 (penggunaan `UFormField` menggantikan `UFormGroup`).
- **Penggunaan HTML Input + Tailwind:** Secara sengaja "melanggar" penggunaan `<UInput>` demi memperoleh kendali 100% terhadap kontras visual *off-white* dan menghindari penetrasi gaya bawaan (*default dark theme*) dari komponen library.

## Problems Encountered
- **Asumsi Nuxt UI Versi Lama:** Awalnya, rencana dan eksekusi awal menggunakan struktur rute dan komponen Nuxt UI (seperti `UFormGroup`) berdasarkan konvensi versi sebelumnya (v2/v3).
- **Perbedaan API Nuxt UI v4:** Terjadi penolakan properti komponen karena pembaruan ekstrem di Nuxt UI v4 (beralih ke `UFormField` dan perampingan properti `:ui`).
- **Penyesuaian Middleware:** Kesalahan pembacaan direktori *hot-reload* menyebabkan Nuxt melontarkan *error 500* "Unknown route middleware", yang dipecahkan hanya dengan melakukan *restart* dev server. Serta anomali terbawanya *Layout Default (Navbar Publik)* ke rute `/admin`, yang diperbaiki dengan menyematkan `layout: false`.
- **Revisi Implementation Plan:** Sprint 1C mensyaratkan beberapa kali revisi *Implementation Plan* yang sangat presisi (mengalihkan *global* ke *named middleware* serta merapikan rute *whitelist* login/logout di backend) sebelum dieksekusi.

## Lessons Learned
- **Ketegasan Konteks Ekosistem:** *Workflow Agentic AI* sangat tangkas (agile) tetapi amat bergantung pada kejelasan informasi versi ekosistem sejak awal (misal penegasan versi Nuxt UI v4 di aturan *prompt*).
- **Pendekatan Deklaratif:** Merevisi arsitektur di level *planning artifact* secara iteratif sebelum mengeksekusinya di kodingan terbukti meminimalkan timbulnya *tech-debt* tak terduga.
- **Pragmatisme Visual:** Mengkombinasikan keunggulan struktur library UI (*Card*, *Form*, *Button*) dengan kebebasan utilitas elemen native HTML (*Input*) merupakan kompromi paling efisien dalam meracik desain premium *custom*.

## Technical Debt
- Halaman Dasbor Admin (`/admin/index.vue`) saat ini hanya berupa kerangka kasar *placeholder* yang belum memiliki tata letak sebenarnya (*Sidebar*, *Header*).
- Belum ada struktur *handler* kesalahan (Global Error Page) spesifik apabila ada akses rute tersesat (*404*) yang diakses dari dalam ruang lingkup administrator.

## Sprint 1 Outcome
Secara keseluruhan, **Sprint 1 dinyatakan Selesai**. Fondasi otentikasi telah tervalidasi secara komprehensif *end-to-end* (Basis Data → API Server → Klien → UI). Arsitektur keamanan ini beroperasi sangat kokoh dan kini secara penuh siap dijadikan landasan bagi eksekusi **Sprint 2 (Layout & Dashboard Core)**.
