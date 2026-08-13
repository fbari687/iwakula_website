import { z } from 'zod'

export const productCreateSchema = z.object({
  categoryId: z.number({ message: 'Kategori wajib dipilih dan harus berupa angka' }).positive('Kategori tidak valid'),
  name: z.string().min(1, 'Nama produk wajib diisi').max(150, 'Nama produk maksimal 150 karakter'),
  nameEn: z.string().max(150, 'Nama produk Bahasa Inggris maksimal 150 karakter').optional().nullable(),
  slug: z.string().max(150, 'Slug maksimal 150 karakter').optional(),
  subTitle: z.string().min(1, 'Subjudul wajib diisi').max(100, 'Subjudul maksimal 100 karakter'),
  subTitleEn: z.string().max(100, 'Subjudul Bahasa Inggris maksimal 100 karakter').optional().nullable(),
  price: z.number({ message: 'Harga wajib diisi dan harus berupa angka' }).nonnegative('Harga tidak boleh negatif'),
  originalPrice: z.number({ message: 'Harga asli wajib diisi dan harus berupa angka' }).nonnegative('Harga asli tidak boleh negatif').optional(),
  image: z.string().min(1, 'Gambar wajib diisi').max(255, 'URL gambar terlalu panjang'),
  description: z.string().min(1, 'Deskripsi wajib diisi'),
  descriptionEn: z.string().optional().nullable(),
  highlights: z.array(z.string()).default([]),
  highlightsEn: z.array(z.string()).optional().nullable(),
  shopeeUrl: z.string().url('URL tidak valid').max(255).optional().or(z.literal('')),
  tokopediaUrl: z.string().url('URL tidak valid').max(255).optional().or(z.literal('')),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  extraImages: z.array(z.string()).optional()
})

export const productUpdateSchema = productCreateSchema.partial()
