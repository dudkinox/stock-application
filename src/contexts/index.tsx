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
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => {},
  isLogin: "",
  typeUser: "",
  isEdit: () => false,
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const isLogin = sessionStorage.getItem("account") ?? "";
  const [typeUser, setTypeUser] = useState<string>("");

  const isEdit = () => {
    return (
      typeUser === PermissionEnum.ADMIN || typeUser === PermissionEnum.MANAGER
    );
  };

  useEffect(() => {
    AccountServices.getFindUser(isLogin)
      .then((res) => {
        setTypeUser(res.data.PERMISSION);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  }, []);

  const values = useMemo(
    () => ({
      pathUrl,
      setPathUrl,
      isLogin,
      typeUser,
      isEdit,
    }),
    [pathUrl, setPathUrl, isLogin, typeUser, isEdit]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
