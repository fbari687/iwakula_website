import { productRepository } from '~~/server/repositories/productRepository'

export default defineEventHandler(async (event) => {
  try {
    const products = await productRepository.getFeatured()
    return {
      success: true,
      message: 'Berhasil mengambil daftar produk unggulan',
      data: products
    }
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengambil data produk unggulan' })
  }
})
