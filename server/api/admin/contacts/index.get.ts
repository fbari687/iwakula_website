import { contactRepository } from '~~/server/repositories/contactRepository'

export default defineEventHandler(async () => {
  try {
    const data = await contactRepository.getAll()
    return {
      success: true,
      message: 'Berhasil mengambil daftar kontak',
      data
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal mengambil data kontak.'
    })
  }
})
