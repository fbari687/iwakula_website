export default defineEventHandler(async (event) => {
  try {
    const products = await db.query.products.findMany({
      with: {
        category: true,
      },
      orderBy: (products, { desc }) => [desc(products.createdAt)],
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
