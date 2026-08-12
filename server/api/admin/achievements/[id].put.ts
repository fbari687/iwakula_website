import { achievementRepository } from '~~/server/repositories/achievementRepository'
import { achievementUpdateSchema } from '~~/server/validators/achievement'
import { deletePublicFile } from '~~/server/utils/fileStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    const body = await readBody(event)
    
    const data = achievementUpdateSchema.parse(body)

    const existing = await achievementRepository.getById(id)
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Not Found: Pencapaian tidak ditemukan.' })
    }

    const payloadToUpdate = {
      badge: data.badge,
      title: data.title,
      description: data.description,
      image: data.image
    }

    Object.keys(payloadToUpdate).forEach(key => {
      if ((payloadToUpdate as any)[key] === undefined) {
        delete (payloadToUpdate as any)[key]
      }
    })

    // Jika gambar diperbarui dengan file baru, hapus berkas gambar lama dari /uploads
    if (data.image && data.image !== existing.image && existing.image) {
      await deletePublicFile(existing.image)
    }

    await achievementRepository.update(id, payloadToUpdate)

    return {
      success: true,
      message: 'Pencapaian berhasil diperbarui'
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: Validasi data gagal.',
        data: error.errors
      })
    }
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal memutakhirkan data pencapaian.'
    })
  }
})
