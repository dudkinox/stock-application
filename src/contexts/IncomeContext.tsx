import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import GetIncomeResponse from "../Models/Response/GetIncomeResponse";

interface IncomeContextProps {
  incomeList: GetIncomeResponse[];
  setIncomeList: (value: GetIncomeResponse[]) => void;
  date: string;
  setDate: (value: string) => void;
  listName: string;
  setListName: (value: string) => void;
  revenue: number;
  setRevenue: (value: number) => void;
  expense: number;
  setExpense: (value: number) => void;
}

export const IncomeContext = createContext<IncomeContextProps>({
  incomeList: [],
  setIncomeList: (value: GetIncomeResponse[]) => {},
  date: "",
  setDate: (value: string) => {},
  listName: "",
  setListName: (value: string) => {},
  revenue: 0,
  setRevenue: (value: number) => {},
  expense: 0,
  setExpense: (value: number) => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function IncomeContextProvider({ children }: ChildrenProps) {
  const [incomeList, setIncomeList] = useState<GetIncomeResponse[]>([]);
  const [date, setDate] = useState<string>("");
  const [listName, setListName] = useState<string>("");
  const [revenue, setRevenue] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);

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
    ]
  );

  return (
    <IncomeContext.Provider value={values}>{children}</IncomeContext.Provider>
  );
}
