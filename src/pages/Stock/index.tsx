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
import TableCommon from "../../common/Table";
import {
  MenuByeArray,
  MenuEquipmentArray,
  MenuInstallmentPaymentArray,
  MenuKayArray,
  MenuNewInstallmentArray,
} from "../../enum/menuInsert.enum";
import { camelToSnakeObject } from "../../common/CamelToSnake";
import {
  AlertError,
  AlertSuccess,
  AlertWarning,
} from "../../common/ToastrCommon";
import CustomerServices from "../../services/CustomerServices";
import { GetCustomerResponse } from "../../Models/Response/GetCustomerResponse";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts";
import MajorResponse from "../../Models/Response/GetMajorResponse";
import MajorServices from "../../services/MajorService";
import convertDateToThai from "../../common/DateFormat";
import MenuNewInstallmentInsert from "../../layouts/stock/MenuNewInstallmentInsert";

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
    setIsMenuInsert,
    byeMenuInsert,
    setByeMenuInsert,
    kayMenuInsert,
    setKayMenuInsert,
    NewInstallmentMenuInsert,
    setNewInstallmentMenuInsert,
    installmentMenuInsert,
    handlerSubmit,
    isShowModal,
    majorInsert,
    setMajorInsert,
    clearInputValue,
    installmentMonth,
    setInstallmentMonth,
    numberInstallment,
    setNumberInstallment,
    payment,
    setPayment,
    newDatePayment,
    setNewDatePayment,
    newPriceTotal,
    setNewPriceTotal,
    newStarMoney,
    setNewStarMoney,
    setSerialNumber,
    serialNumber,
  } = useContext(StockContext);
  const { setPathUrl, majorUser, isEdit, isDelete, setIsLoading } =
    useContext(AppContext);
  const [itemList, setItemList] = useState<any>({});
  const [typeStock, setTypeStock] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");
  const [majorForUpdate, setMajorForUpdate] = useState<string>("");
  const [customerFind, setCustomerFind] = useState<GetCustomerResponse>();
  const [fetchMajor, setFetchMajor] = useState<MajorResponse[]>([]);
  const [selectCustomer, setSelectCustomer] = useState<GetCustomerResponse[]>(
    []
  );
  const [updateStockType, setUpdateStockType] = useState<string>("");
  const customerExists = selectCustomer.find((fil) => fil.ID_CARD === idCard);
  const navigate = useNavigate();

  const stockTableHeaders = ["รหัสเอกสาร", "วันที่", "ประเภท", "รายละเอียด"];

  const editableStockTableHeaders = [...stockTableHeaders, "แก้ไข", "ลบ"];

  const deleteStock = (id: string, major: string) => () => {
    setIsLoading(true);
    StockService.DeleteStockById(id, major)
      .then((res) => {
        AlertSuccess(res.data.message);
        StockService.GetStock(majorUser)
          .then((res) => {
            setTimeout(() => destroyTable());
            setStock(res.data);
            setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
            setIsLoading(false);
          })
          .catch((err) => {
            AlertError(err.response.data.message);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  };

  const openModalDetail =
    (idCard: string, stockType: string, major: string) => () => {
      ($("#detail-modal") as any).modal("show");
      setTypeStock(stockType);
      setIsLoading(true);
      StockService.GetFindStockById(idCard, major, stockType)
        .then((res) => {
          setItemList(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          AlertError(err.response.data.message);
          setIsLoading(false);
        });
    };

  const fetchTableStock = () => {
    StockService.GetStock(majorUser)
      .then((res) => {
        setStock(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 1000);
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  };

  const nextValidate = () => {
    const isNext = date !== "" && stockType !== "";
    const isAdmin = majorUser === "admin";
    const isNextAdmin = isAdmin && majorInsert !== "";

    if ((isAdmin && isNextAdmin && isNext) || (!isAdmin && isNext)) {
      navigate(
        `/stock/add?type=${stockType === "ซื้อ" ? "bye" : "equipment"}`,
        {
          state: { id: 0 },
        }
      );
    } else {
      AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchTableStock();
  }, [setStock]);

  useEffect(() => {
    setIsLoading(true);
    CustomerServices.getCustomer(majorUser).then((res) => {
      setSelectCustomer(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setCustomerFind(customerExists);
    setCustomerStatus(customerFind?.CUSTOMER_STATUS ?? "");
  }, [
    customerExists,
    customerFind?.CUSTOMER_STATUS,
    idCard,
    selectCustomer,
    setCustomerStatus,
  ]);

  useEffect(() => {
    if (idCard.length === 13 && !customerExists) {
      $("#insert-modal").hide();
      $(".modal-backdrop.fade.show").remove();
      AlertWarning("กรุณากรอกข้อมูลลูกค้าก่อนทำรายการ Stock");
      setPathUrl("/customer");
      navigate("/customer", { state: true });
    }
  }, [
    customerExists,
    customerFind,
    idCard,
    navigate,
    selectCustomer,
    setPathUrl,
  ]);

  useEffect(() => {
    setIsLoading(true);
    MajorServices.getMajors()
      .then((res) => {
        setFetchMajor(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  }, [setFetchMajor]);

  return (
    <ContentLayOut
      title={"stock"}
      topic={"สต๊อกสินค้า"}
      btnHeader={
        <button
          onClick={() => {
            setDate("");
            setIdCard("");
            setIsUpdate(false);
            setStockType("");
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
                    {/* <DataList
                      label={"ค้นหาชื่อ / เลือก เลขบัตรประชาชน:"}
                      setValue={setIdCard}
                      icon={"far fa-id-card"}
                      data={selectCustomer.map((item) => item)}
                      placeholder={"ค้นหาชื่อ / เลขบัตรประชาชน"}
                      minLength={13}
                      maxLength={13}
                      value={idCard}
                      isReadOnly={isUpdate}
                    /> */}
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
                        {/* {customerFind && (
                          <TextInput
                            label={"ชื่อลูกค้า:"}
                            icon={"far fa-id-card"}
                            setValue={() => {}}
                            type={"text"}
                            readonly={true}
                            bgColor={"bg-secondary"}
                            value={`${customerFind.NAME} ${customerFind.LAST_NAME}`}
                          />
                        )}
                        <SelectChoice
                          label={"ประวัติลูกค้า"}
                          setValue={setCustomerStatus}
                          icon={"fas fa-history"}
                          topic={"ประวัติลูกค้า"}
                          options={["ลูกค้าดี", "ลูกค้าโกง", "ลูกค้าจ่ายช้า"]}
                          placeholder={"ประวัติลูกค้า"}
                          value={
                            customerFind?.CUSTOMER_STATUS ?? customerStatus
                          }
                        /> */}
                        <SelectChoice
                          label={"ประเภท"}
                          setValue={setStockType}
                          icon={"far fa-file"}
                          topic={"ประเภท"}
                          options={["ซื้อ", "ผ่อน", "ผ่อนครั้งแรก", "อุปกรณ์"]}
                          placeholder={"ประเภทลูกค้า"}
                          value={stockType}
                        />
                      </>
                    )}
                    {/* {isMenuInsert && <IsMenuInsert />}
                    {byeMenuInsert && <ByeMenuInsert />}
                    {kayMenuInsert && (
                      <KayMenuInsert
                        fullName={`${customerFind?.NAME} ${customerFind?.LAST_NAME}`}
                      />
                    )}
                    {NewInstallmentMenuInsert && <MenuNewInstallmentInsert />}
                    {installmentMenuInsert && (
                      <InstallmentMenuInsert selectCustomer={selectCustomer} />
                    )} */}
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
                  {/* <button
                    type="button"
                    className="btn primary-btn col-lg-2 col-sm-auto"
                    data-dismiss={isShowModal && `modal`}
                    onClick={handlerSubmit}
                  >
                    บันทึก
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                  >
                    ยกเลิก
                  </button> */}
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
                                    : typeStock === "ผ่อนครั้งแรก"
                                    ? MenuNewInstallmentArray[index - 2]
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
              columns={isEdit() ? editableStockTableHeaders : stockTableHeaders}
              row={stock.map((item, i) => (
                <tr key={i} className="text-center">
                  <td>{item.ID}</td>
                  <td>{convertDateToThai(new Date(item.DATE))}</td>
                  <td>{item.STOCK_TYPE}</td>
                  <td>
                    <div>
                      <button
                        className="btn btn-primary"
                        onClick={openModalDetail(
                          item.ID,
                          item.STOCK_TYPE,
                          item.MAJOR
                        )}
                      >
                        <i className="nav-icon fas fa-eye" />
                      </button>
                    </div>
                  </td>
                  <td>ปรับปรุง</td>
                  <td>
                    {isDelete() ? (
                      <button
                        className="btn btn-danger"
                        onClick={deleteStock(item.ID, item.MAJOR)}
                      >
                        <i className="nav-icon fas fa-trash" />
                      </button>
                    ) : (
                      "ไม่มีสิทธิ"
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
