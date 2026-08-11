import { contactRepository } from '~~/server/repositories/contactRepository'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    const data = await contactRepository.getById(id)
    if (!data) {
      throw createError({ statusCode: 404, statusMessage: 'Not Found: Kontak tidak ditemukan.' })
    }

    return {
      success: true,
      message: 'Berhasil mengambil detail kontak',
      data
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal mengambil data kontak.'
    })
  }
})
