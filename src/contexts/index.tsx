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
  setMajorUser: (value: string) => void;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => {},
  isLogin: "",
  typeUser: "",
  isEdit: () => false,
  majorUser: "",
  setMajorUser: (value: string) => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const isLogin = sessionStorage.getItem("account") ?? "";
  const [typeUser, setTypeUser] = useState<string>("");
  const [majorUser, setMajorUser] = useState<string>("");

  const isEdit = () => {
    return (
      typeUser === PermissionEnum.ADMIN || typeUser === PermissionEnum.MANAGER
    );
  };

  useEffect(() => {
    AccountServices.getFindUser(isLogin)
      .then((res) => {
        setTypeUser(res.data.PERMISSION);
        setMajorUser(res.data.MAJOR);
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
      majorUser,
      setMajorUser,
    }),
    [pathUrl, setPathUrl, isLogin, typeUser, isEdit, majorUser, setMajorUser]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
