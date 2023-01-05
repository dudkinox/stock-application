import { useContext, useEffect, useState } from "react";
import initTable, { destroyTable } from "../../common/DataTable";
import { StockContext } from "../../contexts/StockContext";
import StockService from "../../services/StockServices";
import ContentLayOut from "../../layouts/ContentLayOut";
import ModalCommon from "../../common/Modal";
import DataList from "../../common/DataList";
import SelectChoice from "../../common/Select";
import TextInput from "../../common/TextInput";
import ByeMenuInsert from "../../layouts/stock/ByeMenuInsert";
import InstallmentMenuInsert from "../../layouts/stock/InstallmentMenuInsert";
import IsMenuInsert from "../../layouts/stock/IsMenuInsert";
import KayMenuInsert from "../../layouts/stock/KayMenuInsert";
import TableCommon from "../../common/Table";
import {
  MenuByeArray,
  MenuEquipmentArray,
  MenuInstallmentPaymentArray,
  MenuKayArray,
} from "../../enum/menuInsert.enum";
import { camelToSnakeObject } from "../../common/CamelToSnake";

export default function StockPage() {
  const {
    stock,
    setStock,
    date,
    setDate,
    idCard,
    setIdCard,
    customerStatus,
    setCustomerStatus,
    stockType,
    setStockType,
    cases,
    setCases,
    firm,
    setFirm,
    len,
    setLen,
    bigCharge,
    setBigCharge,
    charge,
    setCharge,
    repair,
    setRepair,
    sum,
    setSum,
    version,
    setVersion,
    price,
    setPrice,
    imei,
    setImei,
    source,
    setSource,
    battery,
    setBattery,
    customer,
    setCustomer,
    tel,
    setTel,
    starMoney,
    setStarMoney,
    month,
    setMonth,
    installment,
    setInstallment,
    datePayment,
    setDatePayment,
    installmentNo,
    setInstallmentNo,
    priceTotal,
    setPriceTotal,
    menuInsert,
    isMenuInsert,
    byeMenuInsert,
    kayMenuInsert,
    installmentMenuInsert,
    handlerSubmit,
  } = useContext(StockContext);
  const [itemList, setItemList] = useState<any>({});
  const [typeStock, setTypeStock] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");
  const [updateStockType, setUpdateStockType] = useState<string>("");

  const SelectStockType = (value: string) => {
    setStockType(value);
    menuInsert(value);
  };

  const deleteStock = (idCard: string) => () => {
    StockService.DeleteStockById(idCard)
      .then((res) => {
        alert(res.data.message);
        StockService.GetStock()
          .then((res) => {
            setTimeout(() => destroyTable());
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

  const openModalUpdate = (id: string, stockType: string) => () => {
    ($("#insert-modal") as any).modal("show");
    setIsUpdate(true);
    menuInsert(stockType);
    StockService.GetFindStockById(id, stockType)
      .then((res) => {
        setUpdateId(id);
        setUpdateStockType(res.data.STOCK_TYPE);
        setDate(res.data.DATE);
        setIdCard(res.data.ID_CARD);
        setCustomerStatus(res.data.CUSTOMER_STATUS);
        setStockType(res.data.STOCK_TYPE);
        setCases(res.data.CASES);
        setFirm(res.data.FIRM);
        setLen(res.data.LEN);
        setBigCharge(res.data.BIG_CHARGE);
        setCharge(res.data.CHARGE);
        setRepair(res.data.REPAIR);
        setSum(res.data.SUM);
        setVersion(res.data.VERSION);
        setPrice(res.data.PRICE);
        setImei(res.data.IMEI);
        setSource(res.data.SOURCE);
        setBattery(res.data.BATTERY);
        setCustomer(res.data.CUSTOMER);
        setTel(res.data.TEL);
        setStarMoney(res.data.STAR_MONEY);
        setMonth(res.data.MONTH);
        setInstallment(res.data.INSTALLMENT);
        setDatePayment(res.data.DATE_PAYMENT);
        setInstallmentNo(res.data.INSTALLMENT_NO);
        setPriceTotal(res.data.PRICE_TOTAL);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const updateStockHandler = (stockType: string) => () => {
    var payload = {};

    switch (stockType) {
      case "อุปกรณ์":
        payload = {
          date,
          cases,
          firm,
          len,
          bigCharge,
          charge,
          repair,
          sum,
        };
        break;
      case "ขาย":
        payload = {
          date,
          customer,
          tel,
          version,
          imei,
          starMoney,
          month,
          installment,
          datePayment,
        };
        break;
      case "ซื้อ":
        payload = {
          date,
          version,
          price,
          imei,
          source,
          battery,
        };
        break;
      case "ผ่อน":
        payload = {
          date,
          installmentNo,
          priceTotal,
        };
        break;
    }

    StockService.UpdateStock(updateId, stockType, camelToSnakeObject(payload))
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const openDetailModal = (idCard: string, stockType: string) => () => {
    setTypeStock(stockType);
    StockService.GetDetailStockService(idCard)
      .then((res) => {
        setItemList(res.data);
      })
      .catch((err) => {
        alert(err);
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
            id={"insert-modal"}
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
                      value={date}
                    />
                    <DataList
                      label={"ค้นหา / เลือก เลขบัตรประชาชน:"}
                      setValue={setIdCard}
                      icon={"far fa-id-card"}
                      data={["1", "2", "3"]}
                      placeholder={"เลขบัตรประชาชน"}
                      minLength={13}
                      maxLength={13}
                      value={idCard}
                      isReadOnly={isUpdate}
                    />
                    {isUpdate ? (
                      <>
                        <TextInput
                          label={"ประวัติลูกค้า:"}
                          icon={"fas fa-history"}
                          setValue={setCustomerStatus}
                          type={"text"}
                          placeholder={"ประวัติลูกค้า"}
                          value={customerStatus}
                          readonly={true}
                        />
                        <TextInput
                          label={"ประเภท:"}
                          icon={"far fa-file"}
                          setValue={setStockType}
                          type={"text"}
                          placeholder={"ประเภท"}
                          value={stockType}
                          readonly={true}
                        />
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                    {isMenuInsert && <IsMenuInsert />}
                    {byeMenuInsert && <ByeMenuInsert />}
                    {kayMenuInsert && <KayMenuInsert />}
                    {installmentMenuInsert && <InstallmentMenuInsert />}
                  </div>
                </div>
                <div className="modal-footer">
                  {isUpdate ? (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss="modal"
                      onClick={updateStockHandler(updateStockType)}
                    >
                      อัพเดต
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss="modal"
                      onClick={handlerSubmit}
                    >
                      บันทึก
                    </button>
                  )}

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
          <ModalCommon
            title={`รายละเอียด ${typeStock}`}
            id={"detail-modal"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
                    <div className="row justify-content-center col-12 mb-3">
                      {Object.keys(itemList).map((key, index) => {
                        if (index > 1) {
                          return (
                            <>
                              <div className="col-2 my-3">
                                <label className="col-form-label">
                                  {typeStock === "อุปกรณ์"
                                    ? MenuEquipmentArray[index - 2]
                                    : typeStock === "ซื้อ"
                                    ? MenuByeArray[index - 2]
                                    : typeStock === "ขาย"
                                    ? MenuKayArray[index - 2]
                                    : MenuInstallmentPaymentArray[index - 2]}
                                </label>
                              </div>
                              <div className="col-4 my-3">
                                <input
                                  type="text"
                                  className="form-control col-auto"
                                  placeholder=""
                                  value={itemList[key]}
                                  readOnly
                                />
                              </div>
                            </>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
                <div className="mb-4 text-center">
                  <button
                    type="button"
                    className="btn btn-danger col-3"
                    data-dismiss="modal"
                  >
                    ปิด
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
                    data-target="#insert-modal"
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
                      <button
                        className="btn btn-warning mx-2"
                        onClick={openModalUpdate(item.ID, item.STOCK_TYPE)}
                      >
                        <i className="nav-icon fas fa-pen" />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={deleteStock(item.ID_CARD)}
                      >
                        <i className="nav-icon fas fa-trash" />
                      </button>
                    </div>
                  </td>
                  <td>{item.ID_CARD}</td>
                  <td>{item.CUSTOMER_STATUS}</td>
                  <td>{item.STOCK_TYPE}</td>
                  <td>
                    <button
                      className="btn primary-btn text-white"
                      data-toggle="modal"
                      data-target="#detail-modal"
                      onClick={openDetailModal(item.ID_CARD, item.STOCK_TYPE)}
                    >
                      รายละเอียด
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
