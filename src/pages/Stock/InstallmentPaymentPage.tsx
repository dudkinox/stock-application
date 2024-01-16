import { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";
import ModalCommon from "../../common/Modal";
import SelectChoice from "../../common/Select";
import TextInput from "../../common/TextInput";
import { StockContext } from "../../contexts/StockContext";
import MajorResponse from "../../Models/Response/GetMajorResponse";
import { useNavigate } from "react-router-dom";
import { AlertError, AlertWarning } from "../../common/ToastrCommon";
import MajorServices from "../../services/MajorService";
import convertDateToThai from "../../common/DateFormat";

export function StockInstallmentPaymentPage() {
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
    setUpdateKey,
    setStockID,
    setPriceTotal,
    setInstallmentNo,
  } = useContext(StockContext);
  const [stock, setStock] = useState<any[]>([]);
  const stockTableHeaders = [
    "รหัสเอกสาร",
    "วันที่",
    "สาขา",
    "งวดที่",
    "จำนวนเงิน",
    "แก้ไข",
    "ลบ",
  ];
  const [fetchMajor, setFetchMajor] = useState<MajorResponse[]>([]);

  const navigate = useNavigate();

  const nextValidate = () => {
    const isNext = date !== "" && stockType !== "";
    const isAdmin = majorUser === "admin";
    const isNextAdmin = isAdmin && majorInsert !== "";

    if ((isAdmin && isNextAdmin && isNext) || (!isAdmin && isNext)) {
      navigate(`/stock/add?type=installment`, {
        state: { id: 0 },
      });
    } else {
      AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const handlerInstallment = (
    id: string,
    majorInsert: string,
    installmentNo: number,
    priceTotal: string
  ) => {
    sessionStorage.setItem("majorEdit", majorInsert);
    setStockID(id);
    setMajorInsert(majorInsert);
    setPriceTotal(priceTotal);
    setInstallmentNo(installmentNo);
    setUpdateKey(true);
    navigate(`/stock/add?type=installment`, { state: { id } });
  };

  useEffect(() => {
    setIsLoading(true);
    StockService.GetStockInstallmentPaymentAll(majorUser)
      .then((res) => {
        setStock(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setStockType("ผ่อน");
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

  return (
    <>
      <ContentLayOut
        title={"ผ่อน"}
        topic={""}
        page={
          <>
            <ModalCommon
              title={"เพิ่มข้อมูลผ่อน"}
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
            <div className="card card-primary card-outline card-tabs">
              <div className="card-header p-0 pt-1 border-bottom-0">
                <ul
                  className="nav nav-tabs"
                  id="custom-tabs-three-tab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="custom-tabs-three-home-tab"
                      data-toggle="pill"
                      href="#custom-tabs-three-home"
                      role="tab"
                      aria-controls="custom-tabs-three-home"
                      aria-selected="true"
                    >
                      ตารางข้อมูลผ่อน
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="custom-tabs-three-profile-tab"
                      data-toggle="pill"
                      href="#custom-tabs-three-profile"
                      role="tab"
                      aria-controls="custom-tabs-three-profile"
                      aria-selected="false"
                    >
                      ตารางเก็บเงิน
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-header">
                <h2 className="card-title mt-2">
                  {"ค้นหา / เพิ่ม / ลบ / แก้ไข"}
                </h2>
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
                  เพิ่มข้อมูลผ่อน
                </button>
              </div>
              <div className="card-body">
                <div className="tab-content" id="custom-tabs-three-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="custom-tabs-three-home"
                    role="tabpanel"
                    aria-labelledby="custom-tabs-three-home-tab"
                  >
                    <>
                      <div className="card-body">
                        <TableCommon
                          columns={stockTableHeaders}
                          row={stock.map((item, i) => (
                            <tr key={i} className="text-center">
                              <td>{item.ID_CARD}</td>
                              <td>{convertDateToThai(new Date(item.DATE))}</td>
                              <td>{item.MAJOR}</td>
                              <td>{item.INSTALLMENT_NO}</td>
                              <td>
                                {Number(item.PRICE_TOTAL).toLocaleString()} บาท
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                  onClick={() =>
                                    handlerInstallment(
                                      item.ID,
                                      item.MAJOR,
                                      item.INSTALLMENT_NO,
                                      item.PRICE_TOTAL
                                    )
                                  }
                                >
                                  แก้ไข
                                </button>
                              </td>
                              <td>
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
                  </div>
                  <div
                    className="tab-pane fade"
                    id="custom-tabs-three-profile"
                    role="tabpanel"
                    aria-labelledby="custom-tabs-three-profile-tab"
                  >
                    สำหรับดูว่ามีใครใกล้ครบกำหนดการเก็บเงินบ้าง (feature
                    นี้สำหรับผ่านการทดสอบการใช้งานแล้วระดับหนึ่งถึงจะนำเอาเข้ามา)
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}
