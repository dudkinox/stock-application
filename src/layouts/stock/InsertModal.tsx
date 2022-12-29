import { useContext } from "react";
import { StockContext } from "../../contexts/StockContext";
import TextInput from "../../common/TextInput";
import DataList from "../../common/DataList";
import SelectChoice from "../../common/Select";
import IsMenuInsert from "./InsertType/IsMenuInsert";
import ByeMenuInsert from "./InsertType/ByeMenuInsert";
import KayMenuInsert from "./InsertType/KayMenuInsert";
import InstallmentMenuInsert from "./InsertType/InstallmentMenuInsert";

export default function InsertModal() {
  const {
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
    menuInsert,
  } = useContext(StockContext);
  function setCustomerStatus(value: string): void {
    throw new Error("Function not implemented.");
  }

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
                <TextInput
                  label={"วันที่:"}
                  icon={"far fa-calendar-alt"}
                  setValue={setDate}
                  type={"text"}
                  placeholder={"dd/mm/yyyy"}
                />
                <DataList
                  label={"ค้นหา / เลือก เลขบัตรประชาชน:"}
                  setValue={setIdCard}
                  icon={"far fa-id-card"}
                  data={["1", "2", "3"]}
                  placeholder={"เลขบัตรประชาชน"}
                  minLength={13}
                  maxLength={13}
                />
                <SelectChoice
                  label={"ประวัติลูกค้า"}
                  setValue={setCustomerStatus}
                  icon={"fas fa-history"}
                  topic={"ประวัติลูกค้า"}
                  options={["ลูกค้าดี", "ลูกค้าโกง", "ลูกค้าจ่ายช้า"]}
                  placeholder={"ประวัติลูกค้า"}
                />
                <SelectChoice
                  label={"ประเภท"}
                  setValue={menuInsert}
                  icon={"far fa-file"}
                  topic={"ประเภท"}
                  options={["ซื้อ", "ขาย", "ผ่อน", "อุปกรณ์"]}
                  placeholder={"ประเภทลูกค้า"}
                />
                {isMenuInsert && <IsMenuInsert />}
                {byeMenuInsert && <ByeMenuInsert />}
                {kayMenuInsert && <KayMenuInsert />}
                {installmentMenuInsert && <InstallmentMenuInsert />}
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
