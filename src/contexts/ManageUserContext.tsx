import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { camelToSnakeObject } from "../common/CamelToSnake";
import initTable, { destroyTable } from "../common/DataTable";
import { AlertError, AlertSuccess, AlertWarning } from "../common/ToastrCommon";
import { GetUserResponse } from "../Models/Response/GetUserResponse";
import { UserRequest } from "../Models/Request/UserRequest";
import UserServices from "../services/UserServices";
import { AppContext } from ".";

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
  clearInputValue: () => void;
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
  clearInputValue: () => { },
});

interface ChildrenProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: ChildrenProps) {
  const { setIsLoading} = useContext(AppContext);
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
      setIsLoading(true);
      UserServices.insertUser(data)
        .then((res) => {
          AlertSuccess(res.data.message);
          reGetUser();
          setIsLoading(false);
        })
        .catch((err) => {
          AlertError(err.response.data.message);
          setIsLoading(false);
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
      setIsLoading(true);
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
        setIsLoading(false);
      }).catch((err: any) => {
        console.log(err);
        setIsLoading(false);
      })

    },
    [username, password, major, insertUser, canEdit, canDelete]
  );

  useEffect(() => {
    setIsLoading(true);
    UserServices.getUser()
      .then((res) => {
        destroyTable();
        setUser(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
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
      clearInputValue,
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
      clearInputValue,
    ]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
