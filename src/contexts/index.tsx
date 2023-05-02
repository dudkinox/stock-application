import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { AlertError } from "../common/ToastrCommon";
import AccountServices from "../services/AccountService";

interface AppContextProps {
  pathUrl: string;
  setPathUrl: (pathUrl: string) => void;
  isLogin: string;
  majorUser: string;
  isEdit: () => boolean;
  isDelete: () => boolean;
  canEdit: string;
  canDelete: string;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => { },
  isLogin: "",
  majorUser: "",
  isEdit: () => false,
  isDelete: () => false,
  canEdit: "",
  canDelete: "",
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const isLogin = sessionStorage.getItem("account") ?? "";
  const majorUser = sessionStorage.getItem("major") ?? "";
  const canEdit = sessionStorage.getItem("can_edit") ?? "";
  const canDelete = sessionStorage.getItem("can_delete") ?? "";

  const isEdit = () => canEdit === "TRUE" ? true : false;
  const isDelete = () => canEdit === "TRUE" ? true : false;

  useEffect(() => {
    AccountServices.getFindUser(isLogin)
      .then((res) => {
        sessionStorage.setItem("major", res.data.MAJOR);
        sessionStorage.setItem("can_edit", res.data.CAN_EDIT ? "TRUE" : "FALSE");
        sessionStorage.setItem("can_delete", res.data.CAN_DELETE ? "TRUE" : "FALSE");
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
      majorUser,
      isEdit,
      isDelete,
      canEdit,
      canDelete,
    }),
    [pathUrl, setPathUrl, isLogin, majorUser, isEdit, isDelete, canEdit, canDelete,]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
