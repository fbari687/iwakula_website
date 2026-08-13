import type { Category } from "~~/server/database/schema";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useCategories = () => {
  const { locale } = useI18n();

  const fetchCategories = (options = {}) => {
    return useFetch<ApiResponse<Category[]>>("/api/categories", {
      key: `categories-list-${locale.value}`,
      query: {
        locale,
      },
      ...options,
    });
  };

  return {
    fetchCategories,
  };
};
