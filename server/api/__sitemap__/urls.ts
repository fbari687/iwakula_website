import { productRepository } from '~~/server/repositories/productRepository'

export default defineEventHandler(async () => {
  try {
    const products = await productRepository.getAll({ isAvailable: true })

    return products.map((product) => ({
      loc: `/products/${product.slug}`,
      _i18nTransform: true,
      lastmod: product.updatedAt ? new Date(product.updatedAt).toISOString() : new Date().toISOString(),
    }))
  } catch (error) {
    console.error('Error generating dynamic sitemap URLs:', error)
    return []
  }
})
