import { useState, useContext, useEffect } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import TableCommon from "../../common/Table";
import ModalCommon from "../../common/Modal";
import TextInput from "../../common/TextInput";
import DataList from "../../common/DataList";
import { CustomerContext } from "../../contexts/CustomerContext";
import CustomerServices from "../../services/CustomerServices";
import { AlertError, AlertSuccess } from "../../common/ToastrCommon";
import initTable, { destroyTable } from "../../common/DataTable";
import SelectChoice from "../../common/Select";
import { CustomerRequest } from "../../Models/Request/CustomerRequest";
import { camelToSnakeObject } from "../../common/CamelToSnake";

export default function CustomerPage() {
  const {
    customer,
    setCustomer,
    idCard,
    setIdCard,
    name,
    setName,
    lastName,
    setLastName,
    installmentMonth,
    setInstallmentMonth,
    numberInstallment,
    setNumberInstallment,
    payment,
    setPayment,
    datePayment,
    setDatePayment,
    customerStatus,
    setCustomerStatus,
    process,
    setProcess,
    handlerSubmit,
    reGetCustomer,
    isShowModal,
  } = useContext(CustomerContext);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  const openModalUpdate = (id: string) => () => {
    ($("#insert-modal") as any).modal("show");
    setIsUpdate(true);
    CustomerServices.getCustomerById(id)
      .then((res) => {
        setUpdateId(id);
        setIdCard(res.data.ID_CARD);
        setName(res.data.NAME);
        setLastName(res.data.LAST_NAME);
        setInstallmentMonth(res.data.INSTALLMENT_MONTH);
        setNumberInstallment(res.data.NUMBER_INSTALLMENT);
        setPayment(res.data.PAYMENT);
        setDatePayment(res.data.DATE_PAYMENT);
        setCustomerStatus(res.data.CUSTOMER_STATUS);
        setProcess(res.data.PROCESS);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  };

  const updateStockHandler = (id: string) => () => {
    let payload: CustomerRequest = {
      idCard,
      name,
      lastName,
      installmentMonth,
      numberInstallment,
      payment,
      datePayment,
      customerStatus,
      process,
    };

    CustomerServices.updateCustomer(id, camelToSnakeObject(payload))
      .then((res) => {
        AlertSuccess(res.data.message);
        reGetCustomer();
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  };

  const deleteCustomer = (id: string) => () => {
    CustomerServices.deleteCustomer(id)
      .then((res) => {
        AlertSuccess(res.data.message);
        CustomerServices.getCustomer()
          .then((res) => {
            setTimeout(() => destroyTable());
            setCustomer(res.data);
            setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
          })
          .catch((err) => {
            AlertError(err.response.data.message);
          });
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  };

  useEffect(() => {
    CustomerServices.getCustomer()
      .then((res) => {
        setCustomer(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  }, [setCustomer]);

  return (
    <ContentLayOut
      title={"Customer"}
      topic={"ข้อมูลลูกค้า"}
      page={
        <>
          <ModalCommon
            title={"เพิ่มข้อมูล"}
            id={"insert-modal"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
                    <DataList
                      label={"ค้นหา / เลือก เลขบัตรประชาชน:"}
                      setValue={setIdCard}
                      icon={"far fa-id-card"}
                      placeholder={"เลขบัตรประชาชน"}
                      minLength={13}
                      maxLength={13}
                      value={idCard}
                      isReadOnly={isUpdate}
                    />
                    <TextInput
                      label={"ชื่อ:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setName}
                      type={"text"}
                      placeholder={"ชื่อ"}
                      value={name}
                    />
                    <TextInput
                      label={"นามสกุล:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setLastName}
                      type={"text"}
                      placeholder={"นามสกุล"}
                      value={lastName}
                    />
                    <TextInput
                      label={"ต้องผ่อนต่อเดือน:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setInstallmentMonth}
                      type={"number"}
                      placeholder={"จำนวนเงินที่ต้องผ่อนต่อเดือน"}
                      value={installmentMonth}
                    />
                    <TextInput
                      label={"จำนวนงวดที่ผ่อนแล้ว:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setNumberInstallment}
                      type={"number"}
                      placeholder={"จำนวนงวดที่ผ่อนแล้ว"}
                      value={numberInstallment}
                    />
                    <TextInput
                      label={"ยอดชำระปัจจุบัน:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setPayment}
                      type={"number"}
                      placeholder={"ยอดชำระปัจจุบัน"}
                      value={payment}
                    />
                    <SelectChoice
                      label={"วันที่ต้องชำระ:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setDatePayment}
                      topic={"เลือกวันที่"}
                      options={Array.from({ length: 30 }, (_, i) =>
                        (i + 1).toString()
                      )}
                      value={datePayment}
                    />
                    <SelectChoice
                      label={"ประวัติลูกค้า"}
                      setValue={setCustomerStatus}
                      icon={"fas fa-history"}
                      topic={"ประวัติลูกค้า"}
                      options={["ลูกค้าดี", "ลูกค้าโกง", "ลูกค้าจ่ายช้า"]}
                      placeholder={"ประวัติลูกค้า"}
                      value={customerStatus}
                    />
                    <SelectChoice
                      label={"สถานะ"}
                      setValue={setProcess}
                      placeholder="เลือกสถานะ"
                      icon={"fas fa-history"}
                      topic={"เลือกสถานะ"}
                      options={["กำลังผ่อน", "ชำระครบถ้วน", "ไม่ระบุ"]}
                      value={process}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  {isUpdate ? (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss="modal"
                      onClick={updateStockHandler(updateId)}
                    >
                      อัพเดต
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss={isShowModal && `modal`}
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
          <div className="card-body">
            <TableCommon
              columns={[
                "รหัสลูกค้า",
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
                "ชื่อ-สกุล",
                "ต้องผ่อนต่อเดือน",
                "จำนวนงวดที่ผ่อนแล้ว",
                "ยอดชำระปัจจุบัน",
                "วันที่ต้องชำระ",
                "ประวัติลูกค้า",
                "สถานะ",
              ]}
              row={customer.map((item, i) => (
                <tr key={i} className="text-center">
                  <td>{item.ID}</td>
                  <td>
                    <div className="row justify-content-center">
                      <button
                        className="btn btn-warning mx-2"
                        onClick={openModalUpdate(item.ID)}
                      >
                        <i className="nav-icon fas fa-pen" />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={deleteCustomer(item.ID)}
                      >
                        <i className="nav-icon fas fa-trash" />
                      </button>
                    </div>
                  </td>
                  <td>{item.ID_CARD}</td>
                  <td>
                    {item.NAME} {item.LAST_NAME}
                  </td>
                  <td>{item.INSTALLMENT_MONTH}</td>
                  <td>{item.NUMBER_INSTALLMENT}</td>
                  <td>{item.PAYMENT}</td>
                  <td>{item.DATE_PAYMENT}</td>
                  <td>{item.CUSTOMER_STATUS}</td>
                  <td>{item.PROCESS}</td>
                </tr>
              ))}
            />
          </div>
        </>
      }
    />
  );
}
