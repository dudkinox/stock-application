import { MenuKayEnum } from "../../../enum/menuInsert.enum";
import { useContext } from "react";
import { StockContext } from "../../../contexts/StockContext";

export default function KayMenuInsert() {
  const {
    setCustomer,
    setTel,
    setVersion,
    setImei,
    setStarMoney,
    setMonth,
    setInstallment,
    setDatePayment,
  } = useContext(StockContext);
  return (
    <>
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
            type="text"
            className="form-control"
            onChange={(e: any) => setTel(e.target.value)}
            placeholder="เบอร์โทร"
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
            type="text"
            className="form-control"
            onChange={(e: any) => setStarMoney(e.target.value)}
            placeholder="เงินดาวน์"
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
            type="text"
            className="form-control"
            onChange={(e: any) => setMonth(e.target.value)}
            placeholder="จำนวนเดือนที่ผ่อน"
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
            type="text"
            className="form-control"
            onChange={(e: any) => setInstallment(e.target.value)}
            placeholder="เดือนละ"
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
          />
        </div>
      </div>
    </>
  );
}
