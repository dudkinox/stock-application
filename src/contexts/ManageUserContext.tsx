import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { camelToSnakeObject } from "../common/CamelToSnake";
import initTable, { destroyTable } from "../common/DataTable";
import { AlertError, AlertSuccess, AlertWarning } from "../common/ToastrCommon";
import { GetUserResponse } from "../Models/Response/GetUserResponse";
import { UserRequest } from "../Models/Request/UserRequest";
import UserServices from "../services/UserServices";

interface UserContextProps {
  user: GetUserResponse[];
  setUser: (value: GetUserResponse[]) => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  major: string;
  setMajor: (value: string) => void;
  permission: string;
  setPermission: (value: string) => void;
  handlerSubmit: () => void;
  reGetUser: () => void;
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: [],
  setUser: (value: GetUserResponse[]) => {},
  username: "",
  setUsername: (value: string) => {},
  password: "",
  setPassword: (value: string) => {},
  major: "",
  setMajor: (value: string) => {},
  permission: "",
  setPermission: (value: string) => {},
  handlerSubmit: () => {},
  reGetUser: () => {},
  isShowModal: false,
  setIsShowModal: (value: boolean) => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<GetUserResponse[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [permission, setPermission] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState(false);

  const reGetUser = useMemo(
    () => () => {
      UserServices.getUser().then((res) => {
        destroyTable();
        setUser(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      });
    },
    []
  );

  const insertUser = useMemo(
    () => (data: any) => {
      UserServices.insertUser(data)
        .then((res) => {
          AlertSuccess(res.data.message);
          reGetUser();
        })
        .catch((err) => {
          AlertError(err.response.data.message);
        });
    },
    [reGetUser]
  );

  const clearInputValue = () => {
    setUsername("");
    setPassword("");
    setMajor("");
    setPermission("");
    setIsShowModal(false);
  };

  const handlerSubmit = useMemo(
    () => () => {
      const baseInsert: UserRequest = {
        username,
        password,
        major,
        permission,
      };

      setIsShowModal(true);
      insertUser(camelToSnakeObject(baseInsert));
      clearInputValue();
    },
    [username, password, major, permission, insertUser]
  );

  useEffect(() => {
    UserServices.getUser()
      .then((res) => {
        destroyTable();
        setUser(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  }, []);

  const values = useMemo(
    () => ({
      user,
      setUser,
      username,
      setUsername,
      password,
      setPassword,
      major,
      setMajor,
      permission,
      setPermission,
      handlerSubmit,
      reGetUser,
      isShowModal,
      setIsShowModal,
    }),
    [
      user,
      setUser,
      username,
      setUsername,
      password,
      setPassword,
      major,
      setMajor,
      permission,
      setPermission,
      handlerSubmit,
      reGetUser,
      isShowModal,
      setIsShowModal,
    ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
