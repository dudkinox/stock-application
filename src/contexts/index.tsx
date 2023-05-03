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
  editPermission: string;
  deletePermission: string;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => { },
  isLogin: "",
  majorUser: "",
  isEdit: () => false,
  isDelete: () => false,
  editPermission: "",
  deletePermission: "",
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: ChildrenProps) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const isLogin = sessionStorage.getItem("account") ?? "";
  const majorUser = sessionStorage.getItem("major") ?? "";
  const editPermission = sessionStorage.getItem("can_edit") ?? "";
  const deletePermission = sessionStorage.getItem("can_delete") ?? "";

  const isEdit = () => editPermission === "TRUE" ? true : false;
  const isDelete = () => deletePermission === "TRUE" ? true : false;

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
      editPermission,
      deletePermission,
    }),
    [pathUrl, setPathUrl, isLogin, majorUser, isEdit, isDelete, editPermission, deletePermission,]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
