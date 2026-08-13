import { categoryRepository } from '~~/server/repositories/categoryRepository'
import { categoryCreateSchema } from '~~/server/validators/category'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validasi Zod
    const data = categoryCreateSchema.parse(body)

    // Buat slug unik secara otomatis dari nama kategori
    const finalSlug = await generateUniqueSlug('categories', data.name)

    const newId = await categoryRepository.create({
      name: data.name,
      nameEn: data.nameEn || null,
      slug: finalSlug,
      image: data.image,
      description: data.description,
      descriptionEn: data.descriptionEn || null
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
