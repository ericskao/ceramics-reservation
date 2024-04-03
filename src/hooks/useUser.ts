import { getAccessToken, getAccessTokenData } from "@/store/auth-store";

export const useUser = () => {
  const data = getAccessTokenData();
  const x = getAccessToken();

  console.log("data in useuser", data, x);

  return {
    userId: data?.user_id,
  };
};
