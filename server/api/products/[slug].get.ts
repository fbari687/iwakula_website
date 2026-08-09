import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug produk wajib diisi",
    });
  }

  try {
    const product = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.slug, slug),
      with: {
        category: true, // Ambil info kategori (name, slug, image, description)
        images: true, // Ambil galeri gambar produk dari tabel product_images
      },
    });

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: "Produk tidak ditemukan",
      });
    }

    return {
      success: true,
      message: "Berhasil mengambil detail produk",
      data: product,
    };
  } catch (error: any) {
    if (error.statusCode === 404) throw error;

    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengambil detail produk dari server",
    });
  }
});
