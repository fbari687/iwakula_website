import { dineInRepository } from '~~/server/repositories/dineInRepository'

export default defineEventHandler(async () => {
  try {
    const list = await dineInRepository.getAll()
    return {
      success: true,
      message: 'Berhasil mengambil daftar gambar menu kedai',
      data: list
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Gagal mengambil data menu kedai dari server',
    })
  }
})
