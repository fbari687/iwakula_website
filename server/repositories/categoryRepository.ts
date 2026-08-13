import { eq, desc, count } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { categories, products } from '~~/server/database/schema'
import { normalizeCategory } from '~~/server/utils/locale'

export interface CategoryPayload {
  name: string
  nameEn?: string | null
  slug: string
  image: string
  description: string
  descriptionEn?: string | null
}

export const categoryRepository = {
  getAll: async (options?: { locale?: string }) => {
    const list = await db.query.categories.findMany({
      orderBy: [desc(categories.createdAt)]
    })
    if (options?.locale) {
      return list.map((item) => normalizeCategory(item, options.locale))
    }
    return list
  },

  getById: async (id: number, options?: { locale?: string }) => {
    const result = await db.query.categories.findFirst({
      where: eq(categories.id, id)
    })
    if (!result) return null
    if (options?.locale) {
      return normalizeCategory(result, options.locale)
    }
    return result
  },

  getBySlug: async (slug: string, options?: { locale?: string }) => {
    const result = await db.query.categories.findFirst({
      where: eq(categories.slug, slug)
    })
    if (!result) return null
    if (options?.locale) {
      return normalizeCategory(result, options.locale)
    }
    return result
  },

  create: async (data: CategoryPayload) => {
    const insertData = {
      name: data.name,
      nameEn: data.nameEn || null,
      slug: data.slug,
      image: data.image,
      description: data.description,
      descriptionEn: data.descriptionEn || null,
    }
    const [result] = await db.insert(categories).values(insertData)
    return result.insertId
  },

  update: async (id: number, data: Partial<CategoryPayload>) => {
    const updateData: any = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.nameEn !== undefined) updateData.nameEn = data.nameEn || null
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.image !== undefined) updateData.image = data.image
    if (data.description !== undefined) updateData.description = data.description
    if (data.descriptionEn !== undefined) updateData.descriptionEn = data.descriptionEn || null

    if (Object.keys(updateData).length > 0) {
      await db.update(categories).set(updateData).where(eq(categories.id, id))
    }
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
