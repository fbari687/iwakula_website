export const useCategories = () => {
  const fetchCategories = async () => {
    return await useFetch("/api/categories", {
      key: "categories-list",
    });
  };

  return {
    fetchCategories,
  };
};
