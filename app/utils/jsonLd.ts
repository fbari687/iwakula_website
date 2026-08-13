/**
 * Generator data terstruktur Schema.org (JSON-LD) untuk Iwakula Website
 */

export function generateOrganizationSchema(siteUrl = "https://iwakula.com") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "IWAKULA",
    "legalName": "IWAKULA Indonesia",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/images/logo.png`,
      "caption": "IWAKULA Logo"
    },
    "description": "Produsen olahan ikan segar berkualitas dan camilan tinggi protein khas Nusantara.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pekalongan",
      "addressRegion": "Jawa Tengah",
      "addressCountry": "ID"
    },
    "sameAs": [
      "https://shopee.co.id",
      "https://tokopedia.com"
    ]
  };
}

export function generateWebsiteSchema(siteUrl = "https://iwakula.com") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "url": siteUrl,
    "name": "IWAKULA",
    "description": "Solusi Praktis & Lezat Makan Ikan Bergizi",
    "publisher": {
      "@id": `${siteUrl}/#organization`
    },
    "inLanguage": ["id-ID", "en-US"]
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; item: string }[],
  siteUrl = "https://iwakula.com"
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": it.item.startsWith("http") ? it.item : `${siteUrl}${it.item}`
    }))
  };
}

export function generateProductSchema(
  product: any,
  locale = "id",
  siteUrl = "https://iwakula.com"
) {
  if (!product) return null;

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${siteUrl}${product.image}`
    : `${siteUrl}/images/logo.png`;

  const extraImages = Array.isArray(product.extraImages)
    ? product.extraImages.map((img: string) => (img.startsWith("http") ? img : `${siteUrl}${img}`))
    : [];

  const images = [imageUrl, ...extraImages];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/products/${product.slug}/#product`,
    "name": product.name,
    "image": images,
    "description": product.description ? product.description.replace(/<[^>]*>?/gm, "").slice(0, 300) : product.name,
    "sku": `IWK-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "IWAKULA"
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${product.slug}`,
      "priceCurrency": "IDR",
      "price": product.price,
      "priceValidUntil": "2030-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.isAvailable !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@id": `${siteUrl}/#organization`
      }
    }
  };
}
