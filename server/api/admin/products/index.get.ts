import { productRepository } from '~~/server/repositories/productRepository'

export default defineEventHandler(async (event) => {
  try {
    const products = await productRepository.getAll()
    return {
      success: true,
      message: 'Berhasil mengambil daftar produk',
      data: products
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal mengambil data produk dari server'
    })
  }
})
