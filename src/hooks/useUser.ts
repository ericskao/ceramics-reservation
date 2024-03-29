import { decodeCookie } from "@/utils/tokens";

export const useUser = () => {
  const decoded = decodeCookie(document.cookie);

  return {
    userId: decoded?.user_id,
  };
};
