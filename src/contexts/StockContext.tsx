import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import initTable from "../common/DataTable";
import StockRequest, {
  StockEquipmentRequest,
  StockByeRequest,
  StockKayRequest,
  StockInstallmentPaymentRequest,
} from "../Models/Request/StockRequest";
import { GetStockResponse } from "../Models/Response/GetStockResponse";
import StockService from "../services/StockServices";

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
  setCases: (value: number | string) => void;
  setFirm: (value: number | string) => void;
  setLen: (value: number | string) => void;
  setBigCharge: (value: number | string) => void;
  setCharge: (value: number | string) => void;
  setRepair: (value: number | string) => void;
  setSum: (value: number | string) => void;
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
  setStockType: (value: string) => void;
  stock: GetStockResponse[];
  setStock: (value: GetStockResponse[]) => void;
  load: boolean;
  setLoad: (value: boolean) => void;
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
  setCases: (value: number | string) => {},
  setFirm: (value: number | string) => {},
  setLen: (value: number | string) => {},
  setBigCharge: (value: number | string) => {},
  setCharge: (value: number | string) => {},
  setRepair: (value: number | string) => {},
  setSum: (value: number | string) => {},
  setVersion: (value: string) => {},
  setPrice: (value: string) => {},
  setImei: (value: string) => {},
  setSource: (value: string) => {},
  setBattery: (value: string) => {},
  setCustomer: (value: string) => {},
  setTel: (value: string) => {},
  setStarMoney: (value: number | string) => {},
  setMonth: (value: number | string) => {},
  setInstallment: (value: number | string) => {},
  setDatePayment: (value: string) => {},
  setInstallmentNo: (value: string) => {},
  setPriceTotal: (value: number | string) => {},
  menuInsert: (stockType: string) => {},
  setShow: (value: boolean) => {},
  stockType: "",
  setStockType: (value: string) => {},
  stock: [],
  setStock: (value: GetStockResponse[]) => {},
  load: false,
  setLoad: (value: boolean) => {},
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
  const [battery, setBattery] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [starMoney, setStarMoney] = useState<number | string>(0);
  const [month, setMonth] = useState<number | string>(0);
  const [installment, setInstallment] = useState<number | string>(0);
  const [datePayment, setDatePayment] = useState<string>("");
  const [installmentNo, setInstallmentNo] = useState<number | string>(0);
  const [priceTotal, setPriceTotal] = useState<number | string>(0);
  const [stock, setStock] = useState<GetStockResponse[]>([]);
  const [load, setLoad] = useState(false);

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

  const insertStock = useMemo(
    () => (params: string) => {
      StockService.InsertStock(params)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    []
  );

  const handlerSubmit = useMemo(
    () => () => {
      const baseInsert: StockRequest = {
        date,
        idCard,
        customerStatus,
        stockType,
      };

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
            kay.imei +
            "&start_money=" +
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
          setStock(res.data);
          setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
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
        setStock(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await StockService.GetStock()
        .then((res) => {
          setLoad(true);
          setStock(res.data);
          setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };
    fetchData();
  }, []);

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
      setStockType,
      stock,
      setStock,
      load,
      setLoad,
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
      setStockType,
      stock,
      setStock,
      load,
      setLoad,
    ]
  );

  return (
    <StockContext.Provider value={values}>{children}</StockContext.Provider>
  );
}
