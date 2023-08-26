import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";
import initTable, { destroyTable } from "../common/DataTable";
import { AlertError, AlertSuccess, AlertWarning } from "../common/ToastrCommon";
import StockRequest, {
  StockEquipmentRequest,
  StockByeRequest,
  StockKayRequest,
  StockInstallmentPaymentRequest,
  StockFirstInstallmentRequest,
} from "../Models/Request/StockRequest";
import { GetStockResponse } from "../Models/Response/GetStockResponse";
import StockService from "../services/StockServices";
import { AppContext } from "./index";
import { useNavigate } from "react-router-dom";

interface StockContextProps {
  date: string;
  setDate: (value: string) => void;
  isMenuInsert: boolean;
  setIsMenuInsert: (value: boolean) => void;
  byeMenuInsert: boolean;
  setByeMenuInsert: (value: boolean) => void;
  kayMenuInsert: boolean;
  setKayMenuInsert: (value: boolean) => void;
  NewInstallmentMenuInsert: boolean;
  setNewInstallmentMenuInsert: (value: boolean) => void;
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
  setInstallmentNo: (value: number) => void;
  priceTotal: number | string;
  setPriceTotal: (value: string) => void;
  menuInsert: (stockType: string) => void;
  stockType: string;
  setStockType: (value: string) => void;
  stock: GetStockResponse[];
  setStock: (value: GetStockResponse[]) => void;
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
  majorInsert: string;
  setMajorInsert: (value: string) => void;
  clearInputValue: () => void;
  installmentMonth: string;
  setInstallmentMonth: (value: string) => void;
  numberInstallment: string;
  setNumberInstallment: (value: string) => void;
  payment: string;
  setPayment: (value: string) => void;
  newDatePayment: string;
  setNewDatePayment: (value: string) => void;
  newPriceTotal: string;
  setNewPriceTotal: (value: string) => void;
  newStarMoney: string;
  setNewStarMoney: (value: string) => void;
  serialNumber: string;
  setSerialNumber: (value: string) => void;
}

export const StockContext = createContext<StockContextProps>({
  date: "",
  setDate: (value: string) => {},
  isMenuInsert: false,
  setIsMenuInsert: (value: boolean) => {},
  byeMenuInsert: false,
  setByeMenuInsert: (value: boolean) => {},
  kayMenuInsert: false,
  setKayMenuInsert: (value: boolean) => {},
  NewInstallmentMenuInsert: false,
  setNewInstallmentMenuInsert: (value: boolean) => {},
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
  setInstallmentNo: (value: number) => {},
  priceTotal: 0,
  setPriceTotal: (value: number | string) => {},
  menuInsert: (stockType: string) => {},
  stockType: "",
  setStockType: (value: string) => {},
  stock: [],
  setStock: (value: GetStockResponse[]) => {},
  isShowModal: false,
  setIsShowModal: (value: boolean) => {},
  majorInsert: "",
  setMajorInsert: (value: string) => {},
  clearInputValue: () => {},
  installmentMonth: "0",
  setInstallmentMonth: (value: string) => {},
  numberInstallment: "0",
  setNumberInstallment: (value: string) => {},
  payment: "0",
  setPayment: (value: string) => {},
  newDatePayment: "0",
  setNewDatePayment: (value: string) => {},
  newPriceTotal: "0",
  setNewPriceTotal: (value: string) => {},
  newStarMoney: "0",
  setNewStarMoney: (value: string) => {},
  serialNumber: "",
  setSerialNumber: (value: string) => {},
});

interface ChildrenProps {
  children: ReactNode;
}

export function StockContextProvider({ children }: ChildrenProps) {
  const [isMenuInsert, setIsMenuInsert] = useState(false);
  const [byeMenuInsert, setByeMenuInsert] = useState(false);
  const [kayMenuInsert, setKayMenuInsert] = useState(false);
  const [NewInstallmentMenuInsert, setNewInstallmentMenuInsert] =
    useState(false);
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
  const [majorInsert, setMajorInsert] = useState<string>("");
  const { majorUser, setIsLoading } = useContext(AppContext);
  const [installmentMonth, setInstallmentMonth] = useState("0");
  const [numberInstallment, setNumberInstallment] = useState("0");
  const [payment, setPayment] = useState("0");
  const [newDatePayment, setNewDatePayment] = useState("1");
  const [newPriceTotal, setNewPriceTotal] = useState("0");
  const [newStarMoney, setNewStarMoney] = useState("0");
  const [serialNumber, setSerialNumber] = useState("");
  const navigate = useNavigate();

  const menuInsert = useMemo(
    () => (stockType: string) => {
      switch (stockType) {
        case "อุปกรณ์":
          setIsMenuInsert(true);
          setByeMenuInsert(false);
          setKayMenuInsert(false);
          setInstallmentMenuInsert(false);
          setNewInstallmentMenuInsert(false);
          break;
        case "ซื้อ":
          setByeMenuInsert(true);
          setIsMenuInsert(false);
          setKayMenuInsert(false);
          setInstallmentMenuInsert(false);
          setNewInstallmentMenuInsert(false);
          break;
        case "ขาย":
          setKayMenuInsert(true);
          setInstallmentMenuInsert(false);
          setByeMenuInsert(false);
          setIsMenuInsert(false);
          setNewInstallmentMenuInsert(false);
          break;
        case "ผ่อน":
          setInstallmentMenuInsert(true);
          setByeMenuInsert(false);
          setIsMenuInsert(false);
          setKayMenuInsert(false);
          setNewInstallmentMenuInsert(false);
          break;
        case "ผ่อนครั้งแรก":
          setInstallmentMenuInsert(false);
          setByeMenuInsert(false);
          setIsMenuInsert(false);
          setKayMenuInsert(false);
          setNewInstallmentMenuInsert(true);
          break;
      }
    },
    []
  );

  const insertStock = useMemo(
    () => (params: string) => {
      setIsLoading(true);
      StockService.InsertStock(params)
        .then((res) => {
          AlertSuccess(res.data.message);
          setIsLoading(false);
        })
        .catch((err) => {
          AlertError(err.response.data.message);
          setIsLoading(false);
        });
    },
    []
  );

  const clearInputValue = () => {
    setNewStarMoney("0");
    setNewPriceTotal("0");
    setNewDatePayment("1");
    setPayment("0");
    setNumberInstallment("0");
    setInstallmentMonth("0");
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
    setSerialNumber("");
    setIsShowModal(false);
  };

  const handlerSubmit = useMemo(
    () => () => {
      const baseInsert: StockRequest = {
        date,
        invoice: "",
        customerStatus,
        stockType,
        major: majorUser === "admin" ? majorInsert : majorUser,
      };
      if (baseInsert.date === "") {
        AlertWarning("กรุณากรอกวันที่");
      } else if (baseInsert.stockType === "") {
        AlertWarning("กรุณาเลือกประเภท");
      } else {
        setIsShowModal(true);
        var baseParams =
          "?date=" +
          baseInsert.date +
          "&id_card=" +
          baseInsert.invoice +
          "&customer_status=" +
          baseInsert.customerStatus +
          "&stock_type=" +
          baseInsert.stockType +
          "&major=" +
          baseInsert.major;

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

            if (
              equipment.cases === "" ||
              equipment.firm === "" ||
              equipment.len === "" ||
              equipment.bigCharge === "" ||
              equipment.charge === "" ||
              equipment.repair === "" ||
              equipment.sum === ""
            ) {
              AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
            } else {
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
            }
            break;
          case "ซื้อ":
            const bye: StockByeRequest = {
              ...baseInsert,
              serialNumber: serialNumber,
              version: version,
              price: Number(price),
              imei: imei,
              source: source,
              battery: battery,
            };

            if (
              bye.serialNumber === "" ||
              bye.version === "" ||
              bye.price === "" ||
              bye.imei === "" ||
              bye.source === "" ||
              bye.battery === ""
            ) {
              AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
            } else {
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
                bye.battery +
                "&serial_number=" +
                bye.serialNumber;

              insertStock(params);
            }
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

            if (
              kay.customer === "" ||
              kay.tel === "" ||
              kay.version === "" ||
              kay.imei === "" ||
              kay.starMoney === "" ||
              kay.month === "" ||
              kay.installment === "" ||
              kay.datePayment === ""
            ) {
              AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
            } else {
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
            }
            break;
          case "ผ่อนครั้งแรก":
            const firstInstallment: StockFirstInstallmentRequest = {
              ...baseInsert,
              installmentMonth,
              numberInstallment,
              payment,
              datePayment: newDatePayment,
              priceTotal: newPriceTotal,
              starMoney: newStarMoney,
            };
            if (
              firstInstallment.installmentMonth === undefined ||
              firstInstallment.numberInstallment === undefined ||
              firstInstallment.payment === undefined ||
              firstInstallment.datePayment === undefined ||
              firstInstallment.priceTotal === undefined ||
              firstInstallment.starMoney === undefined
            ) {
              AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
            } else {
              params =
                baseParams +
                "&installment_month=" +
                firstInstallment.installmentMonth +
                "&number_installment=" +
                firstInstallment.numberInstallment +
                "&payment=" +
                firstInstallment.payment +
                "&date_payment=" +
                firstInstallment.datePayment +
                "&price_total=" +
                firstInstallment.priceTotal +
                "&star_money=" +
                firstInstallment.starMoney;

              insertStock(params);
            }
            break;
          default:
            const installmentPayment: StockInstallmentPaymentRequest = {
              ...baseInsert,
              installmentNo: Number(installmentNo),
              priceTotal: Number(priceTotal),
            };

            if (
              installmentPayment.installmentNo === "" ||
              installmentPayment.priceTotal === ""
            ) {
              AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
            } else {
              params =
                baseParams +
                "&installment_no=" +
                installmentPayment.installmentNo +
                "&price_total=" +
                installmentPayment.priceTotal;

              insertStock(params);
            }
            break;
        }
        setIsLoading(true);
        StockService.GetStock(majorUser)
          .then(() => {
            clearInputValue();
            navigate("/stock");
            setIsLoading(false);
          })
          .catch((err) => {
            AlertError(err.response.data.message);
            setIsLoading(false);
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
      installmentMonth,
      numberInstallment,
      payment,
      newDatePayment,
      newPriceTotal,
      newStarMoney,
    ]
  );

  useEffect(() => {
    setIsLoading(true);
    StockService.GetStock(majorUser)
      .then((res) => {
        destroyTable();
        setStock(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  }, []);

  const values = useMemo(
    () => ({
      date,
      setDate,
      isMenuInsert,
      setIsMenuInsert,
      byeMenuInsert,
      setByeMenuInsert,
      kayMenuInsert,
      setKayMenuInsert,
      NewInstallmentMenuInsert,
      setNewInstallmentMenuInsert,
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
      majorInsert,
      setMajorInsert,
      clearInputValue,
      installmentMonth,
      setInstallmentMonth,
      numberInstallment,
      setNumberInstallment,
      payment,
      setPayment,
      newDatePayment,
      setNewDatePayment,
      newPriceTotal,
      setNewPriceTotal,
      newStarMoney,
      setNewStarMoney,
      serialNumber,
      setSerialNumber,
    }),
    [
      date,
      setDate,
      isMenuInsert,
      setIsMenuInsert,
      byeMenuInsert,
      setByeMenuInsert,
      kayMenuInsert,
      setKayMenuInsert,
      NewInstallmentMenuInsert,
      setNewInstallmentMenuInsert,
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
      majorInsert,
      setMajorInsert,
      clearInputValue,
      installmentMonth,
      setInstallmentMonth,
      numberInstallment,
      setNumberInstallment,
      payment,
      setPayment,
      newDatePayment,
      setNewDatePayment,
      newPriceTotal,
      setNewPriceTotal,
      newStarMoney,
      setNewStarMoney,
      serialNumber,
      setSerialNumber,
    ]
  );

  return (
    <StockContext.Provider value={values}>{children}</StockContext.Provider>
  );
}
