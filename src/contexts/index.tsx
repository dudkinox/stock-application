import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { AlertError, AlertSuccess } from "../common/ToastrCommon";
import AccountServices from "../services/AccountService";
import StockService from "../services/StockServices";
import { ThemesEnum } from "../enum/mode.enum";

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
  deleteStock: (id: string, major: string) => () => void;
  theme: ThemesEnum;
  setTheme: (theme: ThemesEnum) => void;
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
  isLoading: false,
  setIsLoading: () => { },
  deleteStock: () => () => { },
  theme: ThemesEnum.DARK,
  setTheme: () => { }
});

interface ChildrenProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: Readonly<ChildrenProps>) {
  const [pathUrl, setPathUrl] = useState<string>(window.location.pathname);
  const isLogin = sessionStorage.getItem("account") ?? "";
  const majorUser = sessionStorage.getItem("major") ?? "";
  const editPermission = sessionStorage.getItem("can_edit") ?? "";
  const deletePermission = sessionStorage.getItem("can_delete") ?? "";
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [theme, setTheme] = useState<ThemesEnum>(() => {
    const savedTheme = localStorage.getItem("theme") as ThemesEnum | null;
    return savedTheme ?? ThemesEnum.DARK;
  });

  const isEdit = () => editPermission === "TRUE";
  const isDelete = () => deletePermission === "TRUE";

  const deleteStock = (id: string, major: string) => () => {
    const choice = confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?");
    if (!choice) return;
    setIsLoading(true);
    StockService.DeleteStockById(id, major)
      .then((res) => {
        AlertSuccess(res.data.message);
        StockService.GetStock(majorUser)
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            AlertError(err.response.data.message);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(theme === ThemesEnum.DARK ? "dark-mode" : "light-mode");
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    if (!isLogin) {
      setTheme(ThemesEnum.DARK);
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    }
  }, [isLogin]);

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
  }, [isLogin]);

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
  }, [isLogin]);

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
      deleteStock,
      theme,
      setTheme,
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
      deleteStock,
      theme,
      setTheme,
    ]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
