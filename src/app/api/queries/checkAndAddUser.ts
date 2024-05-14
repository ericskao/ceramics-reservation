import apiClient from "@/api/apiClient";

export const useCheckAndInsertUser = () => {
  const checkUser = async (userId: string) => {
    const { data } = await apiClient().get(`/users/${userId}`);
    return data;
  };

  const insertUser = async (user: any) => {
    const { data } = await apiClient().post(`/users`, { user });
  };

  return { checkUser, insertUser };
};
