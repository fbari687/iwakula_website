import { achievementRepository } from '~~/server/repositories/achievementRepository'
import { achievementCreateSchema } from '~~/server/validators/achievement'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validasi Zod
    const data = achievementCreateSchema.parse(body)

    const newId = await achievementRepository.create({
      badge: data.badge,
      badgeEn: data.badgeEn || null,
      title: data.title,
      titleEn: data.titleEn || null,
      description: data.description,
      descriptionEn: data.descriptionEn || null,
      image: data.image
    })

    return {
      success: true,
      message: 'Pencapaian berhasil dibuat',
      data: { id: newId }
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
      statusMessage: 'Internal Server Error: Gagal menyimpan data pencapaian.'
    })
  }
})
