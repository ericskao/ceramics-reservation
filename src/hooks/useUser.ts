import { useAuthStore } from "@/store/auth-store";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  const token = useAuthStore((state) => state.token);
  const accessTokenData = token
    ? (jwtDecode(token) as { user_id: string })
    : undefined;

  // console.log("data in useuser", data, x);

  return {
    userId: accessTokenData?.user_id,
    token,
  };
};
