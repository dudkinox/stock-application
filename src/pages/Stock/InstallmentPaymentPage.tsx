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

export function StockInstallmentPaymentPage() {
  const { majorUser, setIsLoading, isEdit, deleteStock, editStock } =
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
  } = useContext(StockContext);
  const [stock, setStock] = useState<any[]>([]);
  const stockTableHeaders = [
    "รหัสเอกสาร",
    "วันที่",
    "เลขบัตรประชาชน / ชื่อลูกค้า",
    "สาขา",
    "งวดที่",
    "จำนวนเงิน",
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
        title={"stock"}
        topic={"ผ่อน"}
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
            เพิ่มข้อมูลผ่อน
          </button>
        }
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
            <div className="card-body">
              <TableCommon
                columns={stockTableHeaders}
                row={stock.map((item, i) => (
                  <tr key={i} className="text-center">
                    <td>{item.ID}</td>
                    <td>{item.DATE}</td>
                    <td>{item.ID_CARD}</td>
                    <td>{item.MAJOR}</td>
                    <td>{item.INSTALLMENT_NO}</td>
                    <td>{item.PRICE_TOTAL}</td>
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
