import { dineInRepository } from '~~/server/repositories/dineInRepository'

export default defineEventHandler(async () => {
  try {
    const list = await dineInRepository.getAll()

    // Fallback jika database belum terisi seeder
    if (!list || list.length === 0) {
      return {
        success: true,
        message: 'Berhasil mengambil data menu kedai',
        data: [{ id: 1, imageUrl: '/uploads/menu.webp', displayOrder: 0 }]
      }
    }

    return {
      success: true,
      message: 'Berhasil mengambil data menu kedai',
      data: list
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Gagal mengambil data menu kedai dari server',
    })
  }
})
