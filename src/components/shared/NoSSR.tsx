import { ReactElement, useEffect, useState } from "react";

const NoSSR = ({ children }: { children: ReactElement }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <>{children}</> : null}</>;
};

export default NoSSR;
