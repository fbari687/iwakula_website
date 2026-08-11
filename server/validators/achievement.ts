import { z } from 'zod'

export const achievementCreateSchema = z.object({
  badge: z.string().min(1, 'Badge wajib diisi').max(100, 'Badge maksimal 100 karakter'),
  title: z.string().min(1, 'Judul wajib diisi').max(200, 'Judul maksimal 200 karakter'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  image: z.string().min(1, 'Gambar wajib diisi').max(255, 'URL gambar terlalu panjang')
})

export const achievementUpdateSchema = achievementCreateSchema.partial()
