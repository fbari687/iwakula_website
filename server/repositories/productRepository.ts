import { eq, desc } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { products } from '~~/server/database/schema'

// Tipe payload yang diterima dari form CMS
export interface ProductPayload {
  categoryId: number
  name: string
  slug: string
  subTitle: string
  price: number
  originalPrice?: number
  image: string // CMS Payload
  description: string
  highlights?: string[]
  shopeeUrl?: string | null
  tokopediaUrl?: string | null
  isAvailable?: boolean
  isFeatured?: boolean
}

// Transform output to map mainImage to image
const mapOutput = (product: any) => {
  if (!product) return product
  return {
    ...product,
    image: product.mainImage
  }
}

export const productRepository = {
  getAll: async (filters?: { categoryId?: number; limit?: number }) => {
    const query: any = {
      orderBy: [desc(products.createdAt)],
      with: { category: true }
    }
    if (filters?.categoryId) {
      query.where = eq(products.categoryId, filters.categoryId)
    }
    if (filters?.limit) {
      query.limit = filters.limit
    }
    const result = await db.query.products.findMany(query)
    return result.map(mapOutput)
  },

  getFeatured: async () => {
    const result = await db.query.products.findMany({
      where: eq(products.isFeatured, true),
      orderBy: [desc(products.createdAt)],
      with: { category: true }
    })
    return result.map(mapOutput)
  },

  getById: async (id: number) => {
    const result = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: { category: true }
    })
    return mapOutput(result)
  },

  getBySlug: async (slug: string) => {
    const result = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: { category: true }
    })
    return mapOutput(result)
  },

  create: async (data: ProductPayload) => {
    const insertData = {
      categoryId: data.categoryId,
      name: data.name,
      slug: data.slug,
      subTitle: data.subTitle,
      price: data.price,
      originalPrice: data.originalPrice ?? data.price, // Default ke price jika kosong
      mainImage: data.image, // Mapping CMS image to mainImage
      description: data.description,
      isAvailable: data.isAvailable ?? true,
      isFeatured: data.isFeatured ?? false,
      highlights: data.highlights ?? [],
      shopeeUrl: data.shopeeUrl || null,
      tokopediaUrl: data.tokopediaUrl || null,
    }
    
    const [result] = await db.insert(products).values(insertData)
    return result.insertId
  },

  update: async (id: number, data: Partial<ProductPayload>) => {
    const updateData: any = {}
    
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId
    if (data.name !== undefined) updateData.name = data.name
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.subTitle !== undefined) updateData.subTitle = data.subTitle
    if (data.price !== undefined) {
      updateData.price = data.price
      if (data.originalPrice === undefined) {
        updateData.originalPrice = data.price // Update originalPrice if it's not provided explicitly
      }
    }
    if (data.originalPrice !== undefined) updateData.originalPrice = data.originalPrice
    if (data.image !== undefined) updateData.mainImage = data.image // Mapping
    if (data.description !== undefined) updateData.description = data.description
    if (data.highlights !== undefined) updateData.highlights = data.highlights
    if (data.shopeeUrl !== undefined) updateData.shopeeUrl = data.shopeeUrl || null
    if (data.tokopediaUrl !== undefined) updateData.tokopediaUrl = data.tokopediaUrl || null
    if (data.isAvailable !== undefined) updateData.isAvailable = data.isAvailable
    if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured

    await db.update(products).set(updateData).where(eq(products.id, id))
    return id
  },

  delete: async (id: number) => {
    await db.delete(products).where(eq(products.id, id))
    return id
  }
}
