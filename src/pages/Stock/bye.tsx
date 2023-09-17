import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";
import initTable, { destroyTable } from "../../common/DataTable";
import { StockContext } from "../../contexts/StockContext";
import ModalCommon from "../../common/Modal";
import SelectChoice from "../../common/Select";
import TextInput from "../../common/TextInput";
import MajorServices from "../../services/MajorService";
import { AlertError, AlertWarning } from "../../common/ToastrCommon";
import MajorResponse from "../../Models/Response/GetMajorResponse";

export function StockByePage() {
  const { majorUser, setIsLoading, isEdit } = useContext(AppContext);
  const {
    date,
    setDate,
    setIdCard,
    stockType,
    setStockType,
    setIsMenuInsert,
    setByeMenuInsert,
    setKayMenuInsert,
    setNewInstallmentMenuInsert,
    majorInsert,
    setMajorInsert,
    clearInputValue,
  } = useContext(StockContext);
  const [buyList, setBuyList] = useState<any[]>([]);
  const [fetchMajor, setFetchMajor] = useState<MajorResponse[]>([]);
  const stockBuyListTableHeaders = [
    "รหัสเอกสาร",
    "สาขา",
    "Serial Number",
    "รุ่น",
    "imei",
    "แหล่งที่มา",
    "Battery",
    "ขาย",
  ];
  const navigate = useNavigate();

  const nextValidate = () => {
    const isNext = date !== "" && stockType !== "";
    const isAdmin = majorUser === "admin";
    const isNextAdmin = isAdmin && majorInsert !== "";
    console.log(stockType);
    console.log(date);
    console.log(isNext);
    console.log(isAdmin);
    console.log(isNextAdmin);

    if ((isAdmin && isNextAdmin && isNext) || (!isAdmin && isNext)) {
      navigate(`/stock/add?type=bye`, {
        state: { id: 0 },
      });
    } else {
      AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setStockType("ซื้อ");
    MajorServices.getMajors()
      .then((res) => {
        setFetchMajor(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  }, [setFetchMajor, stockType]);

  useEffect(() => {
    setIsLoading(true);
    StockService.GetStockBye(majorUser).then((res) => {
      destroyTable();
      setBuyList(res.data);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#kay-table"),
        100
      );
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <ContentLayOut
        title={"stock"}
        topic={"สต๊อกสินค้า ที่ซื้อ"}
        btnHeader={
          <button
            onClick={() => {
              setDate("");
              setIdCard("");
              setIsMenuInsert(false);
              setByeMenuInsert(false);
              setKayMenuInsert(false);
              setNewInstallmentMenuInsert(false);
              clearInputValue();
            }}
            className="btn primary-btn text-white float-right"
            data-toggle="modal"
            data-target="#insert-modal"
            id="insert-customer"
          >
            เพิ่มข้อมูลลูกค้า
          </button>
        }
        page={
          <>
            <ModalCommon
              title={"เพิ่มข้อมูล"}
              id={"insert-modal"}
              content={
                <>
                  <div className="modal-body">
                    <div className="container-fluid">
                      {isEdit() && majorUser === "admin" && (
                        <SelectChoice
                          topic="เลือกสาขา"
                          setValue={setMajorInsert}
                          icon="far fa-calendar-alt"
                          label={"สาขา:"}
                          value={majorInsert}
                          options={fetchMajor.map((item) => item.NAME)}
                        />
                      )}
                      <TextInput
                        label={"วันที่:"}
                        icon={"far fa-calendar-alt"}
                        setValue={setDate}
                        type={"date"}
                        value={date}
                      />
                      <TextInput
                        label={"ประเภท"}
                        setValue={setStockType}
                        icon={"far fa-file"}
                        type={"text"}
                        value={stockType}
                        readonly={true}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss="modal"
                      onClick={nextValidate}
                    >
                      ถัดไป
                    </button>
                  </div>
                </>
              }
            />
            <div className="card-body">
              <TableCommon
                columns={stockBuyListTableHeaders}
                row={buyList.map((item, i) => (
                  <tr key={i} className="text-center">
                    <td>{item.ID}</td>
                    <td>{item.MAJOR}</td>
                    <td>{item.SERIAL_NUMBER}</td>
                    <td>{item.VERSION}</td>
                    <td>{item.IMEI}</td>
                    <td>{item.SOURCE}</td>
                    <td>{item.BATTERY}</td>
                    <td>{item.STATUS === "0" ? "ยังไม่ขาย" : "ขายไปแล้ว"}</td>
                  </tr>
                ))}
              />
            </div>
          </>
        }
      />
    </>
  );
}
