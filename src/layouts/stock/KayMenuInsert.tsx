import { MenuKayEnum } from "../../enum/menuInsert.enum";
import { useContext, useEffect, useState } from "react";
import { StockContext } from "../../contexts/StockContext";
import DataList from "../../common/DataList";
import { AlertWarning } from "../../common/ToastrCommon";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts";
import { GetCustomerResponse } from "../../Models/Response/GetCustomerResponse";
import CustomerServices from "../../services/CustomerServices";

interface KayMenuInsertProps {
  id: string;
}

export default function KayMenuInsert({ id }: KayMenuInsertProps) {
  const {
    setCustomerStatus,
    customer,
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
  const [customerFind, setCustomerFind] = useState<GetCustomerResponse>();
  const customerExists = selectCustomer.find((fil) => fil.ID_CARD === idCard);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    CustomerServices.getCustomer(majorUser).then((res) => {
      setSelectCustomer(res.data);
      setIsLoading(false);
      setStockType("ขาย");
      console.log("1:" + customerExists);
    });
  }, []);

  useEffect(() => {
    setCustomerFind(customerExists);
    setCustomerStatus(customerFind?.CUSTOMER_STATUS ?? "");
    setCustomer(`${customerFind?.NAME} ${customerFind?.LAST_NAME}`);
    console.log("2:" + customerExists);
  }, [
    customerExists,
    customerFind?.CUSTOMER_STATUS,
    idCard,
    selectCustomer,
    setCustomerStatus,
  ]);

  useEffect(() => {
    if (idCard.length === 13 && !customerExists) {
      $("#insert-modal").hide();
      $(".modal-backdrop.fade.show").remove();
      AlertWarning("กรุณากรอกข้อมูลลูกค้าก่อนทำรายการ Stock");
      setPathUrl("/customer");
      navigate("/customer", { state: { enable: true, id: id } });
      console.log("3:" + customerExists);
    }
  }, [
    customerExists,
    customerFind,
    idCard,
    navigate,
    selectCustomer,
    setPathUrl,
  ]);

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
              customerFind
                ? `${customerFind?.NAME} ${customerFind?.LAST_NAME}`
                : ""
            }
            readOnly={customerFind !== null}
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
    </>
  );
}
