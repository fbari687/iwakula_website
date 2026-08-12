import { categoryRepository } from '~~/server/repositories/categoryRepository'
import { categoryUpdateSchema } from '~~/server/validators/category'
import { deletePublicFile } from '~~/server/utils/fileStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    const body = await readBody(event)
    
    // Validasi Zod
    const data = categoryUpdateSchema.parse(body)

    // Periksa eksistensi
    const existingCategory = await categoryRepository.getById(id)
    if (!existingCategory) {
      throw createError({ statusCode: 404, statusMessage: 'Not Found: Kategori tidak ditemukan.' })
    }

    // SEO-preservation slug policy
    const finalSlug = data.slug || existingCategory.slug

    if (finalSlug !== existingCategory.slug) {
      const slugConflict = await categoryRepository.getBySlug(finalSlug)
      if (slugConflict) {
        throw createError({ statusCode: 409, statusMessage: 'Conflict: Slug sudah digunakan oleh kategori lain.' })
      }
    }

    const payloadToUpdate = {
      name: data.name,
      slug: finalSlug,
      image: data.image,
      description: data.description
    }

    Object.keys(payloadToUpdate).forEach(key => {
      if ((payloadToUpdate as any)[key] === undefined) {
        delete (payloadToUpdate as any)[key]
      }
    })

    // Jika gambar diperbarui dengan file baru, hapus berkas gambar lama dari /uploads
    if (data.image && data.image !== existingCategory.image && existingCategory.image) {
      await deletePublicFile(existingCategory.image)
    }

    await categoryRepository.update(id, payloadToUpdate)

    return {
      success: true,
      message: 'Kategori berhasil diperbarui'
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
      statusMessage: 'Internal Server Error: Gagal memutakhirkan data kategori.'
    })
  }
})
