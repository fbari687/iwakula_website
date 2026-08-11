import { productRepository } from '~~/server/repositories/productRepository'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const filters: { categoryId?: number; search?: string } = {}
    if (query.categoryId) filters.categoryId = parseInt(query.categoryId as string)
    if (query.search) filters.search = query.search as string

    const products = await productRepository.getAll(filters)
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
