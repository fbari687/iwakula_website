import { eq, desc } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { achievements } from '~~/server/database/schema'

export const achievementRepository = {
  getAll: async () => {
    return await db.query.achievements.findMany({
      orderBy: [desc(achievements.createdAt)]
    })
  },

  getById: async (id: number) => {
    const result = await db.query.achievements.findFirst({
      where: eq(achievements.id, id)
    })
    return result || null
  },

  create: async (data: typeof achievements.$inferInsert) => {
    const [result] = await db.insert(achievements).values(data)
    return result.insertId
  },

  update: async (id: number, data: Partial<typeof achievements.$inferInsert>) => {
    await db.update(achievements).set(data).where(eq(achievements.id, id))
    return id
  },

  delete: async (id: number) => {
    await db.delete(achievements).where(eq(achievements.id, id))
    return id
  }
}
