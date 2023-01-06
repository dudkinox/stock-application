import { useState, useContext, useEffect } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import TableCommon from "../../common/Table";
import ModalCommon from "../../common/Modal";
import TextInput from "../../common/TextInput";
import DataList from "../../common/DataList";
import { CustomerContext } from "../../contexts/CustomerContext";
import CustomerServices from "../../services/CustomerServices";
import { AlertError } from "../../common/ToastrCommon";
import initTable from "../../common/DataTable";
import SelectChoice from "../../common/Select";

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
  } = useContext(CustomerContext);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

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
                      data={["1", "2", "3"]}
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
                      type={"text"}
                      placeholder={"จำนวนเงินที่ต้องผ่อนต่อเดือน"}
                      value={installmentMonth}
                    />
                    <TextInput
                      label={"จำนวนงวดที่ผ่อนแล้ว:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setNumberInstallment}
                      type={"text"}
                      placeholder={"จำนวนงวดที่ผ่อนแล้ว"}
                      value={numberInstallment}
                    />
                    <TextInput
                      label={"ยอดชำระปัจจุบัน:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setPayment}
                      type={"text"}
                      placeholder={"ยอดชำระปัจจุบัน"}
                      value={payment}
                    />
                    <TextInput
                      label={"วันที่ต้องชำระ:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setDatePayment}
                      type={"text"}
                      placeholder={"วันที่ต้องชำระ"}
                      value={datePayment}
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
                      </>
                    )}
                    <TextInput
                      label={"สถานะ:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setProcess}
                      type={"text"}
                      placeholder={"สถานะ"}
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
                      //   onClick={updateStockHandler(updateStockType)}
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
                        //   onClick={openModalUpdate(item.ID, item.STOCK_TYPE)}
                      >
                        <i className="nav-icon fas fa-pen" />
                      </button>
                      <button
                        className="btn btn-danger"
                        //   onClick={deleteStock(item.ID_CARD)}
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
