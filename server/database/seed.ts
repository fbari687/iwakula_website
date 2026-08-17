import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";
import { hashPassword } from "../utils/auth";

async function seed() {
  console.log("🌱 Memulai proses seeding database Iwakula...");

  // 1. Inisialisasi Koneksi
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
  });

  const db = drizzle(connection, { schema, mode: "default" });

  try {
    // ----------------------------------------------------
    // A0. SEED ADMIN USER
    // ----------------------------------------------------
    console.log("📦 Seeding admin user...");
    try {
      const adminPassword = process.env.ADMIN_PASSWORD || "rahasia";
      const hashedPassword = await hashPassword(adminPassword);
      
      await db.insert(schema.users).values([{
        name: "Super Admin",
        email: "admin@iwakula.com",
        password: hashedPassword
      }]);
    } catch (e: any) {
      console.log("⚠️ Admin user sudah ada, melewati...");
    }

    // ----------------------------------------------------
    // A. SEED CONTACTS (Pengaturan Kontak & Sosmed Global)
    // ----------------------------------------------------
    console.log("📦 Seeding contacts...");
    try {
      await db.insert(schema.contacts).values([
        { key: "whatsapp", value: "628119844941", icon: "i-ic-baseline-whatsapp" },
        { key: "email", value: "iwakulafood@gmail.com", icon: "i-ic-baseline-email" },
        { key: "instagram", value: "iwakulafood", icon: "i-mdi-instagram" },
        { key: "tiktok", value: "@iwakulafood", icon: "i-ic-baseline-tiktok" },
      ]);
    } catch (e: any) {
      console.log("⚠️ Contacts sudah ada, melewati...");
    }

    // ----------------------------------------------------
    // B. SEED CATEGORIES (Kategori Produk)
    // ----------------------------------------------------
    console.log("📦 Seeding categories...");
    try {
      await db.insert(schema.categories).values([
        { id: 1, name: "Frozen Food Berkuah", slug: "frozen-food-berkuah", description: "Aneka olahan ikan tenggiri gurih yang disajikan lengkap dengan kuah/cuko khas Iwakula.", image: "/uploads/categories/frozen_food_berkuah.webp" },
        { id: 2, name: "Cemilan", slug: "cemilan", description: "Seafood Eggrolls renyah isi udang dan rumput laut, cocok untuk teman santai keluarga.", image: "/uploads/categories/camilan.webp" },
        { id: 3, name: "Frozen Food Kukus & Goreng", slug: "frozen-food-kukus-goreng", description: "Sajian siomay ikan, dimsum, dan tahu baso berkualitas tinggi yang praktis tinggal kukus atau goreng.", image: "/uploads/categories/frozen_food_kukus.webp" },
      ]);
    } catch (e: any) {
      console.log("⚠️ Categories sudah ada, melewati...");
    }

    // ----------------------------------------------------
    // C. SEED ACHIEVEMENTS (Data Penghargaan)
    // ----------------------------------------------------
    console.log("📦 Seeding achievements...");
    try {
      await db.insert(schema.achievements).values([
        { id: 1, badge: "Penghargaan 2024", title: "Top 350 UMKM PFpreneur", description: "Iwakula terpilih sebagai bagian dari Top 350 UMKM dalam program PFpreneur 2024, menyeleksi lebih dari 13.000 pendaftar di bawah naungan Pertamina Foundation.", image: "/images/sertif.png" },
      ]);
    } catch (e: any) {
      console.log("⚠️ Achievements sudah ada, melewati...");
    }

    // ----------------------------------------------------
    // D. SEED PRODUCTS & PRODUCT IMAGES
    // ----------------------------------------------------
    console.log("📦 Seeding products...");
    try {
      await db.insert(schema.products).values([
        { id: 1, categoryId: 1, name: "Pempek Ikan Tenggiri", slug: "pempek-ikan-tenggiri", subTitle: "270 gram", price: 65000, originalPrice: 75000, mainImage: "/uploads/products/pempek.webp", description: "Terbuat dari ikan tenggiri segar...", highlights: ["100% Daging Ikan Tenggiri"], shopeeUrl: null, tokopediaUrl: "https://www.tokopedia.com/iwakula-olahan-ikan" },
        { id: 2, categoryId: 2, name: "Eggroll Udang", slug: "eggroll-udang", subTitle: "75 gram", price: 27000, originalPrice: 35000, mainImage: "/images/eggroll_udang.webp", description: "Eggroll adalah camilan kekinian...", highlights: ["Daging Udang Olahan Segar Pilihan"], shopeeUrl: null, tokopediaUrl: "https://www.tokopedia.com/iwakula-olahan-ikan" },
        { id: 3, categoryId: 3, name: "Siomay Ikan Tenggiri", slug: "siomay-ikan-tenggiri", subTitle: "400 gram", price: 40000, originalPrice: 50000, mainImage: "/uploads/products/siomay.webp", description: "Terbuat dari daging ikan tenggiri...", highlights: ["100% Daging Ikan Tenggiri"], shopeeUrl: null, tokopediaUrl: "https://www.tokopedia.com/iwakula-olahan-ikan" },
      ]);
      await db.insert(schema.productImages).values([
        { productId: 1, imageUrl: "/uploads/products/pempek2.webp", displayOrder: 0 },
        { productId: 1, imageUrl: "/uploads/products/pempek3.webp", displayOrder: 1 },
        { productId: 2, imageUrl: "/uploads/products/eggroll_udang2.webp", displayOrder: 0 },
        { productId: 3, imageUrl: "/uploads/products/siomay2.webp", displayOrder: 0 },
        { productId: 3, imageUrl: "/uploads/products/siomay3.webp", displayOrder: 1 },
      ]);
    } catch (e: any) {
      console.log("⚠️ Products sudah ada, melewati...");
    }

    // ----------------------------------------------------
    // E. SEED DINE IN MENU IMAGES (Gambar Menu Kedai)
    // ----------------------------------------------------
    console.log("📦 Seeding dine_in_menu_images...");
    try {
      await db.insert(schema.dineInMenuImages).values([
        { imageUrl: "/uploads/menu.webp", displayOrder: 0 },
      ]);
      console.log("✅ Berhasil menambahkan seed dine_in_menu_images!");
    } catch (e: any) {
      console.log("⚠️ Dine in menu images sudah ada, melewati...");
    }

    console.log("✅ Seeding selesai dengan sukses!");

    console.log("✅ Seeding selesai dengan sukses!");
  } catch (error) {
    console.error("❌ Terjadi kesalahan saat seeding:", error);
  } finally {
    await connection.end();
  }
}

seed();
