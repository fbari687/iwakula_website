export interface BreadcrumbItemInput {
  name: string;
  url: string;
}

export interface ProductSchemaInput {
  name: string;
  description: string;
  image: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  categoryName?: string;
  availability?: boolean;
}

export const useJsonLd = () => {
  const { locale } = useI18n();
  const siteUrl = "https://iwakula.com";

  const getOrganizationSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": ["Organization", "FoodEstablishment", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "IWAKULA",
      legalName: "PT Iwakula Indonesia",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
        width: "512",
        height: "512",
      },
      image: `${siteUrl}/images/logo.png`,
      description:
        locale.value === "en"
          ? "Delivering premium fresh Spanish mackerel dishes and ready-to-eat high-protein snacks effortlessly for your loved ones."
          : "Menghadirkan aneka olahan ikan tenggiri segar dan camilan high-protein siap saji tanpa repot untuk keluarga tercinta.",
      telephone: "+628119844941",
      email: "info@iwakula.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Depok",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.4025,
        longitude: 106.7942,
      },
      priceRange: "$$",
      sameAs: [
        "https://shopee.co.id",
        "https://tokopedia.com",
      ],
    };
  };

  const getWebSiteSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "IWAKULA",
      inLanguage: locale.value === "en" ? "en-US" : "id-ID",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    };
  };

  const getBreadcrumbSchema = (items: BreadcrumbItemInput[]) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
      })),
    };
  };

  const getProductSchema = (product: ProductSchemaInput) => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${siteUrl}/products/${product.slug}/#product`,
      name: product.name,
      description: product.description,
      image: product.image.startsWith("http") ? product.image : `${siteUrl}${product.image}`,
      category: product.categoryName || "Olahan Ikan",
      brand: {
        "@type": "Brand",
        name: "IWAKULA",
      },
      offers: {
        "@type": "Offer",
        url: `${siteUrl}/products/${product.slug}`,
        priceCurrency: "IDR",
        price: product.price,
        availability: product.availability !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    };
  };

  return {
    getOrganizationSchema,
    getWebSiteSchema,
    getBreadcrumbSchema,
    getProductSchema,
  };
};
