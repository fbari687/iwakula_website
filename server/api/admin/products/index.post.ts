import { productRepository } from '~~/server/repositories/productRepository'
import { productCreateSchema } from '~~/server/validators/product'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = productCreateSchema.parse(body)
    
    // Auto-generate unique slug
    const finalSlug = await generateUniqueSlug('products', data.name)

    const newId = await productRepository.create({
      ...data,
      slug: finalSlug
    })

    return {
      success: true,
      message: 'Produk berhasil dibuat',
      data: { id: newId }
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: Validasi data gagal.', data: error.errors })
    }
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error: Gagal menyimpan data produk.' })
  }
})
