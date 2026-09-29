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
import { convertDateToThaiV2 } from "../../common/DateFormat";
import Summarize from "./summarize";
import initTable from "../../common/DataTable";

export function StockInstallmentPaymentPage() {
  const { majorUser, setIsLoading, isEdit, isDelete, deleteStock } =
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
  const [stockLoaded, setStockLoaded] = useState(false);
  const [summaryBranch, setSummaryBranch] = useState("ทั้งหมด");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });
  const [visibleSummary, setVisibleSummary] = useState({ count: 0, total: 0 });
  const invalidDates = Boolean(startDate && endDate && startDate > endDate);
  const allTotal =
    stock.reduce(
      (total, item) => total + Math.round(Number(item.PRICE_TOTAL || 0) * 100),
      0,
    ) / 100;

  useEffect(() => {
    if (!stockLoaded) return;
    const table = $("#installment-payment-table") as any;
    initTable(stock.length.toString(), "#installment-payment-table");
    return () => {
      table.DataTable().destroy();
    };
  }, [stock, stockLoaded]);

  useEffect(() => {
    if (!stockLoaded) return;
    const table = $("#installment-payment-table") as any;
    const filters = ($.fn as any).dataTable.ext.search;
    const filter = (settings: any, _data: string[], index: number) => {
      if (settings.nTable.id !== "installment-payment-table") return true;
      const item = stock[index];
      if (!item || invalidDates) return false;
      const itemDate = String(item.DATE ?? "").slice(0, 10);
      return (
        (summaryBranch === "ทั้งหมด" || item.MAJOR === summaryBranch) &&
        (!startDate || itemDate >= startDate) &&
        (!endDate || (itemDate !== "" && itemDate <= endDate))
      );
    };
    filters.push(filter);
    const updateSummary = () => {
      const indexes: number[] = table
        .DataTable()
        .rows({ search: "applied" })
        .indexes()
        .toArray();
      const cents = indexes.reduce(
        (sum, index) =>
          sum + Math.round(Number(stock[index]?.PRICE_TOTAL || 0) * 100),
        0,
      );
      setVisibleSummary({ count: indexes.length, total: cents / 100 });
    };
    table.on("draw.dt.installmentSummary", updateSummary);
    table.DataTable().draw();
    return () => {
      table.off("draw.dt.installmentSummary", updateSummary);
      const index = filters.indexOf(filter);
      if (index !== -1) filters.splice(index, 1);
    };
  }, [stock, stockLoaded, summaryBranch, startDate, endDate, invalidDates]);

  const stockTableHeaders = [
    "timestamp",
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
    priceTotal: string,
  ) => {
    sessionStorage.setItem("majorEdit", majorInsert);
    setStockID(id);
    setMajorInsert(majorInsert);
    setPriceTotal(priceTotal);
    setInstallmentNo(installmentNo);
    setUpdateKey(true);
    navigate(`/stock/add?type=installment&id=${id}`, { state: { id, mode: "edit" } });
  };

  useEffect(() => {
    setIsLoading(true);
    StockService.GetStockInstallmentPaymentAll(majorUser)
      .then((res) => {
        setStock(res.data);
        setStockLoaded(true);
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
                      label={"วันที่ (ปี ค.ศ.):"}
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
                  <div className="card-body">
                    <div className="row">
                      {majorUser === "admin" && (
                        <div className="col-12 col-md-4 form-group">
                          <label htmlFor="installment-summary-branch">
                            สาขา
                          </label>
                          <select
                            id="installment-summary-branch"
                            className="form-control"
                            value={summaryBranch}
                            onChange={(e) => setSummaryBranch(e.target.value)}
                          >
                            <option value="ทั้งหมด">ทั้งหมด</option>
                            {fetchMajor.map((item) => (
                              <option key={item.ID} value={item.NAME}>
                                {item.NAME}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="col-12 col-md-4 form-group">
                        <label htmlFor="installment-summary-start">
                          วันที่เริ่มต้น (ค.ศ.)
                        </label>
                        <input
                          id="installment-summary-start"
                          type="date"
                          className="form-control"
                          value={startDate}
                          max={endDate || undefined}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        {!startDate && (
                          <small>ทั้งหมด — ไม่จำกัดวันที่เริ่มต้น</small>
                        )}
                      </div>
                      <div className="col-12 col-md-4 form-group">
                        <label htmlFor="installment-summary-end">
                          วันที่สิ้นสุด (ค.ศ.)
                        </label>
                        <input
                          id="installment-summary-end"
                          type="date"
                          className="form-control"
                          value={endDate}
                          min={startDate || undefined}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                        {!endDate && (
                          <small>ทั้งหมด — ไม่จำกัดวันที่สิ้นสุด</small>
                        )}
                      </div>
                    </div>
                    {invalidDates && (
                      <p className="text-danger" role="alert">
                        วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่มต้น
                      </p>
                    )}

                    <TableCommon
                      id="installment-payment-table"
                      columns={stockTableHeaders}
                      row={stock.map((item) => (
                        <tr key={item.ID} className="text-center">
                          <td>
                            <span className="d-none">{item.CREATED_AT}</span>
                            {convertDateToThaiV2(new Date(item.CREATED_AT))}
                          </td>
                          <td>{`${item.CODE}-${item.ID}`}</td>
                          <td>
                            <span className="d-none">{item.DATE}</span>
                            {convertDateToThaiV2(new Date(item.DATE))}
                          </td>
                          <td>{item.MAJOR}</td>
                          <td>{item.INSTALLMENT_NO}</td>
                          <td>
                            {Number(item.PRICE_TOTAL).toLocaleString()} บาท
                          </td>
                          <td>
                            {isEdit() ? (
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() =>
                                  handlerInstallment(
                                    item.ID,
                                    item.MAJOR,
                                    item.INSTALLMENT_NO,
                                    item.PRICE_TOTAL,
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
                          </td>
                          <td>
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
                                className="btn btn-danger disabled"
                              >
                                ลบ
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    />
                  </div>
                  <div className="row" aria-live="polite">
                    <div className="col-12 col-md-6">
                      <div className="card card-body text-center">
                        <p>ยอดผ่อนตามตัวกรองและคำค้นหา</p>
                        <strong className="h3">
                          {visibleSummary.total.toLocaleString("th-TH", {
                            maximumFractionDigits: 2,
                          })}{" "}
                          บาท
                        </strong>
                        <span>
                          {visibleSummary.count.toLocaleString()} รายการ
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="card card-body text-center">
                        <p>
                          ยอดผ่อนทั้งหมดทุกวันที่
                          {majorUser !== "admin" && ` — ${majorUser}`}
                        </p>
                        <strong className="h3">
                          {allTotal.toLocaleString("th-TH", {
                            maximumFractionDigits: 2,
                          })}{" "}
                          บาท
                        </strong>
                        <span>{stock.length.toLocaleString()} รายการ</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="custom-tabs-three-profile"
                  role="tabpanel"
                  aria-labelledby="custom-tabs-three-profile-tab"
                >
                  <Summarize />
                </div>
              </div>
            </div>
          </div>
        </>
      }
    />
  );
}
