import { productRepository } from '~~/server/repositories/productRepository'
import { categoryRepository } from '~~/server/repositories/categoryRepository'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const categorySlug = query.category as string | undefined
    const limit = query.limit ? Number(query.limit) : undefined

    let categoryId: number | undefined
    if (categorySlug) {
      const foundCategory = await categoryRepository.getBySlug(categorySlug)
      if (!foundCategory) {
        return { success: true, message: "Kategori tidak ditemukan", data: [] }
      }
      categoryId = foundCategory.id
    }

    const products = await productRepository.getAll({ categoryId, limit })

    return {
      success: true,
      message: "Berhasil mengambil daftar produk",
      data: products,
    }
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: "Gagal mengambil data produk dari server" })
  }
})
