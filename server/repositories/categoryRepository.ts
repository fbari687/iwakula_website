import { eq, desc } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { categories } from '~~/server/database/schema'

export const categoryRepository = {
  getAll: async () => {
    return await db.query.categories.findMany({
      orderBy: [desc(categories.createdAt)]
    })
  },

  getById: async (id: number) => {
    const result = await db.query.categories.findFirst({
      where: eq(categories.id, id)
    })
    return result || null
  },

  getBySlug: async (slug: string) => {
    const result = await db.query.categories.findFirst({
      where: eq(categories.slug, slug)
    })
    return result || null
  },

  create: async (data: typeof categories.$inferInsert) => {
    const [result] = await db.insert(categories).values(data)
    return result.insertId
  },

  update: async (id: number, data: Partial<typeof categories.$inferInsert>) => {
    await db.update(categories).set(data).where(eq(categories.id, id))
    return id
  },

  delete: async (id: number) => {
    await db.delete(categories).where(eq(categories.id, id))
    return id
  }
}
