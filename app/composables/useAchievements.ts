import type { Achievement } from "~~/server/database/schema";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useAchievements = () => {
  const { locale } = useI18n();

  const fetchAchievements = () => {
    return useFetch<ApiResponse<Achievement[]>>("/api/achievements", {
      key: `achievements-list-${locale.value}`,
      query: {
        locale,
      },
    });
  };

  return {
    fetchAchievements,
  };
};
