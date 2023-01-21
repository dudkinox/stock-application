import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import initTable, { destroyTable } from "../common/DataTable";
import { AlertError, AlertSuccess, AlertWarning } from "../common/ToastrCommon";
import StockRequest, {
  StockEquipmentRequest,
  StockByeRequest,
  StockKayRequest,
  StockInstallmentPaymentRequest,
} from "../Models/Request/StockRequest";
import { GetStockResponse } from "../Models/Response/GetStockResponse";
import StockService from "../services/StockServices";

interface StockContextProps {
  date: string;
  setDate: (value: string) => void;
  isMenuInsert: boolean;
  byeMenuInsert: boolean;
  kayMenuInsert: boolean;
  installmentMenuInsert: boolean;
  handlerSubmit: () => void;
  idCard: string;
  setIdCard: (value: string) => void;
  customerStatus: string;
  setCustomerStatus: (value: string) => void;
  cases: number | string;
  setCases: (value: number | string) => void;
  firm: number | string;
  setFirm: (value: number | string) => void;
  len: number | string;
  setLen: (value: number | string) => void;
  bigCharge: number | string;
  setBigCharge: (value: number | string) => void;
  charge: number | string;
  setCharge: (value: number | string) => void;
  repair: number | string;
  setRepair: (value: number | string) => void;
  sum: number | string;
  setSum: (value: number | string) => void;
  version: string;
  setVersion: (value: string) => void;
  price: number | string;
  setPrice: (value: string) => void;
  imei: string;
  setImei: (value: string) => void;
  source: number | string;
  setSource: (value: string) => void;
  battery: number | string;
  setBattery: (value: string) => void;
  customer: string;
  setCustomer: (value: string) => void;
  tel: string;
  setTel: (value: string) => void;
  starMoney: number | string;
  setStarMoney: (value: string) => void;
  month: number | string;
  setMonth: (value: string) => void;
  installment: number | string;
  setInstallment: (value: string) => void;
  datePayment: string;
  setDatePayment: (value: string) => void;
  installmentNo: number | string;
  setInstallmentNo: (value: string) => void;
  priceTotal: number | string;
  setPriceTotal: (value: string) => void;
  menuInsert: (stockType: string) => void;
  stockType: string;
  setStockType: (value: string) => void;
  stock: GetStockResponse[];
  setStock: (value: GetStockResponse[]) => void;
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
}

export const StockContext = createContext<StockContextProps>({
  date: "",
  setDate: (value: string) => {},
  isMenuInsert: false,
  byeMenuInsert: false,
  kayMenuInsert: false,
  installmentMenuInsert: false,
  handlerSubmit: () => {},
  idCard: "",
  setIdCard: (value: string) => {},
  customerStatus: "",
  setCustomerStatus: (value: string) => {},
  cases: 0,
  setCases: (value: number | string) => {},
  firm: 0,
  setFirm: (value: number | string) => {},
  len: 0,
  setLen: (value: number | string) => {},
  bigCharge: 0,
  setBigCharge: (value: number | string) => {},
  charge: 0,
  setCharge: (value: number | string) => {},
  repair: 0,
  setRepair: (value: number | string) => {},
  sum: 0,
  setSum: (value: number | string) => {},
  version: "",
  setVersion: (value: string) => {},
  price: 0,
  setPrice: (value: string) => {},
  imei: "",
  setImei: (value: string) => {},
  source: 0,
  setSource: (value: string) => {},
  battery: 0,
  setBattery: (value: string) => {},
  customer: "",
  setCustomer: (value: string) => {},
  tel: "",
  setTel: (value: string) => {},
  starMoney: 0,
  setStarMoney: (value: number | string) => {},
  month: 0,
  setMonth: (value: number | string) => {},
  installment: 0,
  setInstallment: (value: number | string) => {},
  datePayment: "",
  setDatePayment: (value: string) => {},
  installmentNo: 0,
  setInstallmentNo: (value: string) => {},
  priceTotal: 0,
  setPriceTotal: (value: number | string) => {},
  menuInsert: (stockType: string) => {},
  stockType: "",
  setStockType: (value: string) => {},
  stock: [],
  setStock: (value: GetStockResponse[]) => {},
  isShowModal: false,
  setIsShowModal: (value: boolean) => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function StockContextProvider({ children }: ChildrenProps) {
  const [isMenuInsert, setIsMenuInsert] = useState(false);
  const [byeMenuInsert, setByeMenuInsert] = useState(false);
  const [kayMenuInsert, setKayMenuInsert] = useState(false);
  const [installmentMenuInsert, setInstallmentMenuInsert] = useState(false);
  const [date, setDate] = useState<string>("");
  const [idCard, setIdCard] = useState<string>("");
  const [customerStatus, setCustomerStatus] = useState<string>("");
  const [stockType, setStockType] = useState("");
  const [cases, setCases] = useState<number | string>(0);
  const [firm, setFirm] = useState<number | string>(0);
  const [len, setLen] = useState<number | string>(0);
  const [bigCharge, setBigCharge] = useState<number | string>(0);
  const [charge, setCharge] = useState<number | string>(0);
  const [repair, setRepair] = useState<number | string>(0);
  const [sum, setSum] = useState<number | string>(0);
  const [version, setVersion] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [imei, setImei] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [battery, setBattery] = useState<string>("0");
  const [customer, setCustomer] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [starMoney, setStarMoney] = useState<number | string>(0);
  const [month, setMonth] = useState<number | string>(0);
  const [installment, setInstallment] = useState<number | string>(0);
  const [datePayment, setDatePayment] = useState<string>("0");
  const [installmentNo, setInstallmentNo] = useState<number | string>(0);
  const [priceTotal, setPriceTotal] = useState<number | string>(0);
  const [stock, setStock] = useState<GetStockResponse[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);

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

  const insertStock = useMemo(
    () => (params: string) => {
      StockService.InsertStock(params)
        .then((res) => {
          AlertSuccess(res.data.message);
        })
        .catch((err) => {
          AlertError(err.response.data.message);
        });
    },
    []
  );

  const clearInputValue = () => {
    setDate("");
    setIdCard("");
    setCustomerStatus("");
    setStockType("");
    setFirm("");
    setLen("");
    setBigCharge("");
    setCharge("");
    setRepair("");
    setSum("");
    setVersion("");
    setPrice("");
    setImei("");
    setSource("");
    setBattery("");
    setCustomer("");
    setTel("");
    setStarMoney("");
    setMonth("");
    setInstallment("");
    setDatePayment("");
    setInstallmentNo("");
    setPriceTotal("");
    setIsShowModal(false);
  };

  const handlerSubmit = useMemo(
    () => () => {
      const baseInsert: StockRequest = {
        date,
        idCard,
        customerStatus,
        stockType,
      };

      if (baseInsert.date === "") {
        AlertWarning("กรุณากรอกวันที่");
      } else if (baseInsert.idCard.length !== 13) {
        AlertWarning("กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก");
      } else if (baseInsert.customerStatus === "") {
        AlertWarning("กรุณาเลือกประวัติลุกค้า");
      } else if (baseInsert.stockType === "") {
        AlertWarning("กรุณาเลือกประเภท");
      } else {
        setIsShowModal(true);
        var baseParams =
          "?date=" +
          baseInsert.date +
          "&id_card=" +
          baseInsert.idCard +
          "&customer_status=" +
          baseInsert.customerStatus +
          "&stock_type=" +
          baseInsert.stockType;

        var params = "";
        switch (stockType) {
          case "อุปกรณ์":
            const equipment: StockEquipmentRequest = {
              ...baseInsert,
              cases: Number(cases),
              firm: Number(firm),
              len: Number(len),
              bigCharge: Number(bigCharge),
              charge: Number(charge),
              repair: Number(repair),
              sum: Number(sum),
            };

            params =
              baseParams +
              "&cases=" +
              equipment.cases +
              "&firm=" +
              equipment.firm +
              "&len=" +
              equipment.len +
              "&big_charge=" +
              equipment.bigCharge +
              "&charge=" +
              equipment.charge +
              "&repair=" +
              equipment.repair +
              "&sum=" +
              equipment.sum;
            insertStock(params);
            break;
          case "ซื้อ":
            const bye: StockByeRequest = {
              ...baseInsert,
              version: version,
              price: Number(price),
              imei: imei,
              source: source,
              battery: battery,
            };

            params =
              baseParams +
              "&version=" +
              bye.version +
              "&price=" +
              bye.price +
              "&imei=" +
              bye.imei +
              "&source=" +
              bye.source +
              "&battery=" +
              bye.battery;

            insertStock(params);
            break;
          case "ขาย":
            const kay: StockKayRequest = {
              ...baseInsert,
              customer: customer,
              tel: tel,
              version: version,
              imei: imei,
              starMoney: starMoney,
              month: month,
              installment: installment,
              datePayment: datePayment,
            };

            params =
              baseParams +
              "&customer=" +
              kay.customer +
              "&tel=" +
              kay.tel +
              "&version=" +
              kay.version +
              "&imei=" +
              kay.imei +
              "&star_money=" +
              kay.starMoney +
              "&month=" +
              kay.month +
              "&installment=" +
              kay.installment +
              "&date_payment=" +
              kay.datePayment;

            insertStock(params);
            break;
          default:
            const installmentPayment: StockInstallmentPaymentRequest = {
              ...baseInsert,
              installmentNo: Number(installmentNo),
              priceTotal: Number(priceTotal),
            };

            params =
              baseParams +
              "&installment_no=" +
              installmentPayment.installmentNo +
              "&price_total" +
              installmentPayment.priceTotal;

            insertStock(params);
            break;
        }
        StockService.GetStock()
          .then((res) => {
            destroyTable();
            setStock(res.data);
            setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
            clearInputValue();
          })
          .catch((err) => {
            AlertError(err.response.data.message);
          });
      }
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
      insertStock,
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

  useEffect(() => {
    StockService.GetStock()
      .then((res) => {
        destroyTable();
        setStock(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  }, []);

  const values = useMemo(
    () => ({
      date,
      setDate,
      isMenuInsert,
      byeMenuInsert,
      kayMenuInsert,
      installmentMenuInsert,
      handlerSubmit,
      idCard,
      setIdCard,
      customerStatus,
      setCustomerStatus,
      cases,
      setCases,
      firm,
      setFirm,
      len,
      setLen,
      bigCharge,
      setBigCharge,
      charge,
      setCharge,
      repair,
      setRepair,
      sum,
      setSum,
      version,
      setVersion,
      price,
      setPrice,
      imei,
      setImei,
      source,
      setSource,
      battery,
      setBattery,
      customer,
      setCustomer,
      tel,
      setTel,
      starMoney,
      setStarMoney,
      month,
      setMonth,
      installment,
      setInstallment,
      datePayment,
      setDatePayment,
      installmentNo,
      setInstallmentNo,
      priceTotal,
      setPriceTotal,
      menuInsert,
      stockType,
      setStockType,
      stock,
      setStock,
      isShowModal,
      setIsShowModal,
    }),
    [
      date,
      isMenuInsert,
      byeMenuInsert,
      kayMenuInsert,
      installmentMenuInsert,
      handlerSubmit,
      idCard,
      customerStatus,
      cases,
      firm,
      len,
      bigCharge,
      charge,
      repair,
      sum,
      version,
      price,
      imei,
      source,
      battery,
      customer,
      tel,
      starMoney,
      month,
      installment,
      datePayment,
      installmentNo,
      priceTotal,
      menuInsert,
      stockType,
      stock,
      isShowModal,
      setIsShowModal,
    ]
  );

  return (
    <StockContext.Provider value={values}>{children}</StockContext.Provider>
  );
}
