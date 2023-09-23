import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import { camelToSnakeObject } from "../common/CamelToSnake";
import initTable, { destroyTable } from "../common/DataTable";
import { AlertError, AlertSuccess, AlertWarning } from "../common/ToastrCommon";
import { CustomerRequest } from "../Models/Request/CustomerRequest";
import { GetCustomerResponse } from "../Models/Response/GetCustomerResponse";
import CustomerServices from "../services/CustomerServices";
import { AppContext } from "./index";
import { StockContext } from "./StockContext";
import { useNavigate } from "react-router-dom";

interface CustomerContextProps {
  customer: GetCustomerResponse[];
  setCustomer: (value: GetCustomerResponse[]) => void;
  idCard: string;
  setIdCard: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  customerStatus: string;
  setCustomerStatus: (value: string) => void;
  process: string;
  setProcess: (value: string) => void;
  reGetCustomer: () => void;
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
  majorInsert: string;
  setMajorInsert: (value: string) => void;
  clearInputValue: () => void;
  handlerSubmit: (id?: string) => void;
}

export const CustomerContext = createContext<CustomerContextProps>({
  customer: [],
  setCustomer: (value: GetCustomerResponse[]) => {},
  idCard: "",
  setIdCard: (value: string) => {},
  name: "",
  setName: (value: string) => {},
  lastName: "",
  setLastName: (value: string) => {},
  customerStatus: "",
  setCustomerStatus: (value: string) => {},
  process: "",
  setProcess: (value: string) => {},
  handlerSubmit: (id?: string) => {},
  reGetCustomer: () => {},
  isShowModal: false,
  setIsShowModal: (value: boolean) => {},
  majorInsert: "",
  setMajorInsert: (value: string) => {},
  clearInputValue: () => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function CustomerContextProvider({ children }: ChildrenProps) {
  const { majorUser, setIsLoading } = useContext(AppContext);
  const stockContext = useContext(StockContext);
  const [customer, setCustomer] = useState<GetCustomerResponse[]>([]);
  const [idCard, setIdCard] = useState<string>(stockContext.idCard);
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [customerStatus, setCustomerStatus] = useState<string>("");
  const [process, setProcess] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [majorInsert, setMajorInsert] = useState<string>("");
  const navigate = useNavigate();

  const reGetCustomer = useMemo(
    () => () => {
      setIsLoading(true);
      CustomerServices.getCustomer(majorUser).then((res) => {
        destroyTable();
        setCustomer(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
        setIsLoading(false);
      });
    },
    []
  );

  const insertCustomer = useMemo(
    () => (data: any, id?: string) => {
      setIsLoading(true);
      CustomerServices.insertCustomer(data)
        .then((res) => {
          AlertSuccess(res.data.message);
          reGetCustomer();
          if (id !== undefined) {
            navigate(`/stock/add?type=kay`, {
              state: { id: id, insert: true },
            });
          } else {
            ($("#insert-modal") as any).modal("hide");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          AlertError(err.response.data.message);
          setIsLoading(false);
        });
    },
    [reGetCustomer]
  );

  const clearInputValue = () => {
    setIdCard("");
    setCustomerStatus("");
    setName("");
    setLastName("");
    setProcess("");
    setMajorInsert("");
    setIsShowModal(false);
  };

  const handlerSubmit = useMemo(
    () => (id?: string) => {
      const baseInsert: CustomerRequest = {
        idCard,
        name,
        lastName: lastName === "" ? "-" : lastName,
        process,
        customerStatus,
        major: majorUser === "admin" ? majorInsert : majorUser,
      };

      if (baseInsert.idCard.length !== 13) {
        AlertWarning("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก");
      } else if (baseInsert.name === "") {
        AlertWarning("กรุณากรอกชื่อ");
      } else if (
        baseInsert.process === "เลือกสถานะ" ||
        baseInsert.process === ""
      ) {
        AlertWarning("กรุณาเลือกเลือกสถานะ");
      } else if (
        baseInsert.customerStatus === "ประวัติลูกค้า" ||
        baseInsert.customerStatus === ""
      ) {
        AlertWarning("กรุณาเลือกประวัติลูกค้า");
      } else {
        setIsShowModal(true);
        insertCustomer(camelToSnakeObject(baseInsert), id);
        clearInputValue();
      }
    },
    [
      insertCustomer,
      idCard,
      name,
      lastName,
      process,
      customerStatus,
      majorUser,
      majorInsert,
    ]
  );

  useEffect(() => {
    setIsLoading(true);
    CustomerServices.getCustomer(majorUser)
      .then((res) => {
        destroyTable();
        setCustomer(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
        CustomerServices.notificationLine()
          .then(() => {
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            AlertError(err.response.data.message);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  }, []);

  const values = useMemo(
    () => ({
      customer,
      setCustomer,
      idCard,
      setIdCard,
      name,
      setName,
      lastName,
      setLastName,
      customerStatus,
      setCustomerStatus,
      process,
      setProcess,
      handlerSubmit,
      reGetCustomer,
      isShowModal,
      setIsShowModal,
      majorInsert,
      setMajorInsert,
      clearInputValue,
    }),
    [
      customer,
      setCustomer,
      idCard,
      setIdCard,
      name,
      setName,
      lastName,
      setLastName,
      customerStatus,
      setCustomerStatus,
      process,
      setProcess,
      handlerSubmit,
      reGetCustomer,
      isShowModal,
      setIsShowModal,
      majorInsert,
      setMajorInsert,
      clearInputValue,
    ]
  );

  return (
    <CustomerContext.Provider value={values}>
      {children}
    </CustomerContext.Provider>
  );
}
