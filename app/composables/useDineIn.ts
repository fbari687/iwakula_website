import type { DineInMenuImage } from "~~/server/database/schema";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useDineIn = () => {
  const fetchDineInMenus = () => {
    return useFetch<ApiResponse<DineInMenuImage[]>>("/api/dine-in-menus", {
      key: "dine-in-menus-list",
    });
  };

  return {
    fetchDineInMenus,
  };
};
