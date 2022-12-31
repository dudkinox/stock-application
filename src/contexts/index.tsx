import { createContext, ReactNode, useMemo, useState } from "react";

interface AppContextProps {
  pathUrl: string;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl] = useState<string>(window.location.pathname);

  const values = useMemo(
    () => ({
      pathUrl,
    }),
    [pathUrl]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
