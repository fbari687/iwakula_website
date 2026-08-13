import { useJsonLd, type BreadcrumbItemInput, type ProductSchemaInput } from "./useJsonLd";

interface PageSeoOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItemInput[];
  productSchema?: ProductSchemaInput;
}

export const usePageSeo = (options: PageSeoOptions = {}) => {
  const { locale } = useI18n();
  const requestUrl = useRequestURL();
  const { getOrganizationSchema, getWebSiteSchema, getBreadcrumbSchema, getProductSchema } = useJsonLd();

  const siteUrl = "https://iwakula.com";
  const currentPath = requestUrl.pathname;

  const defaultTitle =
    locale.value === "en"
      ? "IWAKULA - Convenient & Delicious Nutritious Fish Dishes"
      : "IWAKULA - Solusi Praktis & Lezat Makan Ikan Bergizi";

  const defaultDescription =
    locale.value === "en"
      ? "Delivering premium fresh Spanish mackerel dishes and ready-to-eat high-protein snacks effortlessly for your loved ones."
      : "Menghadirkan aneka olahan ikan tenggiri segar dan camilan high-protein siap saji tanpa repot untuk keluarga tercinta.";

  const pageTitle = options.title ? `${options.title} | IWAKULA` : defaultTitle;
  const pageDescription = options.description || defaultDescription;
  const pageImage = options.image ? (options.image.startsWith("http") ? options.image : `${siteUrl}${options.image}`) : `${siteUrl}/images/logo.png`;
  // Alternate URLs for hreflang & canonical
  const cleanPathNoLocale = currentPath.replace(/^\/en(\/|$)/, "/");
  const idUrl = `${siteUrl}${cleanPathNoLocale}`;
  const enUrl = `${siteUrl}${cleanPathNoLocale === "/" ? "/en" : "/en" + cleanPathNoLocale}`;
  const canonicalUrl = locale.value === "en" ? enUrl : idUrl;

  const currentLocale = locale.value === "en" ? "en_US" : "id_ID";
  const alternateLocale = locale.value === "en" ? "id_ID" : "en_US";

  // Build JSON-LD Schemas
  const schemas: any[] = [
    getOrganizationSchema(),
    getWebSiteSchema(),
  ];

  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    schemas.push(getBreadcrumbSchema(options.breadcrumbs));
  }

  if (options.productSchema) {
    schemas.push(getProductSchema(options.productSchema));
  }

  useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImage: pageImage,
    ogUrl: canonicalUrl,
    ogType: (options.type || "website") as any,
    ogLocale: currentLocale,
    ogLocaleAlternate: [alternateLocale],
    ogSiteName: "IWAKULA",
    twitterCard: "summary_large_image",
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: pageImage,
    ...(options.noindex ? { robots: "noindex, nofollow" } : {}),
  });

  useHead({
    htmlAttrs: {
      lang: locale.value === "en" ? "en-US" : "id-ID",
    },
    link: [
      { rel: "canonical", href: canonicalUrl },
      { rel: "alternate", hreflang: "id-ID", href: idUrl },
      { rel: "alternate", hreflang: "en-US", href: enUrl },
      { rel: "alternate", hreflang: "x-default", href: idUrl },
    ],
    script: schemas.map((schema) => ({
      type: "application/ld+json",
      innerHTML: JSON.stringify(schema),
    })),
  });
};
