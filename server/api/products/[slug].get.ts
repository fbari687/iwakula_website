import { productRepository } from '~~/server/repositories/productRepository'

export default defineEventHandler(async (event) => {
  try {
    const locale = getHeaderOrQueryLocale(event)
    const slug = event.context.params?.slug
    if (!slug) throw createError({ statusCode: 400, statusMessage: 'Slug tidak valid' })

    const product = await productRepository.getBySlug(slug, { locale })
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
