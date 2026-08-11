import { contactRepository } from '~~/server/repositories/contactRepository'
import { contactCreateSchema } from '~~/server/validators/contact'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validasi Zod
    const data = contactCreateSchema.parse(body)

    // Periksa keunikan key kontak
    const existing = await contactRepository.getByKey(data.key.toLowerCase().trim())
    if (existing) {
      throw createError({
        statusCode: 409,
        statusMessage: `Conflict: Kontak dengan key '${data.key}' sudah ada.`
      })
    }

    const newId = await contactRepository.create({
      key: data.key.toLowerCase().trim(),
      value: data.value,
      icon: data.icon || null
    })

    return {
      success: true,
      message: 'Kontak berhasil dibuat',
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
      statusMessage: 'Internal Server Error: Gagal menyimpan data kontak.'
    })
  }
})
