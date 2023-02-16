import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import MajorServices from "../services/MajorService";

interface AppContextProps {
  pathUrl: string;
  setPathUrl: (pathUrl: string) => void;
  isLogin: string;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => {},
  isLogin: "",
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const isLogin = sessionStorage.getItem("account") ?? "";
  const [typeUser, setTypeUser] = useState<string>("");

  useEffect(() => {
    MajorServices.getMajors();
  }, []);

  const values = useMemo(
    () => ({
      pathUrl,
      setPathUrl,
      isLogin,
    }),
    [pathUrl, setPathUrl, isLogin]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
