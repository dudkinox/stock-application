import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
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
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const AppContext = createContext<AppContextProps>({
  pathUrl: "",
  setPathUrl: () => {},
  isLogin: "",
  majorUser: "",
  isEdit: () => false,
  isDelete: () => false,
  editPermission: "",
  deletePermission: "",
  isLoading: false,
  setIsLoading: () => {},
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isEdit = () => (editPermission === "TRUE" ? true : false);
  const isDelete = () => (deletePermission === "TRUE" ? true : false);

  useEffect(() => {
    setIsLoading(true);
    AccountServices.getFindUser(isLogin)
      .then((res) => {
        sessionStorage.setItem("major", res.data.MAJOR);
        sessionStorage.setItem(
          "can_edit",
          res.data.CAN_EDIT ? "TRUE" : "FALSE"
        );
        sessionStorage.setItem(
          "can_delete",
          res.data.CAN_DELETE ? "TRUE" : "FALSE"
        );
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
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
      isLoading,
      setIsLoading,
    }),
    [
      pathUrl,
      setPathUrl,
      isLogin,
      majorUser,
      isEdit,
      isDelete,
      editPermission,
      deletePermission,
      isLoading,
      setIsLoading,
    ]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
