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
  setEdit: React.Dispatch<
    React.SetStateAction<{
      stockType: string;
      major: string;
      payload: {};
    }>
  >;
  edit: {
    stockType: string;
    major: string;
    payload: any;
  };
}

export default function InstallmentMenuInsert({
  id,
  setEdit,
  edit,
}: InstallmentMenuInsertProps) {
  const { majorUser } = useContext(AppContext);
  const {
    installmentNo,
    setInstallmentNo,
    priceTotal,
    setPriceTotal,
    setStockType,
    setDocumentId,
    documentId,
    updateKey,
  } = useContext(StockContext);

  const [selectDocId, setSelectDocId] = useState<any[]>([]);
  const [dataCustomer, setDataCustomer] = useState({
    CUSTOMER_NAME: "",
    ID_CARD: "",
  });

  useEffect(() => {
    setStockType("ผ่อน");
    StockService.GetStockBye(majorUser).then((res) => {
      setSelectDocId(res.data);
    });
  }, []);

  useEffect(() => {
    StockService.GetStockKay(majorUser).then((res) => {
      const filter = res.data.filter((fil) => fil.ID === documentId)[0];
      setPriceTotal(filter?.INSTALLMENT);
      setDataCustomer({
        CUSTOMER_NAME: filter?.CUSTOMER,
        ID_CARD: filter?.ID_CARD,
      });
    });
  }, [documentId]);

  useEffect(() => {
    const major = sessionStorage.getItem("majorEdit");

    if (major) {
      StockService.GetFindStockById(id, major, "ผ่อน").then((res) => {
        setEdit({
          stockType: "ผ่อน",
          major: major,
          payload: res.data,
        });
      });
    }
  }, []);

  return (
    <>
      {!updateKey && (
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
                      String(res.data) === "false"
                        ? ($("#alert-installment-modal") as any).modal("show")
                        : setInstallmentNo(Number(res.data) + 1);
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
          <div className="form-group">
            <label className="float-left">{MenuKayEnum.ID_CARD}</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="กรุณาเลือกรหัสเอกสาร"
                value={dataCustomer.ID_CARD}
                readOnly
              />
            </div>
          </div>
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
                placeholder="กรุณาเลือกรหัสเอกสาร"
                value={dataCustomer.CUSTOMER_NAME}
                readOnly
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
            onChange={(e) =>
              !updateKey
                ? setPriceTotal(e.target.value)
                : setEdit({
                    major: edit.major,
                    stockType: edit.stockType,
                    payload: {
                      ...edit.payload,
                      PRICE_TOTAL: e,
                    },
                  })
            }
            placeholder="จำนวนเงิน"
            value={!updateKey ? priceTotal : edit.payload.PRICE_TOTAL}
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
            onChange={(e) =>
              !updateKey
                ? setInstallmentNo(Number(e.target.value))
                : setEdit({
                    major: edit.major,
                    stockType: edit.stockType,
                    payload: {
                      ...edit.payload,
                      INSTALLMENT_NO: e,
                    },
                  })
            }
            placeholder="งวดที่"
            value={!updateKey ? installmentNo : edit.payload.INSTALLMENT_NO}
          />
        </div>
      </div>
    </>
  );
}
