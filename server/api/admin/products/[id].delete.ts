import { productRepository } from '~~/server/repositories/productRepository'
import { deletePublicFile } from '~~/server/utils/fileStorage'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params?.id || '0')
    if (!id) throw createError({ statusCode: 400, statusMessage: 'ID tidak valid' })

    const existingProduct = await productRepository.getById(id)
    if (!existingProduct) {
      throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan' })
    }

    await productRepository.delete(id)

    // Hapus file gambar utama dan galeri tambahan dari sistem berkas /uploads
    const mainImg = existingProduct.mainImage || existingProduct.image
    if (mainImg) {
      await deletePublicFile(mainImg)
    }

    if (existingProduct.extraImages && Array.isArray(existingProduct.extraImages)) {
      for (const imgUrl of existingProduct.extraImages) {
        if (imgUrl && imgUrl !== mainImg) {
          await deletePublicFile(imgUrl)
        }
      }
    }

    return {
      success: true,
      message: 'Produk beserta berkas gambarnya berhasil dihapus',
      data: { id }
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error: Gagal menghapus data produk.' })
  }
})
