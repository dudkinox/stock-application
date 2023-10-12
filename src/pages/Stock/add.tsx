import { useContext, useEffect } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import { StockContext } from "../../contexts/StockContext";
import IsMenuInsert from "../../layouts/stock/IsMenuInsert";
import ByeMenuInsert from "../../layouts/stock/ByeMenuInsert";
import InstallmentMenuInsert from "../../layouts/stock/InstallmentMenuInsert";
import KayMenuInsert from "../../layouts/stock/KayMenuInsert";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts";
import StockRequest from "../../Models/Request/StockRequest";
import StockService from "../../services/StockServices";
import { AlertError, AlertSuccess } from "../../common/ToastrCommon";
import { PathEnum } from "../../enum/path.enum";
import { camelToSnakeObject } from "../../common/CamelToSnake";

export default function StockAddPage() {
  const { setIsLoading } = useContext(AppContext);
  const {
    date,
    cases,
    firm,
    len,
    bigCharge,
    charge,
    repair,
    sum,
    serialNumber,
    version,
    price,
    imei,
    source,
    battery,
    customer,
    tel,
    month,
    installment,
    datePayment,
    documentId,
    installmentNo,
    priceTotal,
    customerStatus,
    stockType,
    starMoney,
    setStockType,
    isMenuInsert,
    handlerSubmit,
    setSerialNumber,
    setVersion,
    setPrice,
    setImei,
    setSource,
    setBattery,
    setDate,
    setCustomer,
    setTel,
    setStarMoney,
    setMonth,
    setInstallment,
    setDatePayment,
    setIdCard,
  } = useContext(StockContext);
  const state = useLocation();
  const id =
    new URLSearchParams(useLocation().search).get("id") ?? state.state.id;
  const addType = new URLSearchParams(useLocation().search).get("type") ?? "";
  const navigate = useNavigate();

  const updateStockHandler = (id: string) => {
    setIsLoading(true);

    let payload: any;

    const major = sessionStorage.getItem("majorEdit") ?? "";
    const baseInsert: StockRequest = {
      date,
      invoice: "",
      customerStatus,
      stockType,
      major,
    };

    switch (addType) {
      case "equipment":
        payload = {
          ...baseInsert,
          cases: cases,
          firm: firm,
          len: len,
          bigCharge: bigCharge,
          charge: charge,
          repair: repair,
          sum: sum,
        };
        break;
      case "bye":
        payload = {
          ...baseInsert,
          serialNumber: serialNumber,
          version: version,
          price: price,
          imei: imei,
          source: source,
          battery: battery,
        };
        break;
      case "kay":
        payload = {
          ...baseInsert,
          customer: customer,
          tel: tel,
          version: version,
          imei: imei,
          starMoney: starMoney,
          month: month,
          installment: installment,
          datePayment: datePayment,
          id: id,
        };
        break;
      case "installment":
        payload = {
          ...baseInsert,
          id: documentId,
          installmentNo: Number(installmentNo),
          priceTotal: Number(priceTotal),
        };
        break;
    }

    StockService.UpdateStock(id, stockType, camelToSnakeObject(payload), major)
      .then((res) => {
        AlertSuccess(res.data.message);
        setIsLoading(false);
        switch (addType) {
          case "equipment":
            navigate(PathEnum.STOCK_EQUIPMENT);
            break;
          case "bye":
            navigate(PathEnum.STOCK_BYE);
            break;
          case "kay":
            navigate(PathEnum.STOCK_KAY);
            break;
          case "installment":
            navigate(PathEnum.STOCK_INSTALLMENT_PAYMENT);
            break;
        }
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const major = sessionStorage.getItem("majorEdit");
    if (major && addType === "bye") {
      StockService.GetFindStockById(id, major, "ซื้อ").then((res) => {
        setSerialNumber(res.data.SERIAL_NUMBER);
        setVersion(res.data.VERSION);
        setPrice(res.data.PRICE);
        setImei(res.data.IMEI);
        setSource(res.data.SOURCE);
        setBattery(res.data.BATTERY);
        setDate(res.data.DATE);
        setStockType(res.data.STOCK_TYPE);
      });
    } else if (major && addType === "kay") {
      StockService.GetFindStockById(id, major, "ขาย").then((res) => {
        setCustomer(res.data.CUSTOMER_NAME);
        setTel(res.data.TEL);
        setVersion(res.data.VERSION);
        setImei(res.data.IMEI);
        setStarMoney(res.data.STAR_MONEY);
        setMonth(res.data.MONTH);
        setInstallment(res.data.INSTALLMENT);
        setDatePayment(res.data.DATE_PAYMENT);
        setDate(res.data.DATE);
        setIdCard(res.data.ID_CARD);
      });
    } else if (major && addType === "installment" && Number(id) === 0) {
      setDate(state.state?.date);
    }
  }, []);

  return (
    <ContentLayOut
      title={"เพิ่มข้อมูล"}
      topic={
        id === 0 ? `รหัสเอกสารจะถูกสร้างขึ้นหลังกดบันทึก` : `รหัสเอกสาร : ${id}`
      }
      page={
        <>
          {isMenuInsert && <IsMenuInsert id={id} />}
          {addType === "bye" && <ByeMenuInsert id={id} />}
          {addType === "kay" && <KayMenuInsert id={id} />}
          {addType === "equipment" && <IsMenuInsert id={id} />}
          {addType === "installment" && <InstallmentMenuInsert id={id} />}
          <div className="text-center">
            <button
              type="button"
              className="btn primary-btn col-3 my-3 "
              onClick={id === 0 ? handlerSubmit : () => updateStockHandler(id)}
            >
              บันทึก
            </button>
          </div>
        </>
      }
    />
  );
}
