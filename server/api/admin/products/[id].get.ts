import { productRepository } from '~~/server/repositories/productRepository'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '0')
    if (!id) throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })

    const product = await productRepository.getById(id)
    if (!product) throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan' })

    return {
      success: true,
      message: 'Berhasil mengambil data produk',
      data: product
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengambil data produk' })
  }
})
