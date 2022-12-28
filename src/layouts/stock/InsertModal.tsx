import React, { useState } from "react";
import {
  MenuEquipmentEnum,
  MenuByeEnum,
  MenuKayEnum,
  MenuInstallmentPaymentEnum,
} from "../../enum/menuInsert.enum";
import StockApi from "../../services/StockServices";

export default function InsertModal() {
  const [show, setShow] = useState(false);
  const [isMenuInsert, setIsMenuInsert] = useState(false);
  const [byeMenuInsert, setByeMenuInsert] = useState(false);
  const [kayMenuInsert, setKayMenuInsert] = useState(false);
  const [installmentMenuInsert, setInstallmentMenuInsert] = useState(false);
  const [date, setDate] = useState("");
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

  const toggleShow = () => setShow(true);
  const toggleClose = () => setShow(false);

  const menuInsert = (stockType: string) => {
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
  };

  const handlerSubmit = () => {
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

    // StockApi.InsertStock(data);
  };

  return (
    <>
      <div>เพิ่ม/ลบ/เเก้ไข</div>
      <button
        className="btn primary-btn text-white w-100 mt-2"
        data-toggle="modal"
        data-target="#InsertStock"
        onClick={toggleShow}
      >
        <i className="nav-icon fas fa-plus" />
      </button>

      <div
        className={`modal fade ${show ? "show" : ""}`}
        id="InsertStock"
        tabIndex={-1}
        aria-labelledby="InsertStockLabel"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">เพิ่มสต๊อก</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="form-group">
                  <label className="float-left">วันที่:</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-calendar-alt"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e: any) => setDate(e.target.value)}
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="float-left">
                    ค้นหา / เลือก เลขบัตรประชาชน:
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-id-card"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      list="datalistOptions"
                      id="exampleDataList"
                      minLength={13}
                      maxLength={13}
                      onChange={(e: any) => setIdCard(e.target.value)}
                      placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
                      autoComplete="off"
                    />
                    <datalist id="datalistOptions">
                      <option value="123123123"></option>
                      <option value="2222"></option>
                      <option value="Seattle"></option>
                      <option value="Los Angeles"></option>
                      <option value="Chicago"></option>
                    </datalist>
                  </div>
                </div>
                <div className="form-group">
                  <label className="float-left">ประวัติลูกค้า</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-history"></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      onChange={(e: any) => setCustomerStatus(e.target.value)}
                      placeholder="ประวัติลูกค้า"
                    >
                      <option hidden selected>
                        ประวัติลูกค้า
                      </option>
                      <option value="ลูกค้าดี">ลูกค้าดี</option>
                      <option value="ลูกค้าโกง">ลูกค้าโกง</option>
                      <option value="ลูกค้าจ่ายช้า">ลูกค้าจ่ายช้า</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="float-left">ประเภท</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="far fa-file"></i>
                      </span>
                    </div>
                    <select
                      className="form-control"
                      onChange={(e: any) => menuInsert(e.target.value)}
                      placeholder="ประเภทลูกค้า"
                    >
                      <option hidden selected>
                        ประเภท
                      </option>
                      <option value="ซื้อ">ซื้อ</option>
                      <option value="ขาย">ขาย</option>
                      <option value="ผ่อน">ผ่อน</option>
                      <option value="อุปกรณ์">อุปกรณ์</option>
                    </select>
                  </div>
                </div>
                {isMenuInsert && (
                  <>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuEquipmentEnum.CASES}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-mobile"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          onChange={(e: any) => setCases(e.target.value)}
                          placeholder="เคส"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuEquipmentEnum.FIRM}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          onChange={(e: any) => setFirm(e.target.value)}
                          placeholder="ฟิล์ม"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuEquipmentEnum.LEN}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-camera"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          onChange={(e: any) => setLen(e.target.value)}
                          placeholder="กันเลนส์"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuEquipmentEnum.BIG_CHARGE}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-charging-station"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          onChange={(e: any) => setBigCharge(e.target.value)}
                          placeholder="หัวชาร์จใหญ่"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuEquipmentEnum.CHARGE}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-plug"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          onChange={(e: any) => setCharge(e.target.value)}
                          placeholder="สายชาร์จ"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuEquipmentEnum.REPAIR}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-tools"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          onChange={(e: any) => setRepair(e.target.value)}
                          placeholder="ซ่อม"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuEquipmentEnum.SUM}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-money-bill"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control"
                          min={0}
                          onChange={(e: any) => setSum(e.target.value)}
                          placeholder="ราคา"
                        />
                      </div>
                    </div>
                  </>
                )}
                {byeMenuInsert && (
                  <>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuByeEnum.VERSION}
                      </label>
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
                      <label className="float-left">{MenuByeEnum.PRICE}</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-money-bill"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e: any) => setPrice(e.target.value)}
                          placeholder="ราคา"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">{MenuByeEnum.IMEI}</label>
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
                      <label className="float-left">{MenuByeEnum.SOURCE}</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-map-marker-alt"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e: any) => setSource(e.target.value)}
                          placeholder="เเหล่งที่มา"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuByeEnum.BATTERY}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-battery-full"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e: any) => setBattery(e.target.value)}
                          placeholder="เเบตเตอรี่"
                        />
                      </div>
                    </div>
                  </>
                )}
                {kayMenuInsert && (
                  <>
                    <div className="form-group">
                      <label className="float-left">
                        {MenuKayEnum.CUSTOMER}
                      </label>
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
                      <label className="float-left">
                        {MenuKayEnum.VERSION}
                      </label>
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
                      <label className="float-left">
                        {MenuKayEnum.STAR_MONEY}
                      </label>
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
                      <label className="float-left">
                        {MenuKayEnum.INSTALLMENT}
                      </label>
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
                      <label className="float-left">
                        {MenuKayEnum.DATE_PAYMENT}
                      </label>
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
                )}
                {installmentMenuInsert && (
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
                          onChange={(e: any) =>
                            setInstallmentNo(e.target.value)
                          }
                          placeholder="งวดที่"
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
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn primary-btn col-lg-2 col-sm-auto"
                onClick={handlerSubmit}
              >
                บันทึก
              </button>
              <button
                type="button"
                className="btn btn-danger col-lg-2 col-sm-auto"
                data-dismiss="modal"
                onClick={toggleClose}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
