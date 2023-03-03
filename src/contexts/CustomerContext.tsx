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

interface CustomerContextProps {
  customer: GetCustomerResponse[];
  setCustomer: (value: GetCustomerResponse[]) => void;
  idCard: string;
  setIdCard: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  installmentMonth: string;
  setInstallmentMonth: (value: string) => void;
  numberInstallment: string;
  setNumberInstallment: (value: string) => void;
  payment: string;
  setPayment: (value: string) => void;
  datePayment: string;
  setDatePayment: (value: string) => void;
  customerStatus: string;
  setCustomerStatus: (value: string) => void;
  process: string;
  setProcess: (value: string) => void;
  handlerSubmit: () => void;
  reGetCustomer: () => void;
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
  majorInsert: string;
  setMajorInsert: (value: string) => void;
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
  installmentMonth: "",
  setInstallmentMonth: (value: string) => {},
  numberInstallment: "",
  setNumberInstallment: (value: string) => {},
  payment: "",
  setPayment: (value: string) => {},
  datePayment: "",
  setDatePayment: (value: string) => {},
  customerStatus: "",
  setCustomerStatus: (value: string) => {},
  process: "",
  setProcess: (value: string) => {},
  handlerSubmit: () => {},
  reGetCustomer: () => {},
  isShowModal: false,
  setIsShowModal: (value: boolean) => {},
  majorInsert: "",
  setMajorInsert: (value: string) => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function CustomerContextProvider({ children }: ChildrenProps) {
  const { majorUser } = useContext(AppContext);
  const stockContext = useContext(StockContext);
  const [customer, setCustomer] = useState<GetCustomerResponse[]>([]);
  const [idCard, setIdCard] = useState<string>(stockContext.idCard);
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [installmentMonth, setInstallmentMonth] = useState<string>("0");
  const [numberInstallment, setNumberInstallment] = useState<string>("0");
  const [payment, setPayment] = useState<string>("0");
  const [datePayment, setDatePayment] = useState<string>("0");
  const [customerStatus, setCustomerStatus] = useState<string>("");
  const [process, setProcess] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [majorInsert, setMajorInsert] = useState<string>("");

  const reGetCustomer = useMemo(
    () => () => {
      CustomerServices.getCustomer(majorUser).then((res) => {
        destroyTable();
        setCustomer(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      });
    },
    []
  );

  const insertCustomer = useMemo(
    () => (data: any) => {
      CustomerServices.insertCustomer(data)
        .then((res) => {
          AlertSuccess(res.data.message);
          reGetCustomer();
        })
        .catch((err) => {
          AlertError(err.response.data.message);
        });
    },
    [reGetCustomer]
  );

  const clearInputValue = () => {
    setIdCard("");
    setCustomerStatus("");
    setName("");
    setLastName("");
    setInstallmentMonth("");
    setNumberInstallment("");
    setPayment("");
    setDatePayment("");
    setProcess("");
    setIsShowModal(false);
  };

  const handlerSubmit = useMemo(
    () => () => {
      const baseInsert: CustomerRequest = {
        idCard,
        name,
        lastName,
        installmentMonth,
        numberInstallment,
        payment,
        datePayment,
        customerStatus,
        process,
        major: majorInsert,
      };

      if (baseInsert.idCard.length !== 13) {
        AlertWarning("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก");
      } else if (baseInsert.name === "") {
        AlertWarning("กรุณากรอกชื่อ");
      } else if (baseInsert.lastName === "") {
        AlertWarning("กรุณากรอกนามสกุล");
      } else if (baseInsert.datePayment === "0") {
        AlertWarning("กรุณาเลือกวันที่");
      } else if (
        baseInsert.customerStatus === "ประวัติลูกค้า" ||
        baseInsert.customerStatus === ""
      ) {
        AlertWarning("กรุณาเลือกประวัติลุกค้า");
      } else if (
        baseInsert.process === "เลือกสถานะ" ||
        baseInsert.process === ""
      ) {
        AlertWarning("กรุณาเลือกเลือกสถานะ");
      } else {
        setIsShowModal(true);
        insertCustomer(camelToSnakeObject(baseInsert));
        clearInputValue();
      }
    },
    [
      idCard,
      name,
      lastName,
      installmentMonth,
      numberInstallment,
      payment,
      datePayment,
      customerStatus,
      process,
      insertCustomer,
      majorUser,
    ]
  );

  useEffect(() => {
    CustomerServices.getCustomer(majorUser)
      .then((res) => {
        destroyTable();
        setCustomer(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);

        CustomerServices.notificationLine()
          .then((res) => {
            console.log("true");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        AlertError(err.response.data.message);
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
      installmentMonth,
      setInstallmentMonth,
      numberInstallment,
      setNumberInstallment,
      payment,
      setPayment,
      datePayment,
      setDatePayment,
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
      installmentMonth,
      setInstallmentMonth,
      numberInstallment,
      setNumberInstallment,
      payment,
      setPayment,
      datePayment,
      setDatePayment,
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
    ]
  );

  return (
    <CustomerContext.Provider value={values}>
      {children}
    </CustomerContext.Provider>
  );
}
