import { MenuKayEnum } from "../../enum/menuInsert.enum";
import { useContext, useEffect, useState } from "react";
import { StockContext } from "../../contexts/StockContext";
import DataList from "../../common/DataList";
import { AlertWarning } from "../../common/ToastrCommon";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts";
import { GetCustomerResponse } from "../../Models/Response/GetCustomerResponse";
import CustomerServices from "../../services/CustomerServices";
import StockService from "../../services/StockServices";
import { convertToDateFormat } from "../../common/DateFormat";
import TextInput from "../../common/TextInput";

interface KayMenuInsertProps {
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

export default function KayMenuInsert({
  id,
  setEdit,
  edit,
}: KayMenuInsertProps) {
  const {
    setCustomerStatus,
    setCustomer,
    setIdCard,
    idCard,
    setStockType,
    date,
    setDate,
    tel,
    setTel,
    version,
    setVersion,
    imei,
    setImei,
    starMoney,
    setStarMoney,
    month,
    setMonth,
    installment,
    setInstallment,
    datePayment,
    setDatePayment,
    updateKay,
  } = useContext(StockContext);
  const { setPathUrl, setIsLoading, majorUser } = useContext(AppContext);
  const [selectCustomer, setSelectCustomer] = useState<GetCustomerResponse[]>(
    []
  );
  const [customerExists, setCustomerExists] =
    useState<GetCustomerResponse | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const insert = location.state?.insert;

  useEffect(() => {
    setIsLoading(true);
    CustomerServices.getCustomer(majorUser).then((res) => {
      setSelectCustomer(res.data);
      setIsLoading(false);
      setStockType("ขาย");
    });
  }, []);

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
      StockService.GetFindStockById(id, major, "ขาย").then((res) => {
        setEdit({
          stockType: "ขาย",
          major: major,
          payload: res.data,
        });
      });
    }
  }, []);

  return (
    <>
      <span className="mt-3"></span>
      {!updateKay && (
        <>
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
      <TextInput
        label={MenuKayEnum.DATE}
        icon={"fas fa-calendar"}
        setValue={(e: any) =>
          !updateKay
            ? setDate(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  DATE: e,
                },
              })
        }
        type={"date"}
        placeholder={"วันที่ขาย"}
        value={!updateKay ? date : String(edit.payload.DATE).split(" ")[0]}
      />
      <TextInput
        label={MenuKayEnum.TEL}
        icon={"fas fa-phone-alt"}
        setValue={(e) =>
          !updateKay
            ? setTel(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  TEL: e,
                },
              })
        }
        type={"text"}
        minLength={10}
        maxLength={10}
        placeholder="เบอร์โทร"
        value={!updateKay ? tel : edit.payload.TEL}
      />
      <TextInput
        label={MenuKayEnum.VERSION}
        icon={"fas fa-mobile"}
        setValue={(e: any) =>
          !updateKay
            ? setVersion(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  VERSION: e,
                },
              })
        }
        type={"text"}
        placeholder="รุ่น"
        value={!updateKay ? version : edit.payload.VERSION}
        readonly={!updateKay}
      />
      <TextInput
        label={MenuKayEnum.IMEI}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          !updateKay
            ? setImei(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  IMEI: e,
                },
              })
        }
        type={"text"}
        placeholder={"imei เครื่อง"}
        value={!updateKay ? imei : edit.payload.IMEI}
        readonly={!updateKay}
      />
      <TextInput
        label={MenuKayEnum.STAR_MONEY}
        icon={"fas fa-money-check-alt"}
        setValue={(e: any) =>
          !updateKay
            ? setStarMoney(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  STAR_MONEY: e,
                },
              })
        }
        type={"number"}
        placeholder={"เงินดาวน์"}
        value={!updateKay ? starMoney : edit.payload.STAR_MONEY}
      />
      <TextInput
        label={MenuKayEnum.MONTH}
        icon={"fas fa-money-check-alt"}
        setValue={(e: any) =>
          !updateKay
            ? setMonth(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  MONTH: e,
                },
              })
        }
        type="number"
        min={0}
        placeholder="จำนวนเดือนที่ผ่อน"
        value={!updateKay ? month : edit.payload.MONTH}
      />
      <TextInput
        label={MenuKayEnum.INSTALLMENT}
        icon={"fas fa-calendar-alt"}
        setValue={(e: any) =>
          !updateKay
            ? setInstallment(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  INSTALLMENT: e,
                },
              })
        }
        type="number"
        min={0}
        placeholder="เดือนละ"
        value={!updateKay ? installment : edit.payload.INSTALLMENT}
      />
      <TextInput
        label={MenuKayEnum.DATE_PAYMENT}
        icon={"fas fa-cash-register"}
        setValue={(e: any) =>
          !updateKay
            ? setDatePayment(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  DATE_PAYMENT: e,
                },
              })
        }
        type="text"
        placeholder="ชำระทุกวันที่"
        value={!updateKay ? datePayment : edit.payload.DATE_PAYMENT}
      />
    </>
  );
}
