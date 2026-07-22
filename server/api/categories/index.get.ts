export default defineEventHandler(async (event) => {
  try {
    const categories = await db.query.categories.findMany({
      orderBy: (categories, { asc }) => [asc(categories.name)],
    });

    return {
      success: true,
      message: "Berhasil mengambil daftar kategori",
      data: categories,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengambil data kategori dari server",
    });
  }
});
