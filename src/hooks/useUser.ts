import { decodeCookie } from "@/utils/tokens";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [cookie, setCookie] = useState<{ user_id: string } | undefined>();

  useEffect(() => {
    const decoded = decodeCookie(document.cookie);
    setCookie(decoded);
  }, [setCookie]);

  return {
    userId: cookie?.user_id,
  };
};
