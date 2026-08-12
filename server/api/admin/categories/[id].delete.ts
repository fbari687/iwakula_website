import { categoryRepository } from '~~/server/repositories/categoryRepository'
import { deletePublicFile } from '~~/server/utils/fileStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    const existingCategory = await categoryRepository.getById(id)
    
    // Eksekusi penghapusan berbasis transaksi (akan memvalidasi 404 & 409 productCount)
    await categoryRepository.delete(id)

    // Hapus file gambar dari /uploads hanya jika penghapusan di database berhasil
    if (existingCategory && existingCategory.image) {
      await deletePublicFile(existingCategory.image)
    }

    return {
      success: true,
      message: 'Kategori berhasil dihapus'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal menghapus data kategori.'
    })
  }
})
