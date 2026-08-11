import { eq, desc } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { contacts } from '~~/server/database/schema'

export const contactRepository = {
  getAll: async () => {
    return await db.query.contacts.findMany({
      orderBy: [desc(contacts.createdAt)]
    })
  },

  getById: async (id: number) => {
    const result = await db.query.contacts.findFirst({
      where: eq(contacts.id, id)
    })
    return result || null
  },

  getByKey: async (key: string) => {
    const result = await db.query.contacts.findFirst({
      where: eq(contacts.key, key)
    })
    return result || null
  },

  create: async (data: typeof contacts.$inferInsert) => {
    const [result] = await db.insert(contacts).values(data)
    return result.insertId
  },

  update: async (id: number, data: Partial<typeof contacts.$inferInsert>) => {
    await db.update(contacts).set(data).where(eq(contacts.id, id))
    return id
  },

  delete: async (id: number) => {
    await db.delete(contacts).where(eq(contacts.id, id))
    return id
  }
}
