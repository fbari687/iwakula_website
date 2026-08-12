import { eq, desc, count } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { categories, products } from '~~/server/database/schema'

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
    return await db.transaction(async (tx) => {
      const category = await tx.query.categories.findFirst({
        where: eq(categories.id, id)
      })

      if (!category) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found: Kategori tidak ditemukan.'
        })
      }

      const countResult = await tx
        .select({ count: count() })
        .from(products)
        .where(eq(products.categoryId, id))

      const productCount = countResult[0]?.count ?? 0

      if (productCount > 0) {
        throw createError({
          statusCode: 409,
          statusMessage: 'Kategori masih digunakan oleh produk',
          data: { productCount }
        })
      }

      await tx.delete(categories).where(eq(categories.id, id))
      return id
    })
  }
}
