import { eq, ne, and, like } from "drizzle-orm";
import { db } from "./db";
import { categories, products } from "../database/schema";

/**
 * Converts a text string into a clean URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generates a unique slug for categories or products in MySQL database.
 * If a slug conflict exists, appends `-1`, `-2`, etc. automatically.
 */
export async function generateUniqueSlug(
  entityType: "categories" | "products",
  name: string,
  excludeId?: number
): Promise<string> {
  const baseSlug = slugify(name) || "item";
  const table = entityType === "categories" ? categories : products;

  const condList = [like(table.slug, `${baseSlug}%`)];
  if (excludeId) {
    condList.push(ne(table.id, excludeId));
  }

  const existingItems = await (db.select({ slug: table.slug }).from(table as any).where(and(...condList)) as any);
  const existingSlugs = new Set<string>(existingItems.map((item: any) => item.slug));

  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  while (existingSlugs.has(`${baseSlug}-${counter}`)) {
    counter++;
  }

  return `${baseSlug}-${counter}`;
}
