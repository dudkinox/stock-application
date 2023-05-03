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
  canEdit: boolean;
  setCanEdit: (value: boolean) => void;
  canDelete: boolean;
  setCanDelete: (value: boolean) => void;
  handlerSubmit: () => void;
  reGetUser: () => void;
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: [],
  setUser: (value: GetUserResponse[]) => { },
  username: "",
  setUsername: (value: string) => { },
  password: "",
  setPassword: (value: string) => { },
  major: "",
  setMajor: (value: string) => { },
  canEdit: false,
  setCanEdit: (value: boolean) => { },
  canDelete: false,
  setCanDelete: (value: boolean) => { },
  handlerSubmit: () => { },
  reGetUser: () => { },
  isShowModal: false,
  setIsShowModal: (value: boolean) => { },
});

interface ChildrenProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<GetUserResponse[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);

  const reGetUser = useMemo(
    () => async () => {
      try {
        const res = await UserServices.getUser();
        destroyTable();
        setUser(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      } catch (error) {
        console.error(error);
      }
    },
    [setUser]
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
    setCanEdit(false);
    setCanDelete(false);
    setIsShowModal(false);
  };

  const handlerSubmit = useMemo(
    () => () => {
      const baseInsert: UserRequest = {
        username,
        password,
        major,
        canEdit,
        canDelete,
      };
      UserServices.getUser().then((res: any) => {
        const users = res.data;
        const isUsernameExists = users.find((user: any) => user.USERNAME === baseInsert.username) !== undefined;

        if (isUsernameExists) {
          AlertError("ชื่อ username ซ้ำกรุณากรอกใหม่");
        } else {
          if (
            baseInsert.username === "" ||
            baseInsert.password === "" ||
            baseInsert.major === ""
          ) {
            AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
          } else {
            setIsShowModal(true);
            insertUser(camelToSnakeObject(baseInsert));
            clearInputValue();
          }

        }
      }).catch((err: any) => {
        console.log(err);
      })

    },
    [username, password, major, insertUser, canEdit, canDelete]
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
  }, [setUser]);

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
      canEdit,
      setCanEdit,
      canDelete,
      setCanDelete,
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
      canEdit,
      setCanEdit,
      canDelete,
      setCanDelete,
      handlerSubmit,
      reGetUser,
      isShowModal,
      setIsShowModal,
    ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
