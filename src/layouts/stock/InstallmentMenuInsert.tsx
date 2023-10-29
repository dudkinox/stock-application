import { useContext, useEffect, useState } from "react";
import { StockContext } from "../../contexts/StockContext";
import {
  MenuInstallmentPaymentEnum,
  MenuKayEnum,
} from "../../enum/menuInsert.enum";
import { GetCustomerResponse } from "../../Models/Response/GetCustomerResponse";
import DataList from "../../common/DataList";
import { AppContext } from "../../contexts";
import CustomerServices from "../../services/CustomerServices";
import { AlertWarning } from "../../common/ToastrCommon";
import { useLocation, useNavigate } from "react-router-dom";
import StockService from "../../services/StockServices";
import PaymentService from "../../services/PaymentService";
import ModalCommon from "../../common/Modal";

interface InstallmentMenuInsertProps {
  id: string;
}

export default function InstallmentMenuInsert({
  id,
}: InstallmentMenuInsertProps) {
  const { setPathUrl, setIsLoading, majorUser } = useContext(AppContext);
  const {
    installmentNo,
    setInstallmentNo,
    priceTotal,
    setPriceTotal,
    setCustomerStatus,
    setCustomer,
    setIdCard,
    idCard,
    setStockType,
    setDate,
    setDocumentId,
    documentId,
  } = useContext(StockContext);
  const [selectCustomer, setSelectCustomer] = useState<GetCustomerResponse[]>(
    []
  );
  const [selectDocId, setSelectDocId] = useState<any[]>([]);
  const [customerExists, setCustomerExists] =
    useState<GetCustomerResponse | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const insert = location.state.insert;

  useEffect(() => {
    setIsLoading(true);
    CustomerServices.getCustomer(majorUser).then((res) => {
      setSelectCustomer(res.data);
      setIsLoading(false);
      setStockType("ผ่อน");
    });
  }, []);

  useEffect(() => {
    StockService.GetStockBye(majorUser).then((res) => {
      setSelectDocId(res.data);
    });
  }, []);

  useEffect(() => {
    StockService.GetStockKay(majorUser).then((res) => {
      setPriceTotal(
        res.data.filter((fil) => fil.ID === documentId)[0].INSTALLMENT
      );
    });
  }, [documentId]);

  useEffect(() => {
    const updatedCustomerExists = selectCustomer.find(
      (fil) => fil.ID_CARD === idCard
    );
    setCustomerExists(updatedCustomerExists ?? null);
    document.body.classList.remove("modal-open");

    if (idCard.length === 13 && !updatedCustomerExists && !insert) {
      AlertWarning("กรุณากรอกข้อมูลลูกค้าก่อนทำรายการ Stock");
      setPathUrl("/customer");
      navigate("/customer", {
        state: { enable: true, id: id },
      });
    } else if (idCard.length === 13 && !updatedCustomerExists) {
      $("#insert-modal").hide();
      $(".modal-backdrop.fade.show").remove();
    } else if (insert) {
      $("#insert-modal").hide();
      $(".modal-backdrop.fade.show").remove();
    }
    setCustomerStatus(updatedCustomerExists?.CUSTOMER_STATUS ?? "");
    setCustomer(
      `${updatedCustomerExists?.NAME ?? ""} ${
        updatedCustomerExists?.LAST_NAME ?? ""
      }`
    );
  }, [idCard, selectCustomer, customerExists, navigate, setPathUrl]);

  useEffect(() => {
    const major = sessionStorage.getItem("majorEdit");
    if (major) {
      StockService.GetFindStockById(id, major, "ผ่อน").then((res) => {
        setIdCard(res.data.ID_CARD);
        setCustomer(res.data.CUSTOMER_NAME);
        setPriceTotal(res.data.PRICE_TOTAL);
        setInstallmentNo(res.data.INSTALLMENT_NO);
        setDate(res.data.DATE);
      });
    }
  }, []);

  return (
    <>
      {id !== "" && (
        <>
          <ModalCommon
            title={"ชำระครบถ้วน"}
            id={"alert-installment-modal"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
                    <h5 className="text-center">ชำระครบถ้วน</h5>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn primary-btn col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                  >
                    ตกลง
                  </button>
                </div>
              </>
            }
          />
          <div className="form-group">
            <label className="float-left">
              {MenuInstallmentPaymentEnum.DOC_ID}
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="far fa-id-card"></i>
                </span>
              </div>
              <input
                list="browsers"
                name="browser"
                id="browser"
                className="form-control"
                onChange={(e: any) => {
                  setDocumentId(e.target.value);
                  PaymentService.InstallmentNumber(e.target.value).then(
                    (res) => {
                      res.data
                        ? setInstallmentNo(Number(res.data) + 1)
                        : ($("#alert-installment-modal") as any).modal("show");
                    }
                  );
                }}
                placeholder={MenuInstallmentPaymentEnum.DOC_ID}
                autoComplete="off"
                value={documentId}
              />
              <datalist id="browsers">
                {selectDocId?.map((item: any) => (
                  <option
                    key={item.ID}
                    label={item.SERIAL_NUMBER}
                    value={item.ID}
                  />
                )) ?? []}
              </datalist>
            </div>
          </div>
          <DataList
            label={"ค้นหาชื่อ / เลือก เลขบัตรประชาชน:"}
            setValue={setIdCard}
            icon={"far fa-id-card"}
            data={selectCustomer.map((item) => item)}
            placeholder={"ค้นหาชื่อ / เลขบัตรประชาชน"}
            minLength={13}
            maxLength={13}
            value={idCard}
          />
          <div className="form-group">
            <label className="float-left">{MenuKayEnum.CUSTOMER}</label>
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
                value={
                  customerExists
                    ? `${customerExists?.NAME} ${customerExists?.LAST_NAME}`
                    : ""
                }
                readOnly={customerExists !== null}
              />
            </div>
          </div>
        </>
      )}
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
            type="number"
            className="form-control"
            onChange={(e: any) => setPriceTotal(e.target.value)}
            placeholder="จำนวนเงิน"
            value={priceTotal}
          />
        </div>
      </div>
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
            type="number"
            className="form-control"
            onChange={(e: any) => setInstallmentNo(e.target.value)}
            placeholder="งวดที่"
            value={installmentNo}
          />
        </div>
      </div>
    </>
  );
}
