import { eq, desc, like, asc } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { products, productImages } from '~~/server/database/schema'

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
  extraImages?: string[]
}

// Transform output to map mainImage to image and extract extraImages
const mapOutput = (product: any) => {
  if (!product) return product
  return {
    ...product,
    image: product.mainImage,
    extraImages: product.images?.map((i: any) => i.imageUrl) || []
  }
}

export const productRepository = {
  getAll: async (filters?: { categoryId?: number; limit?: number; search?: string; isAvailable?: boolean }) => {
    const query: any = {
      orderBy: [desc(products.createdAt)],
      with: { 
        category: true,
        images: { orderBy: (images: any, { asc }: any) => [asc(images.displayOrder)] }
      }
    }
    
    let conditions = undefined;
    
    const { and } = await import('drizzle-orm')
    const condList = []
    
    if (filters?.categoryId !== undefined) {
      condList.push(eq(products.categoryId, filters.categoryId))
    }
    if (filters?.search) {
      condList.push(like(products.name, `%${filters.search}%`))
    }
    if (filters?.isAvailable !== undefined) {
      condList.push(eq(products.isAvailable, filters.isAvailable))
    }

    if (condList.length > 1) {
      conditions = and(...condList)
    } else if (condList.length === 1) {
      conditions = condList[0]
    }

    if (conditions) {
      query.where = conditions
    }

    if (filters?.limit) {
      query.limit = filters.limit
    }
    const result = await db.query.products.findMany(query)
    return result.map(mapOutput)
  },

  getFeatured: async () => {
    const { and } = await import('drizzle-orm')
    const result = await db.query.products.findMany({
      where: and(eq(products.isFeatured, true), eq(products.isAvailable, true)),
      orderBy: [desc(products.createdAt)],
      with: { 
        category: true,
        images: { orderBy: (images: any, { asc }: any) => [asc(images.displayOrder)] }
      }
    })
    return result.map(mapOutput)
  },

  getById: async (id: number) => {
    const result = await db.query.products.findFirst({
      where: eq(products.id, id),
      with: { 
        category: true,
        images: { orderBy: (images: any, { asc }: any) => [asc(images.displayOrder)] }
      }
    })
    return mapOutput(result)
  },

  getBySlug: async (slug: string) => {
    const result = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: { 
        category: true,
        images: { orderBy: (images: any, { asc }: any) => [asc(images.displayOrder)] }
      }
    })
    return mapOutput(result)
  },

  getByCategory: async (categoryId: number) => {
    const result = await db.query.products.findMany({
      where: eq(products.categoryId, categoryId),
      orderBy: [desc(products.createdAt)],
      with: { 
        category: true,
        images: { orderBy: (images: any, { asc }: any) => [asc(images.displayOrder)] }
      }
    })
    return result.map(mapOutput)
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
    
    return await db.transaction(async (tx) => {
      const [result] = await tx.insert(products).values(insertData)
      const productId = result.insertId

      if (data.extraImages && data.extraImages.length > 0) {
        await tx.insert(productImages).values(
          data.extraImages.map((url, index) => ({
            productId: productId,
            imageUrl: url,
            displayOrder: index
          }))
        )
      }

      return productId
    })
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

    await db.transaction(async (tx) => {
      if (Object.keys(updateData).length > 0) {
        await tx.update(products).set(updateData).where(eq(products.id, id))
      }

      if (data.extraImages !== undefined) {
        await tx.delete(productImages).where(eq(productImages.productId, id))
        
        if (data.extraImages.length > 0) {
          await tx.insert(productImages).values(
            data.extraImages.map((url, index) => ({
              productId: id,
              imageUrl: url,
              displayOrder: index
            }))
          )
        }
      }
    })

    return id
  },

  delete: async (id: number) => {
    await db.delete(products).where(eq(products.id, id))
    return id
  }
}
