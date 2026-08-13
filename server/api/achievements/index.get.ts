import { achievementRepository } from '~~/server/repositories/achievementRepository'

export default defineEventHandler(async (event) => {
  try {
    const locale = getHeaderOrQueryLocale(event)
    const data = await achievementRepository.getAll({ locale })

    return {
      success: true,
      message: 'Berhasil mengambil data pencapaian',
      data
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal mengambil data pencapaian dari server'
    })
  }
})
