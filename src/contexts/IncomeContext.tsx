import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import GetIncomeResponse from "../Models/Response/GetIncomeResponse";

interface IncomeContextProps {
  incomeList: GetIncomeResponse[];
  setIncomeList: (value: GetIncomeResponse[]) => void;
  date: string;
  setDate: (value: string) => void;
  listName: string;
  setListName: (value: string) => void;
  revenue: number | string;
  setRevenue: (value: number | string) => void;
  expense: number | string;
  setExpense: (value: number | string) => void;
  note: string;
  setNote: (value: string) => void;
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
  clearInputValue: () => void;
  major: string;
  setMajor: (value: string) => void;
}

export const IncomeContext = createContext<IncomeContextProps>({
  incomeList: [],
  setIncomeList: (value: GetIncomeResponse[]) => {},
  date: "",
  setDate: (value: string) => {},
  listName: "",
  setListName: (value: string) => {},
  revenue: 0,
  setRevenue: (value: number | string) => {},
  expense: 0,
  setExpense: (value: number | string) => {},
  note: "",
  setNote: (value: string) => {},
  isShowModal: false,
  setIsShowModal: (value: boolean) => {},
  clearInputValue: () => {},
  major: "",
  setMajor: (value: string) => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function IncomeContextProvider({ children }: ChildrenProps) {
  const [incomeList, setIncomeList] = useState<GetIncomeResponse[]>([]);
  const [date, setDate] = useState<string>("");
  const [listName, setListName] = useState<string>("");
  const [revenue, setRevenue] = useState<number | string>(0);
  const [expense, setExpense] = useState<number | string>(0);
  const [note, setNote] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [major, setMajor] = useState<string>("");

  const clearInputValue = () => {
    setDate("");
    setListName("");
    setRevenue(0);
    setExpense(0);
    setNote("");
    setIsShowModal(false);
  };

  const values = useMemo(
    () => ({
      incomeList,
      setIncomeList,
      date,
      setDate,
      listName,
      setListName,
      revenue,
      setRevenue,
      expense,
      setExpense,
      note,
      setNote,
      clearInputValue,
      isShowModal,
      setIsShowModal,
      major,
      setMajor,
    }),
    [
      incomeList,
      setIncomeList,
      date,
      setDate,
      listName,
      setListName,
      revenue,
      setRevenue,
      expense,
      setExpense,
      note,
      setNote,
      clearInputValue,
      isShowModal,
      setIsShowModal,
      major,
      setMajor,
    ]
  );

  return (
    <IncomeContext.Provider value={values}>{children}</IncomeContext.Provider>
  );
}
