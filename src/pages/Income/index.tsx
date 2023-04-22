import { useContext, useState } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import TableCommon from "../../common/Table";
import ModalCommon from "../../common/Modal";
import TextInput from "../../common/TextInput";
import { IncomeContext } from "../../contexts/IncomeContext";

export default function IncomePage() {
  const {
    incomeList,
    setIncomeList,
    date,
    setDate,
    listName,
    setListName,
    revenue,
    setRevenue,
    expense,
    setExpense,
    note,
    setNote
  } = useContext(IncomeContext);

  const incomeTableHeaders = [
    "วันที่",
    "รายการ",
    "รายจ่าย(บาท)",
    "รายรับ(บาท)",
    "หมายเหตุ",
  ];

  const openModalIncomeInsert = () => {
    ($("#insert-modal") as any).modal("show");
  }

  return (
    <ContentLayOut
      title={"รายรับ-รายจ่าย"}
      topic={"รายรับ-รายจ่าย"}
      btnHeader={
        <button
          className="btn primary-btn text-white float-right"
          onClick={openModalIncomeInsert}
          data-toggle="modal"
          data-target="#insert-income-modal"
        >
          เพิ่มรายการ
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
                    <TextInput
                      label={"วันที่:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setDate}
                      type={"date"}
                      value={date}
                    />
                    <TextInput
                      label={"ชื่อรายการ:"}
                      icon={"far fa-list-alt"}
                      setValue={setListName}
                      type={"text"}
                      value={listName}
                    />
                    <TextInput
                      label={"รายจ่าย:"}
                      icon={"fas fa-money-bill-wave"}
                      setValue={setRevenue}
                      type={"number"}
                      value={revenue}
                    />
                    <TextInput
                      label={"รายรับ:"}
                      icon={"fas fa-money-bill-wave"}
                      setValue={setExpense}
                      type={"number"}
                      value={expense}
                    />
                    <TextInput
                      label={"หมายเหตุ:"}
                      icon={"far fa-comments"}
                      setValue={setNote}
                      type={"text"}
                      value={note}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn primary-btn col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                    // onClick={}
                  >
                   บันทึก
                  </button>
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
              id="income-table"
              columns={incomeTableHeaders}
              showSummary={true}
              row={incomeList.map((item, i) => (
                <tr key={i} className="text-center">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
              summaryRow={
                <tr className="text-center">
                  <td colSpan={2}>รวม</td>
                  <td>รวม</td>
                  <td>รวม</td>
                  <td>รวม</td>
                </tr>
              }
            />
          </div>
        </>
      }
    />
  );
}
