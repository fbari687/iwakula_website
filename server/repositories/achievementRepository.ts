import { eq, desc } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { achievements } from '~~/server/database/schema'
import { normalizeAchievement } from '~~/server/utils/locale'

export interface AchievementPayload {
  badge: string
  badgeEn?: string | null
  title: string
  titleEn?: string | null
  description: string
  descriptionEn?: string | null
  image: string
}

export const achievementRepository = {
  getAll: async (options?: { locale?: string }) => {
    const list = await db.query.achievements.findMany({
      orderBy: [desc(achievements.createdAt)]
    })
    if (options?.locale) {
      return list.map((item) => normalizeAchievement(item, options.locale))
    }
    return list
  },

  getById: async (id: number, options?: { locale?: string }) => {
    const result = await db.query.achievements.findFirst({
      where: eq(achievements.id, id)
    })
    if (!result) return null
    if (options?.locale) {
      return normalizeAchievement(result, options.locale)
    }
    return result
  },

  create: async (data: AchievementPayload) => {
    const insertData = {
      badge: data.badge,
      badgeEn: data.badgeEn || null,
      title: data.title,
      titleEn: data.titleEn || null,
      description: data.description,
      descriptionEn: data.descriptionEn || null,
      image: data.image,
    }
    const [result] = await db.insert(achievements).values(insertData)
    return result.insertId
  },

  update: async (id: number, data: Partial<AchievementPayload>) => {
    const updateData: any = {}
    if (data.badge !== undefined) updateData.badge = data.badge
    if (data.badgeEn !== undefined) updateData.badgeEn = data.badgeEn || null
    if (data.title !== undefined) updateData.title = data.title
    if (data.titleEn !== undefined) updateData.titleEn = data.titleEn || null
    if (data.description !== undefined) updateData.description = data.description
    if (data.descriptionEn !== undefined) updateData.descriptionEn = data.descriptionEn || null
    if (data.image !== undefined) updateData.image = data.image

    if (Object.keys(updateData).length > 0) {
      await db.update(achievements).set(updateData).where(eq(achievements.id, id))
    }
    return id
  },

  delete: async (id: number) => {
    await db.delete(achievements).where(eq(achievements.id, id))
    return id
  }
}
