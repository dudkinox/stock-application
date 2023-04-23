import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import initTable, { destroyTable } from "../common/DataTable";
import GetIncomeResponse from "../Models/Response/GetIncomeResponse";
import incomeServices from "../services/IncomeServices";
import { AlertError } from "../common/ToastrCommon";
import GetIncomeRequest from "../Models/Request/GetIncomeRequest";

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
  insertHandler: () => void;
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
  insertHandler: () => {},
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

  const insertHandler = useMemo(
    () => () => {
      const payload: GetIncomeRequest = {
        DATE: date,
        LIST_NAME: listName,
        REVENUE: revenue,
        EXPENSE: expense,
        NOTE: note,
      };

      incomeServices
        .InsertIncomeList(payload)
        .then((res: any) => {})
        .catch((err: any) => {});
    },
    [date, listName, revenue, expense, note]
  );

  useEffect(() => {
    incomeServices
      .getAll()
      .then((res: any) => {
        destroyTable("income-table");
        setIncomeList(res.data);
        setTimeout(
          () => initTable(res.data.length.toString() ?? "0", "income-table"),
          100
        );
      })
      .catch((err: any) => {
        AlertError(err.response.data.message);
      });
  }, []);

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
      insertHandler,
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
      insertHandler,
    ]
  );

  return (
    <IncomeContext.Provider value={values}>{children}</IncomeContext.Provider>
  );
}