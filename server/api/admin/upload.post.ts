import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import crypto from 'crypto'
import sharp from 'sharp'

export default defineEventHandler(async (event) => {
  try {
    // 1. Baca multipart form data menggunakan utilitas bawaan Nitro
    const formData = await readMultipartFormData(event)
    
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: Form data kosong atau format tidak valid.'
      })
    }

    // 2. Validasi kelengkapan form field (hanya menerima field "image")
    const imageField = formData.find(field => field.name === 'image')

    if (!imageField || !imageField.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: Field "image" tidak ditemukan.'
      })
    }

    // 3. Validasi awal MIME Type
    // Catatan: HEIC/HEIF dihapus dari whitelist karena library Sharp (via libvips prebuilt) di Windows tidak memiliki dukungan dekode HEIF (terkait paten).
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (imageField.type && !allowedMimeTypes.includes(imageField.type)) {
      throw createError({
        statusCode: 415,
        statusMessage: 'Unsupported Media Type: Format file tidak didukung (HEIC tidak didukung pada server ini).'
      })
    }

    // 4. Validasi ukuran (Max 5MB) mencegah Memory Exhaustion
    const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
    if (imageField.data.length > MAX_SIZE) {
      throw createError({
        statusCode: 413,
        statusMessage: 'Payload Too Large: Ukuran gambar melebihi 5MB.'
      })
    }

    // 5. Image Processing (Sharp) & WebP Normalization
    let processedBuffer: Buffer
    try {
      processedBuffer = await sharp(imageField.data)
        .rotate() // Auto-rotate berdasarkan EXIF (otomatis membuang EXIF tag di versi baru)
        .resize({
          width: 1600,
          height: 1600,
          fit: 'inside', // Resize proporsional
          withoutEnlargement: true // Tidak memperbesar jika dimensi asli lebih kecil dari 1600px
        })
        .webp({ quality: 82 }) // Normalisasi format ke WebP dengan kompresi ideal
        .toBuffer()
    } catch (err) {
      // Validator akhir: Jika Sharp menolak, berarti file tersebut cacat/malware
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: File corrupt atau bukan file gambar yang valid.'
      })
    }

    // 6. Penamaan File & Pembuatan Direktori Extensible
    const uuid = crypto.randomUUID()
    const filename = `${uuid}.webp`
    const uploadDir = join(process.cwd(), 'public', 'uploads')

    // Pastikan direktori tersedia sebelum proses write untuk menghindari crash (Extensible Architecture)
    await mkdir(uploadDir, { recursive: true })

    // 7. Simpan Buffer ke Storage Lokal
    const filePath = join(uploadDir, filename)
    await writeFile(filePath, processedBuffer)

    // 8. Respons API Standar Iwakula
    return {
      success: true,
      message: 'Gambar berhasil diunggah',
      data: {
        url: `/uploads/${filename}`
      }
    }
  } catch (error: any) {
    // Meloloskan error bawaan Nitro (createError)
    if (error.statusCode) {
      throw error
    }
    // Menangkap kesalahan internal tak terduga (misal fs throw Exception)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: Gagal menyimpan gambar pada filesystem.'
    })
  }
})
