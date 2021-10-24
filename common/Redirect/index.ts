import { useRouter } from "next/router";
import React from "react";

const Redirect = ({ to }: { to: string }): null => {
  const router = useRouter();
  React.useEffect(() => {
    router.push(to);
  }, [to, router]);
  return null;
};

export default Redirect;
