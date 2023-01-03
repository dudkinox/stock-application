import { useContext } from "react";
import { StockContext } from "../../contexts/StockContext";
import { MenuInstallmentPaymentEnum } from "../../enum/menuInsert.enum";

export default function InstallmentMenuInsert() {
  const { installmentNo, setInstallmentNo, priceTotal, setPriceTotal } =
    useContext(StockContext);
  return (
    <>
      <div className="form-group">
        <label className="float-left">
          {MenuInstallmentPaymentEnum.INSTALLMENT_NO}
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-calendar-check"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => setInstallmentNo(e.target.value)}
            placeholder="งวดที่"
            value={installmentNo}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="float-left">
          {MenuInstallmentPaymentEnum.PRICE_TOTAL}
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-money-bill-wave"></i>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={(e: any) => setPriceTotal(e.target.value)}
            placeholder="จำนวนเงิน"
            value={priceTotal}
          />
        </div>
      </div>
    </>
  );
}
