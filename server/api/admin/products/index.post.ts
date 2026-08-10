import { productRepository } from '~~/server/repositories/productRepository'
import { productCreateSchema } from '~~/server/validators/product'

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = productCreateSchema.parse(body)
    
    const finalSlug = data.slug || generateSlug(data.name)
    const existing = await productRepository.getBySlug(finalSlug)
    if (existing) {
      throw createError({ statusCode: 409, statusMessage: 'Conflict: Slug sudah digunakan oleh produk lain.' })
    }

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
