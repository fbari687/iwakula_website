import { eq, desc, like, and, inArray, asc } from 'drizzle-orm'
import { db } from '~~/server/utils/db'
import { products, productImages, categories } from '~~/server/database/schema'
import { normalizeProduct } from '~~/server/utils/locale'

// Tipe payload yang diterima dari form CMS
export interface ProductPayload {
  categoryId: number
  name: string
  nameEn?: string | null
  slug: string
  subTitle: string
  subTitleEn?: string | null
  price: number
  originalPrice?: number
  image: string // CMS Payload
  description: string
  descriptionEn?: string | null
  highlights?: string[]
  highlightsEn?: string[] | null
  shopeeUrl?: string | null
  tokopediaUrl?: string | null
  isAvailable?: boolean
  isFeatured?: boolean
  extraImages?: string[]
}

// Transform output to map mainImage to image and extract extraImages
const mapOutput = (product: any, locale?: string) => {
  if (!product) return product
  const mapped = {
    ...product,
    image: product.mainImage,
    extraImages: product.images?.map((i: any) => i.imageUrl) || []
  }
  if (locale) {
    return normalizeProduct(mapped, locale)
  }
  return mapped
}

// Helper untuk relasi produk tanpa Drizzle JSON subqueries (100% kompatibel dengan MariaDB 11.x & MySQL 5.7/8.0)
async function attachRelations(rawProducts: any[], locale?: string) {
  if (!rawProducts || rawProducts.length === 0) return []

  // 1. Ambil seluruh kategori
  const allCategories = await db.select().from(categories)
  const categoryMap = new Map(allCategories.map(c => [c.id, c]))

  // 2. Ambil gambar produk terkait
  const productIds = rawProducts.map(p => p.id)
  const rawImages = await db.select().from(productImages).where(inArray(productImages.productId, productIds)).orderBy(asc(productImages.displayOrder))

  const imagesByProductId = new Map<number, any[]>()
  for (const img of rawImages) {
    if (!imagesByProductId.has(img.productId)) {
      imagesByProductId.set(img.productId, [])
    }
    imagesByProductId.get(img.productId)!.push(img)
  }

  // 3. Gabungkan dan petakan output
  return rawProducts.map(p => {
    const fullProduct = {
      ...p,
      category: categoryMap.get(p.categoryId) || null,
      images: imagesByProductId.get(p.id) || []
    }
    return mapOutput(fullProduct, locale)
  })
}

// Helper untuk relasi produk tunggal
async function attachSingleRelations(product: any, locale?: string) {
  if (!product) return null
  const [categoryList, rawImages] = await Promise.all([
    db.select().from(categories).where(eq(categories.id, product.categoryId)),
    db.select().from(productImages).where(eq(productImages.productId, product.id)).orderBy(asc(productImages.displayOrder))
  ])

  const fullProduct = {
    ...product,
    category: categoryList[0] || null,
    images: rawImages || []
  }
  return mapOutput(fullProduct, locale)
}

export const productRepository = {
  getAll: async (filters?: { categoryId?: number; limit?: number; search?: string; isAvailable?: boolean; locale?: string }) => {
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

    let selectQuery = db.select().from(products).$dynamic()

    if (condList.length > 1) {
      selectQuery = selectQuery.where(and(...condList))
    } else if (condList.length === 1) {
      selectQuery = selectQuery.where(condList[0])
    }

    selectQuery = selectQuery.orderBy(desc(products.createdAt))

    if (filters?.limit) {
      selectQuery = selectQuery.limit(filters.limit)
    }

    const rawProducts = await selectQuery
    return await attachRelations(rawProducts, filters?.locale)
  },

  getFeatured: async (options?: { locale?: string }) => {
    const rawProducts = await db.select().from(products).where(and(eq(products.isFeatured, true), eq(products.isAvailable, true))).orderBy(desc(products.createdAt))
    return await attachRelations(rawProducts, options?.locale)
  },

  getById: async (id: number, options?: { locale?: string }) => {
    const rawProducts = await db.select().from(products).where(eq(products.id, id)).limit(1)
    if (rawProducts.length === 0) return null
    return await attachSingleRelations(rawProducts[0], options?.locale)
  },

  getBySlug: async (slug: string, options?: { locale?: string }) => {
    const rawProducts = await db.select().from(products).where(eq(products.slug, slug)).limit(1)
    if (rawProducts.length === 0) return null
    return await attachSingleRelations(rawProducts[0], options?.locale)
  },

  getByCategory: async (categoryId: number, options?: { locale?: string }) => {
    const rawProducts = await db.select().from(products).where(eq(products.categoryId, categoryId)).orderBy(desc(products.createdAt))
    return await attachRelations(rawProducts, options?.locale)
  },

  create: async (data: ProductPayload) => {
    const insertData = {
      categoryId: data.categoryId,
      name: data.name,
      nameEn: data.nameEn || null,
      slug: data.slug,
      subTitle: data.subTitle,
      subTitleEn: data.subTitleEn || null,
      price: data.price,
      originalPrice: data.originalPrice ?? data.price,
      mainImage: data.image,
      description: data.description,
      descriptionEn: data.descriptionEn || null,
      isAvailable: data.isAvailable ?? true,
      isFeatured: data.isFeatured ?? false,
      highlights: data.highlights ?? [],
      highlightsEn: data.highlightsEn ?? null,
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
    if (data.nameEn !== undefined) updateData.nameEn = data.nameEn || null
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.subTitle !== undefined) updateData.subTitle = data.subTitle
    if (data.subTitleEn !== undefined) updateData.subTitleEn = data.subTitleEn || null
    if (data.price !== undefined) {
      updateData.price = data.price
      if (data.originalPrice === undefined) {
        updateData.originalPrice = data.price
      }
    }
    if (data.originalPrice !== undefined) updateData.originalPrice = data.originalPrice
    if (data.image !== undefined) updateData.mainImage = data.image
    if (data.description !== undefined) updateData.description = data.description
    if (data.descriptionEn !== undefined) updateData.descriptionEn = data.descriptionEn || null
    if (data.highlights !== undefined) updateData.highlights = data.highlights
    if (data.highlightsEn !== undefined) updateData.highlightsEn = data.highlightsEn || null
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
