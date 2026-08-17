import { dineInRepository } from '~~/server/repositories/dineInRepository'
import { deletePublicFile } from '~~/server/utils/fileStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '0')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'ID menu kedai tidak valid' })
    }

    const existing = await dineInRepository.getById(id)
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Gambar menu kedai tidak ditemukan' })
    }

    await dineInRepository.delete(id)

    // Hapus file gambar fisik dari disk server (/uploads) jika ada
    if (existing.imageUrl) {
      await deletePublicFile(existing.imageUrl)
    }

    return {
      success: true,
      message: 'Berhasil menghapus gambar menu kedai',
      data: { id }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Gagal menghapus gambar menu kedai',
    })
  }
})
