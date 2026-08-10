import { categoryRepository } from '~~/server/repositories/categoryRepository'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    // Validasi keberadaan baris (jika sudah dihapus sebelumnya, beri 404)
    const existingCategory = await categoryRepository.getById(id)
    if (!existingCategory) {
      throw createError({ statusCode: 404, statusMessage: 'Not Found: Kategori tidak ditemukan.' })
    }

    // Eksekusi Hard Delete Policy (menghapus fisik memori selamanya dari MySQL)
    await categoryRepository.delete(id)

    return {
      success: true,
      message: 'Kategori berhasil dihapus secara permanen'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal melenyapkan data kategori.'
    })
  }
})
