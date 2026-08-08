import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

async function seed() {
  console.log("🌱 Memulai proses seeding database Iwakula...");

  // 1. Inisialisasi Koneksi Langsung untuk Script Seeder
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
  });

  const db = drizzle(connection, { schema, mode: "default" });

  try {
    // ----------------------------------------------------
    // A. SEED CONTACTS (Pengaturan Kontak & Sosmed Global)
    // ----------------------------------------------------
    console.log("📦 Seeding contacts...");
    await db.insert(schema.contacts).values([
      {
        name: "WhatsApp Main Admin",
        key: "whatsapp",
        value: "https://wa.me/628119844941",
      },
      {
        name: "Shopee Official Store",
        key: "shopee",
        value: "https://shopee.co.id/iwakula.official",
      },
      {
        name: "Tokopedia Official Store",
        key: "tokopedia",
        value: "https://tokopedia.com/iwakula",
      },
      {
        name: "Instagram Official",
        key: "instagram",
        value: "https://instagram.com/iwakulafood",
      },
      {
        name: "TikTok Official",
        key: "tiktok",
        value: "https://tiktok.com/@iwakulafood",
      },
    ]);

    // ----------------------------------------------------
    // B. SEED CATEGORIES (Kategori Produk)
    // ----------------------------------------------------
    console.log("📦 Seeding categories...");
    await db.insert(schema.categories).values([
      { id: 1, name: "Frozen Food Berkuah", slug: "frozen-food-berkuah", description: "Pempek, Tekwan", image: "/uploads/categories/frozen_food_berkuah.webp" },
      { id: 2, name: "Cemilan", slug: "cemilan", description: "Seafood Eggrolls: Udang dan Rumput Laut", image: "/uploads/categories/camilan.webp" },
      { id: 3, name: "Frozen Food Kukus & Goreng", slug: "frozen-food-kukus-goreng", description: "Siomay Ikan, Dimsum, dan Tahu Baso", image: "/uploads/categories/frozen_food_kukus.webp" },
    ]);

    // ----------------------------------------------------
    // C. SEED STORAGES (Master Tempat Penyimpanan)
    // ----------------------------------------------------
    console.log("📦 Seeding storages...");
    await db.insert(schema.storages).values([
      { id: 1, name: "Freezer (-18°C)", type: "freezer" },
      { id: 2, name: "Chiller (4°C)", type: "chiller" },
      { id: 3, name: "Suhu Ruang (25°C)", type: "room" },
    ]);

    // ----------------------------------------------------
    // D. SEED CREDENTIALS (Master Sertifikasi Resmi)
    // ----------------------------------------------------
    console.log("📦 Seeding credentials...");
    await db.insert(schema.credentials).values([
      {
        id: 1,
        name: "Halal Indonesia",
        type: "halal",
        number: "ID00110000234580721",
        certificateUrl: "/images/certificates/halal-certificate.jpg",
      },
      {
        id: 2,
        name: "BPOM MD Official",
        type: "bpom",
        number: "MD 243210001234",
        certificateUrl: "/images/certificates/bpom-certificate.jpg",
      },
      {
        id: 3,
        name: "P-IRT Official",
        type: "pirt",
        number: "P-IRT 2023271010048-28",
        certificateUrl: "/images/certificates/pirt-certificate.jpg",
      },
      {
        id: 4,
        name: "Sertifikat Kelayakan Pengolahan (SKP)",
        type: "skp",
        number: "SKP-KKP-2024-001",
        certificateUrl: "/images/certificates/skp-certificate.jpg",
      },
    ]);

    // ----------------------------------------------------
    // E. SEED PRODUCTS (Data Produk Detail)
    // ----------------------------------------------------
    console.log("📦 Seeding products...");
    await db.insert(schema.products).values([
      {
        id: 1,
        categoryId: 1, // Frozen Food Berkuah
        name: "Pempek Ikan Tenggiri",
        slug: "pempek-ikan-tenggiri",
        subTitle: "Frozen Food Berkuah • 270 gram",
        price: 65000,
        originalPrice: 75000, // Menghasilkan status diskon otomatis
        mainImage: "/images/products/pempek-tenggiri-main.jpg",
        description: "Nikmati keaslian cita rasa Pempek Palembang dari Iwakula. Dibuat dengan 100% daging ikan Tenggiri pilihan tanpa pengawet.",
        highlights: ["100% Daging Ikan Tenggiri Pilihan", "Tanpa Bahan Pengawet & Pewarna", "Cuko Autentik Gula Aren Asli", "Kemasan Vacuum Food Grade"],
        servingSteps: [
          {
            title: "Thawing",
            desc: "Thawing di suhu ruang hingga tidak beku.",
          },
          {
            title: "Goreng / Kukus",
            desc: "Goreng dengan api sedang hingga kuning keemasan, atau kukus selama 5-8 menit.",
          },
        ],
        servingTip: "Saran: Sajikan selagi hangat dengan Cuko asli Iwakula.",
        composition: ["Daging Ikan Tenggiri Segar", "Tepung Tapioka Premium", "Telur Ayam", "Garam & Bumbu Rempah"],
        allergenWarning: "Mengandung ikan dan telur",
        shopeeUrl: "https://shopee.co.id/pempek-tenggiri-iwakula",
        tokopediaUrl: "https://tokopedia.com/iwakula/pempek-tenggiri",
      },
      {
        id: 2,
        categoryId: 2, // Cemilan
        name: "Eggroll Udang",
        slug: "eggroll-udang",
        subTitle: "Cemilan • 75 gram",
        price: 27000,
        originalPrice: 35000,
        mainImage: "/images/products/eggroll-udang-main.jpg",
        description: "Eggroll krispi dengan isian daging udang segar pilihan yang gurih dan renyah.",
        highlights: ["Daging Udang Olahan Segar", "Tekstur Renyah & Gurih"],
        servingSteps: [
          {
            title: "Siap Santap",
            desc: "Dapat langsung dinikmati sebagai cemilan keluarga.",
          },
        ],
        servingTip: "Simpan di wadah kedap udara setelah dibuka.",
        composition: ["Daging Udang", "Tepung Terigu", "Telur", "Bumbu Halus"],
        allergenWarning: "Mengandung udang dan telur",
        shopeeUrl: "https://shopee.co.id/eggroll-udang-iwakula",
        tokopediaUrl: "https://tokopedia.com/iwakula/eggroll-udang",
      },
    ]);

    // ----------------------------------------------------
    // F. SEED PRODUCT IMAGES (Galeri Foto Tambahan)
    // ----------------------------------------------------
    console.log("📦 Seeding product_images...");
    await db.insert(schema.productImages).values([
      { productId: 1, imageUrl: "/images/products/pempek-detail-1.jpg" },
      { productId: 1, imageUrl: "/images/products/pempek-detail-2.jpg" },
      { productId: 1, imageUrl: "/images/products/pempek-detail-video-thumb.jpg" },
    ]);

    // ----------------------------------------------------
    // G. SEED PRODUCT STORAGES (Panduan Durasi Penyimpanan)
    // ----------------------------------------------------
    console.log("📦 Seeding product_storages...");
    await db.insert(schema.productStorages).values([
      { productId: 1, storageId: 1, duration: "6 Bulan" }, // Pempek di Freezer
      { productId: 1, storageId: 2, duration: "3 Hari" }, // Pempek di Chiller
      { productId: 2, storageId: 3, duration: "3 Bulan" }, // Eggroll di Suhu Ruang
    ]);

    // ----------------------------------------------------
    // H. SEED PRODUCT CREDENTIALS (Relasi Sertifikasi Produk)
    // ----------------------------------------------------
    console.log("📦 Seeding product_credentials...");
    await db.insert(schema.productCredentials).values([
      { productId: 1, credentialId: 1 }, // Pempek -> Halal
      { productId: 1, credentialId: 2 }, // Pempek -> BPOM MD
      { productId: 1, credentialId: 3 }, // Pempek -> P-IRT
      { productId: 1, credentialId: 4 }, // Pempek -> SKP
      { productId: 2, credentialId: 1 }, // Eggroll -> Halal
      { productId: 2, credentialId: 3 }, // Eggroll -> P-IRT
    ]);

    console.log("✅ Seeding selesai dengan sukses!");
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat seeding:", error);
  } finally {
    await connection.end();
  }
}

seed();
