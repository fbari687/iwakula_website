import { productRepository } from '~~/server/repositories/productRepository'
import { productUpdateSchema } from '~~/server/validators/product'

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '0')
    if (!id) throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })

    const body = await readBody(event)
    const data = productUpdateSchema.parse(body)

    const existingProduct = await productRepository.getById(id)
    if (!existingProduct) {
      throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan' })
    }

    let finalSlug = existingProduct.slug
    if (data.slug || data.name) {
      finalSlug = data.slug || generateSlug(data.name || existingProduct.name)
      if (finalSlug !== existingProduct.slug) {
        const existingSlug = await productRepository.getBySlug(finalSlug)
        if (existingSlug) {
          throw createError({ statusCode: 409, statusMessage: 'Conflict: Slug sudah digunakan oleh produk lain.' })
        }
      }
    }

    await productRepository.update(id, {
      ...data,
      slug: finalSlug
    })

    return {
      success: true,
      message: 'Produk berhasil diperbarui',
      data: { id }
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: Validasi data gagal.', data: error.errors })
    }
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error: Gagal memperbarui data produk.' })
  }
})
