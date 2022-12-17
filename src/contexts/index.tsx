import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

interface AppContextProps {
  message: number;
  setMessage: (message: number) => void;
  click: () => void;
}

export const AppContext = createContext<AppContextProps>({
  message: 0,
  setMessage: () => {},
  click: () => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [message, setMessage] = useState<number>(0);

  const click = useCallback(() => {
    setMessage(message + 1);
  }, [message]);

  const values = useMemo(
    () => ({
      message,
      setMessage,
      click,
    }),
    [click, message, setMessage]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
