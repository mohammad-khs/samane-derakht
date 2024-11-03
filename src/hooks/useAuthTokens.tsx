import { useState, useEffect } from "react";

export const useAuthTokens = () => {
  const [tokens, setTokens] = useState<{
    access: string | null;
    token: string | null;
  }>({
    access: null,
    token: null,
  });

  useEffect(() => {
    const access = localStorage.getItem("access");
    const token = localStorage.getItem("token");
    setTokens({ access, token });
  }, []);

  return tokens;
};
