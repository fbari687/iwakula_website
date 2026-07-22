import fs from "node:fs/promises";
import path from "node:path";

/**
 * Menyimpan file yang diunggah ke dalam direktori public/uploads/
 * @param fileData Buffer atau data file mentah
 * @param originalName Nama asli file dari client
 * @param subFolder Sub-folder tujuan (contoh: 'products' atau 'certificates')
 * @returns Path relatif URL yang siap disimpan ke MySQL (contoh: '/uploads/products/1721558400000-foto.jpg')
 */
export async function savePublicFile(fileData: Buffer, originalName: string, subFolder: "products" | "certificates" = "products"): Promise<string> {
  // Menentukan path folder tujuan di dalam direktori public/
  const targetDir = path.join(process.cwd(), "public", "uploads", subFolder);

  // Buat direktori secara otomatis jika foldernya belum ada
  await fs.mkdir(targetDir, { recursive: true });

  // Buat nama file yang unik menggunakan timestamp
  const fileExtension = path.extname(originalName);
  const sanitizedBaseName = path
    .basename(originalName, fileExtension)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");

  const uniqueFileName = `${Date.now()}-${sanitizedBaseName}${fileExtension}`;
  const absolutePath = path.join(targetDir, uniqueFileName);

  // Tulis file ke sistem disk hosting
  await fs.writeFile(absolutePath, fileData);

  // Kembalikan URL publik relatif untuk disimpan ke DB
  return `/uploads/${subFolder}/${uniqueFileName}`;
}

/**
 * Menghapus file fisik dari direktori public/
 * @param relativeUrl Path relatif file dari database (contoh: '/uploads/products/1721558400000-foto.jpg')
 */
export async function deletePublicFile(relativeUrl: string): Promise<boolean> {
  if (!relativeUrl || !relativeUrl.startsWith("/uploads/")) {
    return false; // Kalau filenya bukan di folder uploads bakal diabaikan
  }

  // Konversi relative URL menjadi path absolut di server disk
  const absolutePath = path.join(process.cwd(), "public", relativeUrl);

  try {
    // Cek ketersediaan file lalu hapus
    await fs.access(absolutePath);
    await fs.unlink(absolutePath);
    return true;
  } catch (error) {
    console.warn(`File tidak ditemukan saat akan dihapus: ${absolutePath}`);
    return false;
  }
}
