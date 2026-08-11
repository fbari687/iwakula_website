import { contactRepository } from '~~/server/repositories/contactRepository'
import { contactUpdateSchema } from '~~/server/validators/contact'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id as string)
    if (isNaN(id)) {
      throw createError({ statusCode: 400, statusMessage: 'Bad Request: ID tidak valid.' })
    }

    const body = await readBody(event)
    
    // Validasi Zod
    const data = contactUpdateSchema.parse(body)

    // Periksa eksistensi
    const existing = await contactRepository.getById(id)
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Not Found: Kontak tidak ditemukan.' })
    }

    // Jika key diubah, pastikan tidak konflik dengan kontak lain
    if (data.key && data.key.toLowerCase().trim() !== existing.key) {
      const conflict = await contactRepository.getByKey(data.key.toLowerCase().trim())
      if (conflict) {
        throw createError({
          statusCode: 409,
          statusMessage: `Conflict: Kontak dengan key '${data.key}' sudah ada.`
        })
      }
    }

    const payloadToUpdate = {
      key: data.key ? data.key.toLowerCase().trim() : undefined,
      value: data.value,
      icon: data.icon !== undefined ? data.icon : undefined
    }

    Object.keys(payloadToUpdate).forEach(key => {
      if ((payloadToUpdate as any)[key] === undefined) {
        delete (payloadToUpdate as any)[key]
      }
    })

    await contactRepository.update(id, payloadToUpdate)

    return {
      success: true,
      message: 'Kontak berhasil diperbarui'
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
      statusMessage: 'Internal Server Error: Gagal memutakhirkan data kontak.'
    })
  }
})
