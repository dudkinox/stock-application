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
import { convertDateToThaiV2 } from "../../common/DateFormat";

export function StockByePage() {
  const { majorUser, setIsLoading, isEdit, deleteStock } =
    useContext(AppContext);
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
    setUpdateKey: setUpdateKay,
  } = useContext(StockContext);
  const [buyList, setBuyList] = useState<any[]>([]);
  const [fetchMajor, setFetchMajor] = useState<MajorResponse[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const stockBuyListTableHeaders = [
    "วันที่เพิ่มข้อมูล",
    "รหัสเอกสาร",
    "สาขา",
    "วันที่ซื้อ",
    "Serial Number",
    "รุ่น",
    "ราคาซื้อ",
    "imei",
    "แหล่งที่มา",
    "Battery",
    "ขาย",
    "แก้ไข / ลบ",
  ];
  const navigate = useNavigate();

  const nextValidate = () => {
    const isNext = date !== "" && stockType !== "";
    const isAdmin = majorUser === "admin";
    const isNextAdmin = isAdmin && majorInsert !== "";

    if ((isAdmin && isNextAdmin && isNext) || (!isAdmin && isNext)) {
      navigate(`/stock/add?type=bye`, {
        state: { id: 0 },
      });
    } else {
      AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const handleFilter = () => {
    setIsLoading(true);
    StockService.GetStockBye(majorUser, filterDate).then((res) => {
      destroyTable();
      setBuyList(res.data);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#kay-table"),
        100
      );
      setIsLoading(false);
    });
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
    <ContentLayOut
      title={"stock"}
      topic={"สต๊อกสินค้า ที่ซื้อ"}
      filter={
        <>
          <div className="container-fluid">
            <div className="row text-center">
              <div className="col-sm-10">
                <TextInput
                  label={"Filter วันที่เพิ่มข้อมูล"}
                  setValue={setFilterDate}
                  type={"date"}
                  icon={"far fa-calendar-alt"}
                  value={filterDate}
                />
              </div>
              <div className="col-sm-2">
                <br />
                <button className="btn btn-primary mt-2" onClick={handleFilter}>
                  ค้นหา
                </button>
              </div>
            </div>
          </div>
        </>
      }
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
          เพิ่มข้อมูลซื้อ
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
                  <td>{convertDateToThaiV2(new Date(item.CREATED_AT))}</td>
                  <td>{item.ID}</td>
                  <td>{item.MAJOR}</td>
                  <td>{convertDateToThaiV2(new Date(item.DATE))}</td>
                  <td>{item.SERIAL_NUMBER}</td>
                  <td>{item.VERSION}</td>
                  <td>{Number(item.PRICE).toLocaleString()} บาท</td>
                  <td>{item.IMEI}</td>
                  <td>{item.SOURCE}</td>
                  <td>{item.BATTERY}</td>
                  <td>{item.STATUS === "0" ? "ยังไม่ขาย" : "ขายไปแล้ว"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        sessionStorage.setItem("majorEdit", item.MAJOR);
                        setUpdateKay(true);
                        navigate(`/stock/add?type=bye&id=${item.ID}`);
                      }}
                    >
                      แก้ไข
                    </button>
                    &emsp;
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={deleteStock(item.ID, item.MAJOR)}
                    >
                      ลบ
                    </button>
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
