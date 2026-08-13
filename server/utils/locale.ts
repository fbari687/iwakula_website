import type { H3Event } from "h3";
import type { Category, Product, Achievement } from "~~/server/database/schema";

/**
 * Resolves a field value based on the requested locale with fallback to Indonesian.
 * 
 * @param idValue Primary Indonesian text
 * @param enValue Optional English text
 * @param locale Active locale code ('id' | 'en')
 */
export function resolveLocalizedField(
  idValue: string,
  enValue: string | null | undefined,
  locale?: string | null
): string {
  if (locale === "en" && enValue && enValue.trim().length > 0) {
    return enValue.trim();
  }
  return idValue || "";
}

/**
 * Extracts and normalizes the target locale from HTTP request (query string or headers).
 * 
 * @param event Nitro H3Event
 * @returns 'id' | 'en'
 */
export function getHeaderOrQueryLocale(event: H3Event): string {
  const query = getQuery(event);
  if (typeof query.locale === "string" && query.locale.trim().length > 0) {
    const loc = query.locale.trim().toLowerCase();
    if (loc.startsWith("en")) return "en";
    if (loc.startsWith("id")) return "id";
  }

  const i18nHeader = getHeader(event, "x-i18n-locale");
  if (i18nHeader) {
    const loc = i18nHeader.trim().toLowerCase();
    if (loc.startsWith("en")) return "en";
    if (loc.startsWith("id")) return "id";
  }

  const acceptLang = getHeader(event, "accept-language");
  if (acceptLang) {
    const firstLang = acceptLang.split(",")[0]?.trim().toLowerCase();
    if (firstLang?.startsWith("en")) return "en";
  }

  return "id";
}

/**
 * Normalizes Category object for public consumption by stripping `_en` fields
 * and applying localized values based on the requested locale.
 */
export function normalizeCategory(category: any, locale?: string) {
  if (!category || !locale) return category;
  const { nameEn, descriptionEn, ...rest } = category;
  return {
    ...rest,
    name: resolveLocalizedField(category.name, category.nameEn, locale),
    description: resolveLocalizedField(category.description, category.descriptionEn, locale),
  };
}

/**
 * Normalizes Product object for public consumption by stripping `_en` fields
 * and applying localized values based on the requested locale.
 */
export function normalizeProduct(product: any, locale?: string) {
  if (!product || !locale) return product;
  const { nameEn, subTitleEn, descriptionEn, highlightsEn, ...rest } = product;
  const normalizedCategory = product.category ? normalizeCategory(product.category, locale) : product.category;
  
  const resolvedHighlights = (locale === "en" && product.highlightsEn && Array.isArray(product.highlightsEn) && product.highlightsEn.length > 0)
    ? product.highlightsEn
    : (product.highlights || []);

  return {
    ...rest,
    name: resolveLocalizedField(product.name, product.nameEn, locale),
    subTitle: resolveLocalizedField(product.subTitle, product.subTitleEn, locale),
    description: resolveLocalizedField(product.description, product.descriptionEn, locale),
    highlights: resolvedHighlights,
    category: normalizedCategory,
  };
}

/**
 * Normalizes Achievement object for public consumption by stripping `_en` fields
 * and applying localized values based on the requested locale.
 */
export function normalizeAchievement(achievement: any, locale?: string) {
  if (!achievement || !locale) return achievement;
  const { badgeEn, titleEn, descriptionEn, ...rest } = achievement;
  return {
    ...rest,
    badge: resolveLocalizedField(achievement.badge, achievement.badgeEn, locale),
    title: resolveLocalizedField(achievement.title, achievement.titleEn, locale),
    description: resolveLocalizedField(achievement.description, achievement.descriptionEn, locale),
  };
}
