import type { Category } from "~~/server/database/schema";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useCategories = () => {
  const fetchCategories = (options = {}) => {
    return useFetch<ApiResponse<Category[]>>("/api/categories", {
      key: "categories-list",
      ...options,
    });
  };

  return {
    fetchCategories,
  };
};
