import { dineInRepository } from '~~/server/repositories/dineInRepository'
import { deletePublicFile } from '~~/server/utils/fileStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '0')
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'ID menu kedai tidak valid' })
    }

    const body = await readBody(event)
    const existing = await dineInRepository.getById(id)
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Gambar menu kedai tidak ditemukan' })
    }

    await dineInRepository.update(id, {
      imageUrl: body.imageUrl,
      displayOrder: body.displayOrder !== undefined ? parseInt(body.displayOrder) : undefined,
    })

    // Hapus file gambar lama jika gambar diubah ke file baru
    if (body.imageUrl && existing.imageUrl && body.imageUrl !== existing.imageUrl) {
      await deletePublicFile(existing.imageUrl)
    }

    return {
      success: true,
      message: 'Berhasil memperbarui data menu kedai',
      data: { id }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Gagal memperbarui data menu kedai',
    })
  }
})
