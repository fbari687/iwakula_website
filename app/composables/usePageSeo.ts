interface PageSeoOptions {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
}

export const usePageSeo = (options: PageSeoOptions = {}) => {
  const { locale } = useI18n();
  const requestUrl = useRequestURL();

  const siteUrl = requestUrl.origin || "https://iwakula.com";
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
  const canonicalUrl = `${siteUrl}${currentPath}`;

  // Alternate URLs for hreflang
  const cleanPathNoLocale = currentPath.replace(/^\/en(\/|$)/, "/");
  const idUrl = `${siteUrl}${cleanPathNoLocale}`;
  const enUrl = `${siteUrl}${cleanPathNoLocale === "/" ? "/en" : "/en" + cleanPathNoLocale}`;

  useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImage: pageImage,
    ogUrl: canonicalUrl,
    ogType: (options.type || "website") as any,
    ogLocale: locale.value === "en" ? "en_US" : "id_ID",
    twitterCard: "summary_large_image",
    twitterTitle: pageTitle,
    twitterDescription: pageDescription,
    twitterImage: pageImage,
    ...(options.noindex ? { robots: "noindex, nofollow" } : {}),
  });

  useHead({
    htmlAttrs: {
      lang: locale.value || "id",
    },
    link: [
      { rel: "canonical", href: canonicalUrl },
      { rel: "alternate", hreflang: "id", href: idUrl },
      { rel: "alternate", hreflang: "en", href: enUrl },
      { rel: "alternate", hreflang: "x-default", href: idUrl },
    ],
  });
};
