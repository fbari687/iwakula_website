import type { Contact } from "~~/server/database/schema";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useContacts = () => {
  const fetchContacts = (options = {}) => {
    return useFetch<ApiResponse<Contact[]>>("/api/contacts", {
      key: "contacts-list",
      ...options,
    });
  };

  return {
    fetchContacts,
  };
};
