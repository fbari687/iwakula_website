import { categoryRepository } from '~~/server/repositories/categoryRepository'

export default defineEventHandler(async () => {
  try {
    const data = await categoryRepository.getAll()
    return {
      success: true,
      message: 'Berhasil mengambil daftar kategori (Admin)',
      data
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal mengambil data kategori dari server'
    })
  }
})
