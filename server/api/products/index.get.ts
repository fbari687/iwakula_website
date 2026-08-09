import { eq } from "drizzle-orm";
import { db } from "~~/server/utils/db";

export default defineEventHandler(async (event) => {
  try {
    // 1. Ambil Query Parameters dari URL (misal: /api/products?category=cemilan&limit=6)
    const query = getQuery(event);
    const categorySlug = query.category as string | undefined;
    const limit = query.limit ? Number(query.limit) : undefined;

    // 2. Jika ada filter category, cari ID kategorinya terlebih dahulu
    let categoryId: number | undefined;
    if (categorySlug) {
      const foundCategory = await db.query.categories.findFirst({
        where: (categories, { eq }) => eq(categories.slug, categorySlug),
      });

      // Jika kategori yang dicari tidak ada di DB, langsung kembalikan array kosong
      if (!foundCategory) {
        return {
          success: true,
          message: "Kategori tidak ditemukan",
          data: [],
        };
      }

      categoryId = foundCategory.id;
    }

    // 3. Query Produk dengan Drizzle Relational Query
    const products = await db.query.products.findMany({
      where: categoryId ? (products, { eq }) => eq(products.categoryId, categoryId) : undefined,
      with: {
        category: true, // Otomatis mengambil id, name, slug, image, description
      },
      orderBy: (products, { desc }) => [desc(products.createdAt)],
      limit: limit, // Untuk membatasi jumlah produk (misal di Beranda)
    });

    return {
      success: true,
      message: "Berhasil mengambil daftar produk",
      data: products,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengambil data produk dari server",
    });
  }
});
