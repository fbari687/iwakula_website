import { z } from 'zod'

export const contactCreateSchema = z.object({
  key: z.string().min(1, 'Key wajib diisi').max(100, 'Key maksimal 100 karakter'),
  value: z.string().min(1, 'Value wajib diisi').max(200, 'Value maksimal 200 karakter'),
  icon: z.string().max(100, 'Icon maksimal 100 karakter').optional().nullable()
})

export const contactUpdateSchema = contactCreateSchema.partial()
