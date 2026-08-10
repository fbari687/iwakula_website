import { productRepository } from '~~/server/repositories/productRepository'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '0')
    if (!id) throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })

    const existingProduct = await productRepository.getById(id)
    if (!existingProduct) {
      throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan' })
    }

    await productRepository.delete(id)

    return {
      success: true,
      message: 'Produk berhasil dihapus',
      data: { id }
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error: Gagal menghapus data produk.' })
  }
})
