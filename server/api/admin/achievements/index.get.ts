import { achievementRepository } from '~~/server/repositories/achievementRepository'

export default defineEventHandler(async () => {
  try {
    const data = await achievementRepository.getAll()
    return {
      success: true,
      message: 'Berhasil mengambil daftar pencapaian',
      data
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal mengambil data pencapaian.'
    })
  }
})
