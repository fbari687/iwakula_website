import { eq, asc, gte, count, sql } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { dineInMenuImages } from '~~/server/database/schema'

export interface DineInMenuPayload {
  imageUrl: string
  displayOrder?: number
}

// Helper untuk merapikan urutan (1, 2, 3...) tanpa angka kembar dan tanpa celah (gap)
async function normalizeDisplayOrders() {
  const all = await db.select().from(dineInMenuImages).orderBy(asc(dineInMenuImages.displayOrder), asc(dineInMenuImages.id))
  for (let i = 0; i < all.length; i++) {
    const expectedOrder = i + 1
    const item = all[i]
    if (item && item.displayOrder !== expectedOrder) {
      await db.update(dineInMenuImages).set({ displayOrder: expectedOrder }).where(eq(dineInMenuImages.id, item.id))
    }
  }
}

export const dineInRepository = {
  getAll: async () => {
    await normalizeDisplayOrders()
    return await db.select().from(dineInMenuImages).orderBy(asc(dineInMenuImages.displayOrder), asc(dineInMenuImages.id))
  },

  getById: async (id: number) => {
    const list = await db.select().from(dineInMenuImages).where(eq(dineInMenuImages.id, id)).limit(1)
    return list[0] || null
  },

  create: async (data: DineInMenuPayload) => {
    const targetOrder = Math.max(1, data.displayOrder ?? 1)

    // Geser gambar lain yang urutannya >= targetOrder agar memberi ruang untuk data baru
    await db.update(dineInMenuImages)
      .set({ displayOrder: sql`${dineInMenuImages.displayOrder} + 1` })
      .where(gte(dineInMenuImages.displayOrder, targetOrder))

    const [result] = await db.insert(dineInMenuImages).values({
      imageUrl: data.imageUrl,
      displayOrder: targetOrder,
    })

    // Rapikan urutan menjadi 1, 2, 3...
    await normalizeDisplayOrders()
    return result.insertId
  },

  update: async (id: number, data: Partial<DineInMenuPayload>) => {
    const updateData: any = {}
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl
    if (data.displayOrder !== undefined) {
      const targetOrder = Math.max(1, data.displayOrder)

      // Geser gambar lain yang urutannya >= targetOrder
      await db.update(dineInMenuImages)
        .set({ displayOrder: sql`${dineInMenuImages.displayOrder} + 1` })
        .where(gte(dineInMenuImages.displayOrder, targetOrder))

      updateData.displayOrder = targetOrder
    }

    if (Object.keys(updateData).length > 0) {
      await db.update(dineInMenuImages).set(updateData).where(eq(dineInMenuImages.id, id))
    }

    // Rapikan urutan menjadi 1, 2, 3...
    await normalizeDisplayOrders()
    return id
  },

  delete: async (id: number) => {
    // BUSINESS RULE: Minimal harus ada 1 gambar menu kedai di database
    const countResult = await db.select({ total: count() }).from(dineInMenuImages)
    const totalCount = countResult[0]?.total || 0

    if (totalCount <= 1) {
      throw createError({
        statusCode: 400,
        statusMessage: "Gagal: Minimal harus ada 1 gambar menu kedai di database.",
      })
    }

    await db.delete(dineInMenuImages).where(eq(dineInMenuImages.id, id))

    // Rapikan sisa gambar menjadi 1, 2, 3...
    await normalizeDisplayOrders()
    return id
  }
}
