import { createContext, ReactNode, useMemo, useState } from "react";

interface AppContextProps {
  pathUrl: string;
  setPathUrl: (pathUrl: string) => void;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);

  const values = useMemo(
    () => ({
      pathUrl,
      setPathUrl,
    }),
    [pathUrl, setPathUrl]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
