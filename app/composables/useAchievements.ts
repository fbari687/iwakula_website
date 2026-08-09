import type { Achievement } from "~~/server/database/schema";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useAchievements = () => {
  const fetchAchievements = () => {
    return useFetch<ApiResponse<Achievement[]>>("/api/achievements", {
      key: "achievements-list",
    });
  };

  return {
    fetchAchievements,
  };
};
