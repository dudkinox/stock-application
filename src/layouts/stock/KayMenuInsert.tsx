import { MenuKayEnum } from "../../enum/menuInsert.enum";
import { useContext, useEffect, useState } from "react";
import { StockContext } from "../../contexts/StockContext";
import DataList from "../../common/DataList";
import { AlertWarning } from "../../common/ToastrCommon";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts";
import { GetCustomerResponse } from "../../Models/Response/GetCustomerResponse";
import CustomerServices from "../../services/CustomerServices";
import StockService from "../../services/StockServices";

interface KayMenuInsertProps {
  id: string;
}

export default function KayMenuInsert({ id }: KayMenuInsertProps) {
  const {
    setCustomerStatus,
    setCustomer,
    tel,
    setTel,
    version,
    setVersion,
    imei,
    setImei,
    starMoney,
    setStarMoney,
    month,
    setMonth,
    installment,
    setInstallment,
    datePayment,
    setDatePayment,
    setIdCard,
    idCard,
    date,
    setDate,
    setStockType,
  } = useContext(StockContext);
  const { setPathUrl, setIsLoading, majorUser } = useContext(AppContext);
  const [selectCustomer, setSelectCustomer] = useState<GetCustomerResponse[]>(
    []
  );
  const [customerExists, setCustomerExists] =
    useState<GetCustomerResponse | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const insert = !!location.state.insert;

  useEffect(() => {
    setIsLoading(true);
    CustomerServices.getCustomer(majorUser).then((res) => {
      setSelectCustomer(res.data);
      setIsLoading(false);
      setStockType("ขาย");
    });
  }, []);

  useEffect(() => {
    const updatedCustomerExists = selectCustomer.find(
      (fil) => fil.ID_CARD === idCard
    );
    setCustomerExists(updatedCustomerExists ?? null);
    document.body.classList.remove("modal-open");

    if (idCard.length === 13 && !updatedCustomerExists && !insert) {
      AlertWarning("กรุณากรอกข้อมูลลูกค้าก่อนทำรายการ Stock");
      setPathUrl("/customer");
      navigate("/customer", {
        state: { enable: true, id: id },
      });
    } else if (idCard.length === 13 && !updatedCustomerExists) {
      $("#insert-modal").hide();
      $(".modal-backdrop.fade.show").remove();
    } else if (insert) {
      $("#insert-modal").hide();
      $(".modal-backdrop.fade.show").remove();
    }
    setCustomerStatus(updatedCustomerExists?.CUSTOMER_STATUS ?? "");
    setCustomer(
      `${updatedCustomerExists?.NAME ?? ""} ${
        updatedCustomerExists?.LAST_NAME ?? ""
      }`
    );
  }, [idCard, selectCustomer, customerExists, navigate, setPathUrl]);

  useEffect(() => {
    const major = sessionStorage.getItem("majorEdit");
    if (major) {
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
    }
  }, []);

  return (
    <>
      <span className="mt-3"></span>
      <DataList
        label={"ค้นหาชื่อ / เลือก เลขบัตรประชาชน:"}
        setValue={setIdCard}
        icon={"far fa-id-card"}
        data={selectCustomer.map((item) => item)}
        placeholder={"ค้นหาชื่อ / เลขบัตรประชาชน"}
        minLength={13}
        maxLength={13}
        value={idCard}
      />
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.CUSTOMER}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => setCustomer(e.target.value)}
            placeholder="ชื่อลูกค้า"
            value={
              customerExists
                ? `${customerExists?.NAME} ${customerExists?.LAST_NAME}`
                : ""
            }
            readOnly={customerExists !== null}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.DATE}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-calendar"></i>
            </span>
          </div>
          <input
            type="date"
            className="form-control"
            onChange={(e: any) => setDate(e.target.value)}
            placeholder="วันที่ขาย"
            value={date}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.TEL}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-phone-alt"></i>
            </span>
          </div>
          <input
            type="tel"
            className="form-control"
            onChange={(e: any) => setTel(e.target.value)}
            minLength={10}
            maxLength={10}
            placeholder="เบอร์โทร"
            value={tel}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.VERSION}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-mobile"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => setVersion(e.target.value)}
            placeholder="รุ่น"
            value={version}
            readOnly
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.IMEI}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-mobile"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => setImei(e.target.value)}
            placeholder="imei เครื่อง"
            value={imei}
            readOnly
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.STAR_MONEY}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-money-check-alt"></i>
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            onChange={(e: any) => setStarMoney(e.target.value)}
            min={0}
            placeholder="เงินดาวน์"
            value={starMoney}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.MONTH}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-calendar"></i>
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            onChange={(e: any) => setMonth(e.target.value)}
            min={0}
            placeholder="จำนวนเดือนที่ผ่อน"
            value={month}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.INSTALLMENT}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
          </div>
          <input
            type="number"
            className="form-control"
            onChange={(e: any) => setInstallment(e.target.value)}
            min={0}
            placeholder="เดือนละ"
            value={installment}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">{MenuKayEnum.DATE_PAYMENT}</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-cash-register"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => setDatePayment(e.target.value)}
            placeholder="ชำระทุกวันที่"
            value={datePayment}
          />
        </div>
      </div>
    </>
  );
}
