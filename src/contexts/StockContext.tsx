import { createContext, ReactNode, useMemo, useState } from "react";

interface StockContextProps {
  show: boolean;
  toggleShow: () => void;
  setDate: (value: string) => void;
  isMenuInsert: boolean;
  byeMenuInsert: boolean;
  kayMenuInsert: boolean;
  installmentMenuInsert: boolean;
  handlerSubmit: () => void;
  toggleClose: () => void;
  setIdCard: (value: string) => void;
  setCustomerStatus: (value: string) => void;
  setCases: (value: string) => void;
  setFirm: (value: string) => void;
  setLen: (value: string) => void;
  setBigCharge: (value: string) => void;
  setCharge: (value: string) => void;
  setRepair: (value: string) => void;
  setSum: (value: string) => void;
  setVersion: (value: string) => void;
  setPrice: (value: string) => void;
  setImei: (value: string) => void;
  setSource: (value: string) => void;
  setBattery: (value: string) => void;
  setCustomer: (value: string) => void;
  setTel: (value: string) => void;
  setStarMoney: (value: string) => void;
  setMonth: (value: string) => void;
  setInstallment: (value: string) => void;
  setDatePayment: (value: string) => void;
  setInstallmentNo: (value: string) => void;
  setPriceTotal: (value: string) => void;
  menuInsert: (stockType: string) => void;
  setShow: (value: boolean) => void;
  stockType: string;
}

export const StockContext = createContext<StockContextProps>({
  show: false,
  toggleShow: () => {},
  setDate: (value: string) => {},
  isMenuInsert: false,
  byeMenuInsert: false,
  kayMenuInsert: false,
  installmentMenuInsert: false,
  handlerSubmit: () => {},
  toggleClose: () => {},
  setIdCard: (value: string) => {},
  setCustomerStatus: (value: string) => {},
  setCases: (value: string) => {},
  setFirm: (value: string) => {},
  setLen: (value: string) => {},
  setBigCharge: (value: string) => {},
  setCharge: (value: string) => {},
  setRepair: (value: string) => {},
  setSum: (value: string) => {},
  setVersion: (value: string) => {},
  setPrice: (value: string) => {},
  setImei: (value: string) => {},
  setSource: (value: string) => {},
  setBattery: (value: string) => {},
  setCustomer: (value: string) => {},
  setTel: (value: string) => {},
  setStarMoney: (value: string) => {},
  setMonth: (value: string) => {},
  setInstallment: (value: string) => {},
  setDatePayment: (value: string) => {},
  setInstallmentNo: (value: string) => {},
  setPriceTotal: (value: string) => {},
  menuInsert: (stockType: string) => {},
  setShow: (value: boolean) => {},
  stockType: "",
});

interface ChildrenProps {
  children: ReactNode;
}

export function StockContextProvider({ children }: ChildrenProps) {
  const [show, setShow] = useState(false);
  const [isMenuInsert, setIsMenuInsert] = useState(false);
  const [byeMenuInsert, setByeMenuInsert] = useState(false);
  const [kayMenuInsert, setKayMenuInsert] = useState(false);
  const [installmentMenuInsert, setInstallmentMenuInsert] = useState(false);
  const [date, setDate] = useState<string>("");
  const [idCard, setIdCard] = useState("");
  const [customerStatus, setCustomerStatus] = useState("");
  const [stockType, setStockType] = useState("");
  const [cases, setCases] = useState("");
  const [firm, setFirm] = useState("");
  const [len, setLen] = useState("");
  const [bigCharge, setBigCharge] = useState("");
  const [charge, setCharge] = useState("");
  const [repair, setRepair] = useState("");
  const [sum, setSum] = useState("");
  const [version, setVersion] = useState("");
  const [price, setPrice] = useState("");
  const [imei, setImei] = useState("");
  const [source, setSource] = useState("");
  const [battery, setBattery] = useState("");
  const [customer, setCustomer] = useState("");
  const [tel, setTel] = useState("");
  const [starMoney, setStarMoney] = useState("");
  const [month, setMonth] = useState("");
  const [installment, setInstallment] = useState("");
  const [datePayment, setDatePayment] = useState("");
  const [installmentNo, setInstallmentNo] = useState("");
  const [priceTotal, setPriceTotal] = useState("");

  const toggleShow = useMemo(() => () => setShow(true), []);
  const toggleClose = useMemo(() => () => setShow(false), []);

  const menuInsert = useMemo(
    () => (stockType: string) => {
      switch (stockType) {
        case "อุปกรณ์":
          setIsMenuInsert(true);
          setByeMenuInsert(false);
          setKayMenuInsert(false);
          setInstallmentMenuInsert(false);
          break;
        case "ซื้อ":
          setByeMenuInsert(true);
          setIsMenuInsert(false);
          setKayMenuInsert(false);
          setInstallmentMenuInsert(false);
          break;
        case "ขาย":
          setKayMenuInsert(true);
          setInstallmentMenuInsert(false);
          setByeMenuInsert(false);
          setIsMenuInsert(false);
          break;
        case "ผ่อน":
          setInstallmentMenuInsert(true);
          setByeMenuInsert(false);
          setIsMenuInsert(false);
          setKayMenuInsert(false);
          break;
      }
    },
    []
  );

  const handlerSubmit = useMemo(
    () => () => {
      if (stockType === "อุปกรณ์") {
        let data = {
          DATE: date,
          ID_CARD: idCard,
          CUSTOMER_STATUS: customerStatus,
          STOCK_TYPE: stockType,
          CASES: cases,
          FIRM: firm,
          LEN: len,
          Big_Charge: bigCharge,
          CHARGE: charge,
          REPAIR: repair,
          SUM: sum,
        };

        console.log(data);
      } else if (stockType === "ซื้อ") {
        let data = {
          DATE: date,
          ID_CARD: idCard,
          CUSTOMER_STATUS: customerStatus,
          STOCK_TYPE: stockType,
          VERSION: version,
          PRICE: price,
          IMEI: imei,
          SOURCE: source,
          BATTERY: battery,
        };

        console.log(data);
      } else if (stockType === "ขาย") {
        let data = {
          date: date,
          id_card: idCard,
          CUSTOMER_STATUS: customerStatus,
          stock_type: stockType,
          CUSTOMER: customer,
          TEL: tel,
          VERSION: version,
          IMEI: imei,
          START_MONEY: starMoney,
          MONTH: month,
          INSTALLMENT: installment,
          DATE_PAYMENT: datePayment,
        };

        console.log(data);
      } else {
        let data = {
          DATE: date,
          ID_CARD: idCard,
          CUSTOMER_STATUS: customerStatus,
          STOCK_TYPE: stockType,
          INSTALLMENT_NO: installmentNo,
          PRICE_TOTAL: priceTotal,
        };

        console.log(data);
      }
      console.log(stockType);
    },
    [
      battery,
      bigCharge,
      cases,
      charge,
      customer,
      customerStatus,
      date,
      datePayment,
      firm,
      idCard,
      imei,
      installment,
      installmentNo,
      len,
      month,
      price,
      priceTotal,
      repair,
      source,
      starMoney,
      stockType,
      sum,
      tel,
      version,
    ]
  );

  const values = useMemo(
    () => ({
      show,
      toggleShow,
      setDate,
      isMenuInsert,
      byeMenuInsert,
      kayMenuInsert,
      installmentMenuInsert,
      handlerSubmit,
      toggleClose,
      setIdCard,
      setCustomerStatus,
      setCases,
      setFirm,
      setLen,
      setBigCharge,
      setCharge,
      setRepair,
      setSum,
      setVersion,
      setPrice,
      setImei,
      setSource,
      setBattery,
      setCustomer,
      setTel,
      setStarMoney,
      setMonth,
      setInstallment,
      setDatePayment,
      setInstallmentNo,
      setPriceTotal,
      menuInsert,
      setShow,
      stockType,
    }),
    [
      show,
      toggleShow,
      setDate,
      isMenuInsert,
      byeMenuInsert,
      kayMenuInsert,
      installmentMenuInsert,
      handlerSubmit,
      toggleClose,
      setIdCard,
      setCustomerStatus,
      setCases,
      setFirm,
      setLen,
      setBigCharge,
      setCharge,
      setRepair,
      setSum,
      setVersion,
      setPrice,
      setImei,
      setSource,
      setBattery,
      setCustomer,
      setTel,
      setStarMoney,
      setMonth,
      setInstallment,
      setDatePayment,
      setInstallmentNo,
      setPriceTotal,
      menuInsert,
      setShow,
      stockType,
    ]
  );

  return (
    <StockContext.Provider value={values}>{children}</StockContext.Provider>
  );
}
