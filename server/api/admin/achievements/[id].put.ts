import { achievementRepository } from '~~/server/repositories/achievementRepository'
import { achievementUpdateSchema } from '~~/server/validators/achievement'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    const body = await readBody(event)
    
    // Validasi Zod
    const data = achievementUpdateSchema.parse(body)

    // Periksa eksistensi
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

    // Buang properti undefined agar Drizzle tidak mereset nilai terisi
    Object.keys(payloadToUpdate).forEach(key => {
      if ((payloadToUpdate as any)[key] === undefined) {
        delete (payloadToUpdate as any)[key]
      }
    })

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
