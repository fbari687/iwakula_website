import { z } from 'zod'

export const achievementCreateSchema = z.object({
  badge: z.string().min(1, 'Badge wajib diisi').max(100, 'Badge maksimal 100 karakter'),
  badgeEn: z.string().max(100, 'Badge Bahasa Inggris maksimal 100 karakter').optional().nullable(),
  title: z.string().min(1, 'Judul wajib diisi').max(200, 'Judul maksimal 200 karakter'),
  titleEn: z.string().max(200, 'Judul Bahasa Inggris maksimal 200 karakter').optional().nullable(),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  descriptionEn: z.string().optional().nullable(),
  image: z.string().min(1, 'Gambar wajib diisi').max(255, 'URL gambar terlalu panjang')
})

export const achievementUpdateSchema = achievementCreateSchema.partial()
