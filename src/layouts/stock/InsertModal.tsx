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
  const [date, setDate] = useState("");
  const [idCard, setIdCard] = useState("");
  const [customerStatus, setCustomerStatus] = useState("");
  const [stockType, setStockType] = useState("");
  const [isMenuInsert, setIsMenuInsert] = useState(false);

  const toggleShow = () => setShow(true);
  const toggleClose = () => setShow(false);

  if (stockType === "อุปกรณ์") {
    console.log("aaa");
  }

  const menuInsert = (stockType: string) => {
    switch (stockType) {
      case "อุปกรณ์":
        setIsMenuInsert(true);
        break;
    }
  };

  const handlerSubmit = () => {
    var data = {
      date: date,
      id_card: idCard,
      customer_status: customerStatus,
      stock_type: stockType,
    };

    console.log(data);
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
                  <div className="form-group">
                    <label className="float-left">
                      {MenuEquipmentEnum.CASES}
                    </label>
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
