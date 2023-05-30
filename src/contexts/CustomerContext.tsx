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
  totalPrice: number | string;
  setTotalPrice: (value: number | string) => void;
  installmentMonth: string;
  setInstallmentMonth: (value: string) => void;
  numberInstallment: string;
  setNumberInstallment: (value: string) => void;
  payment: string;
  setPayment: (value: string) => void;
  downpayment: string;
  setDownPayment: (value: string) => void;
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
  clearInputValue: () => void;
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
  totalPrice: 0,
  setTotalPrice: (value: number | string) => {},
  installmentMonth: "",
  setInstallmentMonth: (value: string) => {},
  numberInstallment: "",
  setNumberInstallment: (value: string) => {},
  payment: "",
  setPayment: (value: string) => {},
  downpayment: "",
  setDownPayment: (value: string) => {},
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
  const [totalPrice, setTotalPrice] = useState<number | string>(0);
  const [installmentMonth, setInstallmentMonth] = useState<string>("0");
  const [numberInstallment, setNumberInstallment] = useState<string>("0");
  const [payment, setPayment] = useState<string>("0");
  const [downpayment, setDownPayment] = useState<string>("0");
  const [datePayment, setDatePayment] = useState<string>("0");
  const [customerStatus, setCustomerStatus] = useState<string>("");
  const [process, setProcess] = useState<string>("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [majorInsert, setMajorInsert] = useState<string>("");

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
    () => (data: any) => {
      setIsLoading(true);
      CustomerServices.insertCustomer(data)
        .then((res) => {
          AlertSuccess(res.data.message);
          reGetCustomer();
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
    setTotalPrice("");
    setInstallmentMonth("");
    setNumberInstallment("");
    setPayment("");
    setDownPayment("");
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
        totalPrice,
        installmentMonth,
        numberInstallment,
        payment,
        downpayment,
        datePayment,
        customerStatus,
        process,
        major: majorUser === "admin" ? majorInsert : majorUser,
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
      } else if (
        baseInsert.totalPrice === "" ||
        baseInsert.payment === "" ||
        baseInsert.numberInstallment === "" ||
        baseInsert.installmentMonth === "" ||
        baseInsert.downpayment === ""
      ) {
        AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
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
      totalPrice,
      installmentMonth,
      numberInstallment,
      payment,
      downpayment,
      datePayment,
      customerStatus,
      process,
      insertCustomer,
      majorUser,
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
          .then((res) => {
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
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
      totalPrice,
      setTotalPrice,
      installmentMonth,
      setInstallmentMonth,
      numberInstallment,
      setNumberInstallment,
      payment,
      setPayment,
      downpayment,
      setDownPayment,
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
      totalPrice,
      setTotalPrice,
      installmentMonth,
      setInstallmentMonth,
      numberInstallment,
      setNumberInstallment,
      payment,
      setPayment,
      downpayment,
      setDownPayment,
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
      clearInputValue,
    ]
  );

  return (
    <CustomerContext.Provider value={values}>
      {children}
    </CustomerContext.Provider>
  );
}
