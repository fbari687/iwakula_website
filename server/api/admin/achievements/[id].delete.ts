import { achievementRepository } from '~~/server/repositories/achievementRepository'
import { deletePublicFile } from '~~/server/utils/fileStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    const existing = await achievementRepository.getById(id)
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Not Found: Pencapaian tidak ditemukan.' })
    }

    await achievementRepository.delete(id)

    // Hapus file gambar pencapaian dari sistem berkas /uploads jika ada
    if (existing.image) {
      await deletePublicFile(existing.image)
    }

    return {
      success: true,
      message: 'Pencapaian beserta gambarnya berhasil dihapus'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal menghapus data pencapaian.'
    })
  }
})
