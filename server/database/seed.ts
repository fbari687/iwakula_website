import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

async function seed() {
  console.log("🌱 Memulai proses seeding database Iwakula...");

  // 1. Inisialisasi Koneksi
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
        key: "whatsapp",
        value: "628119844941",
        icon: "i-ic-baseline-whatsapp",
      },
      {
        key: "email",
        value: "iwakulafood@gmail.com",
        icon: "i-ic-baseline-email",
      },
      {
        key: "instagram",
        value: "iwakulafood",
        icon: "i-mdi-instagram",
      },
      {
        key: "tiktok",
        value: "@iwakulafood",
        icon: "i-ic-baseline-tiktok",
      },
    ]);

    // ----------------------------------------------------
    // B. SEED CATEGORIES (Kategori Produk)
    // ----------------------------------------------------
    console.log("📦 Seeding categories...");
    await db.insert(schema.categories).values([
      {
        id: 1,
        name: "Frozen Food Berkuah",
        slug: "frozen-food-berkuah",
        description: "Aneka olahan ikan tenggiri gurih yang disajikan lengkap dengan kuah/cuko khas Iwakula.",
        image: "/uploads/categories/frozen_food_berkuah.webp",
      },
      {
        id: 2,
        name: "Cemilan",
        slug: "cemilan",
        description: "Seafood Eggrolls renyah isi udang dan rumput laut, cocok untuk teman santai keluarga.",
        image: "/uploads/categories/camilan.webp",
      },
      {
        id: 3,
        name: "Frozen Food Kukus & Goreng",
        slug: "frozen-food-kukus-goreng",
        description: "Sajian siomay ikan, dimsum, dan tahu baso berkualitas tinggi yang praktis tinggal kukus atau goreng.",
        image: "/uploads/categories/frozen_food_kukus.webp",
      },
    ]);

    // ----------------------------------------------------
    // C. SEED ACHIEVEMENTS (Data Penghargaan)
    // ----------------------------------------------------

    console.log("📦 Seeding achievements...");
    await db.insert(schema.achievements).values([
      {
        id: 1,
        badge: "Penghargaan 2024",
        title: "Top 350 UMKM PFpreneur",
        description: "Iwakula terpilih sebagai bagian dari Top 350 UMKM dalam program PFpreneur 2024, menyeleksi lebih dari 13.000 pendaftar di bawah naungan Pertamina Foundation.",
        image: "/images/sertif.png",
      },
    ]);

    // ----------------------------------------------------
    // D. SEED PRODUCTS (Data Produk)
    // ----------------------------------------------------
    console.log("📦 Seeding products...");
    await db.insert(schema.products).values([
      {
        id: 1,
        categoryId: 1, // Frozen Food Berkuah
        name: "Pempek Ikan Tenggiri",
        slug: "pempek-ikan-tenggiri",
        subTitle: "270 gram",
        price: 65000,
        originalPrice: 75000,
        mainImage: "/uploads/products/pempek.webp",
        description:
          "Terbuat dari ikan tenggiri segar dan diolah dengan bahan-bahan pilihan, rasa gurih ikannya sangat terasa, disajikan dengan saus cuko dengan perpaduan rasa manis, asam, asin dan pedas. Pempek merupakan makanan khas Palembang yang popular dan banyak di gemari masyarakat.",
        highlights: ["100% Daging Ikan Tenggiri", "Tanpa Bahan Pengawet & Pewarna", "Cuko Autentik Gula Aren Asli", "Kemasan Vacuum Food Grade Higienis"],
        shopeeUrl: null,
        tokopediaUrl: "https://www.tokopedia.com/iwakula-olahan-ikan",
      },
      {
        id: 2,
        categoryId: 2, // Cemilan
        name: "Eggroll Udang",
        slug: "eggroll-udang",
        subTitle: "75 gram",
        price: 27000,
        originalPrice: 35000,
        mainImage: "/images/eggroll_udang.webp",
        description:
          "Eggroll adalah camilan kekinian yang bergizi, Terbuat dari bahan - bahan pilihan dengan kearifan local. Dengan penambahan udang menjadikan eggroll lwakula high protein dibandingkan dengan eggroll komersial biasa. Memiliki cita rasa yang enak dan special, teksturnya renyah, diproses dengan cara digulung dan dipanggang.",
        highlights: ["Daging Udang Olahan Segar Pilihan", "Tekstur Renyah & Gurih Alami", "Praktis Siap Santap"],
        shopeeUrl: null,
        tokopediaUrl: "https://www.tokopedia.com/iwakula-olahan-ikan",
      },
      {
        id: 3,
        categoryId: 3, // Frozen Food Kukus
        name: "Siomay Ikan Tenggiri",
        slug: "siomay-ikan-tenggiri",
        subTitle: "400 gram",
        price: 40000,
        originalPrice: 50000,
        mainImage: "/uploads/products/siomay.webp",
        description:
          "Terbuat dari daging ikan tenggiri dicampur dengan tepung tapioka dan bahan - bahan pilihan lainnya, rasanya enak dengan tekstur empuk dan lembut , dibalut dengan kulit dpangsit dan disajikan dengan bumbu kacang yang nikmat.",
        highlights: ["100% Daging Ikan Tenggiri", "Tanpa Bahan Pengawet & Pewarna"],
        shopeeUrl: null,
        tokopediaUrl: "https://www.tokopedia.com/iwakula-olahan-ikan",
      },
    ]);

    // ----------------------------------------------------
    // D. SEED PRODUCT IMAGES (Galeri Foto Tambahan)
    // ----------------------------------------------------
    console.log("📦 Seeding product_images...");
    await db.insert(schema.productImages).values([
      { productId: 1, imageUrl: "/uploads/products/pempek2.webp" },
      { productId: 1, imageUrl: "/uploads/products/pempek3.webp" },
      { productId: 2, imageUrl: "/uploads/products/eggroll_udang2.webp" },
      { productId: 3, imageUrl: "/uploads/products/siomay2.webp" },
      { productId: 3, imageUrl: "/uploads/products/siomay3.webp" },
    ]);

    console.log("✅ Seeding selesai dengan sukses!");
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat seeding:", error);
  } finally {
    await connection.end();
  }
}

seed();
