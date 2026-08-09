# Aturan Operasional Implementasi CMS (AI Agent Rules)

Dokumen ini berisi batasan operasional mutlak (*hard rules*) yang **wajib dipatuhi oleh AI (Agent)** ketika mengeksekusi setiap *sprint* CMS pada proyek Iwakula.

1. **Batasan Skala Sprint:** Ubah atau buat **maksimal 10 file** per *sprint*. Jangan melebihi batas ini agar *review* tetap mudah.
2. **Isolasi Publik:** **Dilarang** mengubah kode pada *frontend* publik (Pages, UI, Composable Publik) kecuali ada instruksi eksplisit.
3. **Namespace API:** Semua *endpoint* yang berhubungan dengan Admin CMS **wajib** diletakkan di dalam folder `server/api/admin/`.
4. **Pola Repository:** Semua interaksi database untuk fitur Admin CMS wajib dipusatkan melalui file repository di `server/repositories/`. Endpoint publik juga harus menggunakan repository ketika repository untuk entitas tersebut sudah tersedia.
5. **Integritas Database:** **Dilarang** memodifikasi `server/database/schema.ts` secara sepihak tanpa persetujuan. Setiap perubahan skema wajib diikuti dengan migrasi baru.
6. **Laporan Pasca-Implementasi:** **Selalu tampilkan** daftar lengkap (*list*) file apa saja yang telah berhasil diubah/dibuat di akhir setiap *sprint*.
7. **Tindakan Destruktif:** **Dilarang** menjalankan *command terminal* yang bersifat destruktif (contoh: `drop`, `delete`, `force push`) tanpa konfirmasi eksplisit dari pengguna.
8. **Standar Komponen UI:** **Wajib** menggunakan library **Nuxt UI** untuk merakit antarmuka halaman CMS (hindari membuat komponen murni dari nol jika Nuxt UI sudah menyediakannya).
9. **Konsistensi Desain:** Desain CMS **harus** mempertahankan konsistensi palet warna, tipografi, dan responsivitas (*mobile-friendly*) selaras dengan desain *frontend* publik.
10. **Anti-Ambiguitas:** **Hentikan** implementasi saat itu juga dan ajukan pertanyaan kepada pengguna jika menemukan ambiguitas arsitektur, instruksi yang saling bentrok, atau risiko keamanan (*blocker*).
11. **Migration Safety:** Setiap perubahan yang memerlukan migrasi database harus terlebih dahulu dijelaskan dampaknya terhadap data yang sudah ada, lalu menghasilkan file migrasi baru. Tidak boleh mengedit file migrasi lama yang sudah pernah dijalankan.
12. **Incremental Implementation:** Implementasi harus dilakukan secara bertahap sesuai urutan task pada sprint. Setelah setiap tahap selesai, lakukan verifikasi bahwa aplikasi masih dapat dijalankan sebelum melanjutkan ke tahap berikutnya.
