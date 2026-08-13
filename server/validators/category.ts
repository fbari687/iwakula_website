import { z } from 'zod'

export const categoryCreateSchema = z.object({
  name: z.string().min(1, 'Nama kategori wajib diisi').max(100, 'Nama maksimal 100 karakter'),
  nameEn: z.string().max(100, 'Nama Bahasa Inggris maksimal 100 karakter').optional().nullable(),
  slug: z.string().max(100, 'Slug maksimal 100 karakter').optional(),
  image: z.string().min(1, 'Gambar wajib diisi').max(255, 'URL gambar terlalu panjang'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  descriptionEn: z.string().optional().nullable(),
})

export const categoryUpdateSchema = categoryCreateSchema.partial()
