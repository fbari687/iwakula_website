import { categoryRepository } from '~~/server/repositories/categoryRepository'

export default defineEventHandler(async (event) => {
  try {
    const locale = getHeaderOrQueryLocale(event);
    const categoriesList = await categoryRepository.getAll({ locale });

    return {
      success: true,
      message: "Berhasil mengambil daftar kategori",
      data: categoriesList,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Gagal mengambil data kategori dari server",
    });
  }
});
