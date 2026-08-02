export const useProducts = () => {
  const fetchProducts = async () => {
    return await useFetch("/api/products", {
      key: "products-list",
    });
  };

  const fetchProductBySlug = async (slug: string) => {
    return await useFetch(`/api/products/${slug}`, {
      key: `product-detail-${slug}`,
    });
  };

  return {
    fetchProducts,
    fetchProductBySlug,
  };
};
