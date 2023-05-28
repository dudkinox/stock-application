import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import MajorResponse from "../Models/Response/GetMajorResponse";
import MajorServices from "../services/MajorService";
import { AlertError } from "../common/ToastrCommon";
import DashboardServices from "../services/DashboardService";
import { AppContext } from ".";

interface DashboardContextProps {
  major: MajorResponse[];
  setMajor: (value: MajorResponse[]) => void;
  branch: string;
  setBranch: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  duration: string;
  setDuration: (value: string) => void;
  typeStock: string[];
  setTypeStock: (value: []) => void;
  totalSum: string;
  setTotalSum: (value: string) => void;
  totalProfit: string;
  setTotalProfit: (value: string) => void;
  desiredProfit: number;
  setDesiredProfit: (value: number) => void;
}

export const DashboardContext = createContext<DashboardContextProps>({
  major: [],
  setMajor: () => {},
  branch: "",
  setBranch: () => {},
  type: "",
  setType: () => {},
  duration: "",
  setDuration: () => {},
  typeStock: [],
  setTypeStock: () => {},
  totalSum: "",
  setTotalSum: () => {},
  totalProfit: "",
  setTotalProfit: () => {},
  desiredProfit: 0,
  setDesiredProfit: () => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: ChildrenProps) {
  const [major, setMajor] = useState<MajorResponse[]>([]);
  const { setIsLoading } = useContext(AppContext);
  const [typeStock, setTypeStock] = useState<[]>([]);
  const [branch, setBranch] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [duration, setDuration] = useState<string>("วัน");
  const [totalSum, setTotalSum] = useState<string>("");
  const [totalProfit, setTotalProfit] = useState<string>("");
  const [desiredProfit, setDesiredProfit] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    MajorServices.getMajors()
      .then((res) => {
        res.data.unshift({ ID: "0", NAME: "ทั้งหมด" });
        setMajor(res.data);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
    DashboardServices.getDashboards()
      .then((res) => {
        setTypeStock(res.data);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
    DashboardServices.getSumDate(branch, type, duration)
      .then((res) => {
        setDesiredProfit(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        major,
        setMajor,
        branch,
        setBranch,
        type,
        setType,
        duration,
        setDuration,
        typeStock: typeStock,
        setTypeStock: setTypeStock,
        totalSum,
        setTotalSum,
        totalProfit,
        setTotalProfit,
        desiredProfit,
        setDesiredProfit,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
