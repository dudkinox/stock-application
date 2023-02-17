import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { AlertError } from "../common/ToastrCommon";
import { PermissionEnum } from "../enum/permission.enum";
import AccountServices from "../services/AccountService";

interface AppContextProps {
  pathUrl: string;
  setPathUrl: (pathUrl: string) => void;
  isLogin: string;
  typeUser: string;
  isEdit: () => boolean;
  majorUser: string;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => {},
  isLogin: "",
  typeUser: "",
  isEdit: () => false,
  majorUser: "",
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const isLogin = sessionStorage.getItem("account") ?? "";
  const [typeUser, setTypeUser] = useState<string>("");
  const majorUser = sessionStorage.getItem("major") ?? "";

  const isEdit = () => {
    return (
      typeUser === PermissionEnum.ADMIN || typeUser === PermissionEnum.MANAGER
    );
  };

  useEffect(() => {
    AccountServices.getFindUser(isLogin)
      .then((res) => {
        setTypeUser(res.data.PERMISSION);
        sessionStorage.setItem("major", res.data.MAJOR);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  }, [setTypeUser]);

  const values = useMemo(
    () => ({
      pathUrl,
      setPathUrl,
      isLogin,
      typeUser,
      isEdit,
      majorUser,
    }),
    [pathUrl, setPathUrl, isLogin, typeUser, isEdit, majorUser]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
