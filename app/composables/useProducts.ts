import type { Product, Category, ProductImage } from "~~/server/database/schema";

// Interface tipe data hasil Join Produk & Kategori
export type ProductWithCategory = Product & {
  category: Category;
};

// Interface tipe data Detail Produk (termasuk Galeri Gambar)
export type ProductDetail = ProductWithCategory & {
  images?: ProductImage[];
  galleryImages?: string[];
};

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface FetchProductsOptions {
  category?: string;
  limit?: number;
}

export const useProducts = () => {
  // 1. Fetch Daftar Produk (Dukungan Filter Category & Limit)
  const fetchProducts = (options: FetchProductsOptions = {}) => {
    const { category, limit } = options;

    return useFetch<ApiResponse<ProductWithCategory[]>>("/api/products", {
      key: `products-list-${category || "all"}-${limit || "all"}`,
      query: {
        category,
        limit,
      },
    });
  };

  // 2. Fetch Detail Produk berdasarkan Slug
  const fetchProductBySlug = (slug: string) => {
    return useFetch<ApiResponse<ProductDetail>>(`/api/products/${slug}`, {
      key: `product-detail-${slug}`,
    });
  };

  return {
    fetchProducts,
    fetchProductBySlug,
  };
};
