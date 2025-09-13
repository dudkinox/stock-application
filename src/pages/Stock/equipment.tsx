import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";
import { StockContext } from "../../contexts/StockContext";
import TextInput from "../../common/TextInput";
import SelectChoice from "../../common/Select";
import ModalCommon from "../../common/Modal";
import MajorResponse from "../../Models/Response/GetMajorResponse";
import MajorServices from "../../services/MajorService";
import { AlertError, AlertWarning } from "../../common/ToastrCommon";
import { convertDateToThaiV2 } from "../../common/DateFormat";

export function StockEquipmentPage() {
  const { majorUser, isEdit, isDelete, setIsLoading, deleteStock } =
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
    setCases,
    setFirm,
    setLen,
    setBigCharge,
    setCharge,
    setRepair,
    setSum,
    setStockID,
  } = useContext(StockContext);
  const [stock, setStock] = useState<any[]>([]);
  const [fetchMajor, setFetchMajor] = useState<MajorResponse[]>([]);
  const stockTableHeaders = [
    "วันที่เพิ่มข้อมูล",
    "รหัสเอกสาร",
    "สาขา",
    "วันที่",
    "เคส",
    "ฟิล์ม",
    "เลน",
    "หัวชาร์จใหญ่",
    "สายชาร์จ",
    "ซ่อม",
    "ราคารวม",
    "แก้ไข ลบ",
  ];
  const navigate = useNavigate();

  const nextValidate = () => {
    const isNext = date !== "" && stockType !== "";
    const isAdmin = majorUser === "admin";
    const isNextAdmin = isAdmin && majorInsert !== "";

    if ((isAdmin && isNextAdmin && isNext) || (!isAdmin && isNext)) {
      navigate(`/stock/add?type=equipment`, {
        state: { id: 0 },
      });
    } else {
      AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const handlerEquipment = (
    id: string,
    majorInsert: string,
    cases: number,
    firm: number,
    len: number,
    bigCharge: number,
    charge: number,
    repair: number,
    sum: number
  ) => {
    sessionStorage.setItem("majorEdit", majorInsert);
    setStockID(id);
    setMajorInsert(majorInsert);
    setCases(cases);
    setFirm(firm);
    setLen(len);
    setBigCharge(bigCharge);
    setCharge(charge);
    setRepair(repair);
    setSum(sum);
    setUpdateKay(true);
    navigate(`/stock/add?type=equipment`, { state: { id } });
  };

  useEffect(() => {
    setIsLoading(true);
    setStockType("อุปกรณ์");
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
    StockService.GetStockEquipment(majorUser).then((res) => {
      setStock(res.data);
    });
  }, []);

  return (
    <ContentLayOut
      title={"stock"}
      topic={"อุปกรณ์"}
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
          เพิ่มข้อมูลอุปกรณ์
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
              columns={stockTableHeaders}
              row={stock.map((item, i) => (
                <tr key={i} className="text-center">
                  <td>
                    <span className="d-none">{item.CREATED_AT}</span>
                    {convertDateToThaiV2(new Date(item.CREATED_AT))}
                  </td>
                  <td>{`${item.CODE}-${item.ID}`}</td>
                  <td>{item.MAJOR}</td>
                  <td>{convertDateToThaiV2(new Date(item.DATE))}</td>
                  <td>{item.CASES}</td>
                  <td>{item.FIRM}</td>
                  <td>{item.LEN}</td>
                  <td>{item.BIG_CHARGE}</td>
                  <td>{item.CHARGE}</td>
                  <td>{item.REPAIR}</td>
                  <td>{item.SUM}</td>
                  <td>
                    {isEdit() ? (
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() =>
                          handlerEquipment(
                            item.ID,
                            item.MAJOR,
                            item.CASES,
                            item.FIRM,
                            item.LEN,
                            item.BIG_CHARGE,
                            item.CHARGE,
                            item.REPAIR,
                            item.SUM
                          )
                        }
                      >
                        แก้ไข
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-warning disabled"
                      >
                        แก้ไข
                      </button>
                    )}
                    &emsp;
                    {isDelete() ? (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={deleteStock(item.ID, item.MAJOR)}
                      >
                        ลบ
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn my-3 btn-danger disabled"
                      >
                        ลบ
                      </button>
                    )}
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
