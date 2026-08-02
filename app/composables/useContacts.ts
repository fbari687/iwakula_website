export const useContacts = () => {
  const fetchContacts = async () => {
    return await useFetch("/api/contacts", {
      key: "contacts-list",
    });
  };

  return {
    fetchContacts,
  };
};
