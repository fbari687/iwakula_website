import { categoryRepository } from '~~/server/repositories/categoryRepository'
import { categoryCreateSchema } from '~~/server/validators/category'

function generateSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validasi Zod
    const data = categoryCreateSchema.parse(body)

    // SEO-preservation slug policy: Create slug jika tidak disediakan
    const finalSlug = data.slug || generateSlug(data.name)

    // Validasi Uniqueness Slug
    const existing = await categoryRepository.getBySlug(finalSlug)
    if (existing) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Conflict: Slug sudah digunakan oleh kategori lain.'
      })
    }

    const newId = await categoryRepository.create({
      name: data.name,
      slug: finalSlug,
      image: data.image,
      description: data.description
    })

    return {
      success: true,
      message: 'Kategori berhasil dibuat',
      data: { id: newId }
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: Validasi data gagal.',
        data: error.errors
      })
    }
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal menyimpan data kategori.'
    })
  }
})
