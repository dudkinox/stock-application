import { useContext, useEffect } from "react";
import initTable from "../../common/DataTable";
import { StockContext } from "../../contexts/StockContext";
import ContentLayOut from "../../layouts/ContentLayOut";
import DetailModal from "../../layouts/stock/DetailModal";
import StockService from "../../services/StockServices";
import ModalCommon from "../../common/Modal";
import DataList from "../../common/DataList";
import SelectChoice from "../../common/Select";
import TextInput from "../../common/TextInput";
import ByeMenuInsert from "../../layouts/stock/InsertType/ByeMenuInsert";
import InstallmentMenuInsert from "../../layouts/stock/InsertType/InstallmentMenuInsert";
import IsMenuInsert from "../../layouts/stock/InsertType/IsMenuInsert";
import KayMenuInsert from "../../layouts/stock/InsertType/KayMenuInsert";
import TableCommon from "../../common/Table";

export default function StockPage() {
  const {
    stock,
    setStock,
    setDate,
    setIdCard,
    setCustomerStatus,
    setStockType,
    menuInsert,
    isMenuInsert,
    byeMenuInsert,
    kayMenuInsert,
    installmentMenuInsert,
    handlerSubmit,
  } = useContext(StockContext);

  const SelectStockType = (value: string) => {
    setStockType(value);
    menuInsert(value);
  };

  const deleteStock = (id: string) => () => {
    StockService.DeleteStockById(id)
      .then((res) => {
        alert(res.data.message);
        StockService.GetStock()
          .then((res) => {
            setStock([]);
            setStock(res.data);
            setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    StockService.GetStock()
      .then((res) => {
        setStock(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [setStock]);

  return (
    <ContentLayOut
      title={"stock"}
      topic={"สต๊อกสินค้า"}
      page={
        <>
          <ModalCommon
            title={"เพิ่มข้อมูล"}
            content={
              <>
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
                      setValue={SelectStockType}
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
                    data-dismiss="modal"
                    onClick={handlerSubmit}
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                  >
                    ยกเลิก
                  </button>
                </div>
              </>
            }
          />
          <div className="card-body">
            <TableCommon
              columns={[
                "รหัสเอกสาร",
                <>
                  <div>เพิ่ม/ลบ/เเก้ไข</div>
                  <button
                    className="btn primary-btn text-white w-100 mt-2"
                    data-toggle="modal"
                    data-target="#InsertStock"
                  >
                    <i className="nav-icon fas fa-plus" />
                  </button>
                </>,
                "เลขบัตรประชาชน",
                "ประวัติลูกค้า",
                "ประเภท",
                "รายละเอียด",
              ]}
              row={stock.map((item, i) => (
                <tr key={i} className="text-center">
                  <td>{item.ID}</td>
                  <td>
                    <div className="row justify-content-center">
                      <button className="btn btn-warning mx-2">
                        <i className="nav-icon fas fa-pen" />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={deleteStock(item.ID)}
                      >
                        <i className="nav-icon fas fa-trash" />
                      </button>
                    </div>
                  </td>
                  <td>{item.ID_CARD}</td>
                  <td>{item.CUSTOMER_STATUS}</td>
                  <td>{item.STOCK_TYPE}</td>
                  <td>
                    <DetailModal
                      idCard={item.ID_CARD}
                      typeStock={item.STOCK_TYPE}
                    />
                  </td>
                </tr>
              ))}
            />
          </div>
        </>
      }
    />
  );
}
