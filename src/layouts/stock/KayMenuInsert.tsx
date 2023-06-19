import { MenuKayEnum } from "../../enum/menuInsert.enum";
import { useContext, useEffect } from "react";
import { StockContext } from "../../contexts/StockContext";

interface KayMenuInsertProps {
  fullName: string;
}

export default function KayMenuInsert({ fullName }: KayMenuInsertProps) {
  const {
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
  } = useContext(StockContext);

  useEffect(() => {
    setCustomer(fullName);
  }, [fullName]);

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
            value={customer}
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
    </>
  );
}
