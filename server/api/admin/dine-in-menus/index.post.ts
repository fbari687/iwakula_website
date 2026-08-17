import { dineInRepository } from '~~/server/repositories/dineInRepository'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.imageUrl) {
      throw createError({
        statusCode: 400,
        statusMessage: 'URL/File gambar menu kedai wajib diisi',
      })
    }

    const id = await dineInRepository.create({
      imageUrl: body.imageUrl,
      displayOrder: body.displayOrder !== undefined ? parseInt(body.displayOrder) : 0,
    })

    return {
      success: true,
      message: 'Berhasil menambahkan gambar menu kedai baru',
      data: { id }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Gagal menambahkan gambar menu kedai',
    })
  }
})
