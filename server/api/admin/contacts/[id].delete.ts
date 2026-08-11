import { contactRepository } from '~~/server/repositories/contactRepository'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    const existing = await contactRepository.getById(id)
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Not Found: Kontak tidak ditemukan.' })
    }

    if (existing.key === 'whatsapp' || existing.key === 'email') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: Kontak WhatsApp dan Email adalah kontak utama dan tidak dapat dihapus.'
      })
    }

    await contactRepository.delete(id)

    return {
      success: true,
      message: 'Kontak berhasil dihapus'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal menghapus data kontak.'
    })
  }
})
