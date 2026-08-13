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
  const { locale } = useI18n();

  // 1. Fetch Daftar Produk (Dukungan Filter Category, Limit & Locale)
  const fetchProducts = (options: FetchProductsOptions = {}) => {
    const { category, limit } = options;

    return useFetch<ApiResponse<ProductWithCategory[]>>("/api/products", {
      key: `products-list-${category || "all"}-${limit || "all"}-${locale.value}`,
      query: {
        category,
        limit,
        locale,
      },
    });
  };

  // 2. Fetch Detail Produk berdasarkan Slug
  const fetchProductBySlug = (slug: string) => {
    return useFetch<ApiResponse<ProductDetail>>(`/api/products/${slug}`, {
      key: `product-detail-${slug}-${locale.value}`,
      query: {
        locale,
      },
    });
  };

  return {
    fetchProducts,
    fetchProductBySlug,
  };
};
