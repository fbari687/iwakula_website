import { mysqlTable, serial, varchar, int, bigint, boolean, text, timestamp, json, index } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// Tabel Users
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Tabel Categories
export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("name_en", { length: 100 }),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  image: varchar("image", { length: 255 }).notNull(),
  description: text("description").notNull(),
  descriptionEn: text("description_en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Tipe antarmuka untuk Kolom JSON (Type-Safety)
export interface ServingStep {
  title: string;
  desc: string;
}

// Tabel Products
export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  categoryId: bigint("category_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => categories.id, { onDelete: "restrict" }),
  name: varchar("name", { length: 150 }).notNull(),
  nameEn: varchar("name_en", { length: 150 }),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  subTitle: varchar("sub_title", { length: 100 }).notNull(),
  subTitleEn: varchar("sub_title_en", { length: 100 }),
  price: int("price").notNull(),
  originalPrice: int("original_price").notNull(),
  mainImage: varchar("main_image", { length: 255 }).notNull(),

  isAvailable: boolean("is_available").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),

  // Deskripsi & Cara Penyajian
  description: text("description").notNull(),
  descriptionEn: text("description_en"),
  highlights: json("highlights").$type<string[]>().notNull(),
  highlightsEn: json("highlights_en").$type<string[]>(),
  // servingSteps: json("serving_steps").$type<ServingStep[]>().notNull(),
  // servingTip: varchar("serving_tip", { length: 255 }),

  // Komposisi & Informasi Alergen
  // composition: json("composition").$type<string[]>().notNull(),
  // allergenWarning: varchar("allergen_warning", { length: 255 }),

  // Integrasi Marketplace
  shopeeUrl: varchar("shopee_url", { length: 255 }),
  tokopediaUrl: varchar("tokopedia_url", { length: 255 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Tabel product_images
export const productImages = mysqlTable("product_images", {
  id: serial("id").primaryKey(),
  productId: bigint("product_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  displayOrder: int("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  productIdx: index("product_images_product_id_idx").on(table.productId)
}));

// Tabel Achievements
export const achievements = mysqlTable("achievements", {
  id: serial("id").primaryKey(),
  badge: varchar("badge", { length: 100 }).notNull(), // Contoh: "Penghargaan 2024"
  badgeEn: varchar("badge_en", { length: 100 }),
  title: varchar("title", { length: 200 }).notNull(), // Contoh: "Top 350 UMKM PFpreneur"
  titleEn: varchar("title_en", { length: 200 }),
  description: text("description").notNull(),
  descriptionEn: text("description_en"),
  image: varchar("image", { length: 255 }).notNull(), // Path gambar sertifikat/foto
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Tabel storages
// export const storages = mysqlTable("storages", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   type: varchar("type", { length: 50 }).notNull(), // freezer, chiller, room
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// Tabel product_storages
// export const productStorages = mysqlTable("product_storages", {
//   id: serial("id").primaryKey(),
//   productId: int("product_id").notNull(),
//   storageId: int("storage_id").notNull(),
//   duration: varchar("duration", { length: 50 }).notNull(),
// });

// Tabel credentials (sertifikasi)
// export const credentials = mysqlTable("credentials", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   type: varchar("type", { length: 50 }).notNull(), // halal, bpom, pirt, skp
//   number: varchar("number", { length: 100 }).notNull(),
//   certificateUrl: varchar("certificate_url", { length: 255 }).notNull(),
//   expiredAt: timestamp("expired_at"),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
// });

// Tabel product_credentials
// export const productCredentials = mysqlTable("product_credentials", {
//   id: serial("id").primaryKey(),
//   productId: int("product_id").notNull(),
//   credentialId: int("credential_id").notNull(),
// });

// Tabel contacts
export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull(),
  value: varchar("value", { length: 200 }).notNull(),
  icon: varchar("icon", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Relasi Antar Tabel
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  // productStorages: many(productStorages),
  // productCredentials: many(productCredentials),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

// export const productStoragesRelations = relations(productStorages, ({ one }) => ({
//   product: one(products, {
//     fields: [productStorages.productId],
//     references: [products.id],
//   }),
//   storage: one(storages, {
//     fields: [productStorages.storageId],
//     references: [storages.id],
//   }),
// }));

// export const credentialsRelations = relations(credentials, ({ many }) => ({
//   productCredentials: many(productCredentials),
// }));

// export const productCredentialsRelations = relations(productCredentials, ({ one }) => ({
//   product: one(products, {
//     fields: [productCredentials.productId],
//     references: [products.id],
//   }),
//   credential: one(credentials, {
//     fields: [productCredentials.credentialId],
//     references: [credentials.id],
//   }),
// }));

// Inferensi Tipe Data
export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
// export type Storage = typeof storages.$inferSelect;
// export type Credential = typeof credentials.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
