import { useContext, useEffect, useState } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import TableIncome from "../../common/Table";
import ModalCommon from "../../common/Modal";
import TextInput from "../../common/TextInput";
import { IncomeContext } from "../../contexts/IncomeContext";
import IncomeServices from "../../services/IncomeServices";
import GetIncomeResponse from "../../Models/Response/GetIncomeResponse";

export default function IncomePage() {
  const [incomeList, setIncomeList] = useState<GetIncomeResponse[]>([]);
  const {
    date,
    setDate,
    listName,
    setListName,
    revenue,
    setRevenue,
    expense,
    setExpense,
    note,
    setNote,
    insertHandler,
  } = useContext(IncomeContext);

  const incomeTableHeaders = [
    "วันที่",
    "รายการ",
    "รายจ่าย(บาท)",
    "รายรับ(บาท)",
    "หมายเหตุ",
    "แก้ไข/ลบ",
  ];

  const openModalIncomeInsert = () => {
    ($("#insert-modal") as any).modal("show");
  };

  useEffect(() => {
    IncomeServices.getAll().then((res) => {
      setIncomeList(res.data);
    });
  }, [setIncomeList]);

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
                    onClick={insertHandler}
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
            <table
              id={"income-table" ?? "stock-table"}
              className="table table-bordered table-hover dtr-inline collapsed w-100"
            >
              <thead>
                <tr className="text-center">
                  {incomeTableHeaders.map((item, i) => (
                    <th key={i}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {incomeList.map((item, i) => (
                  <tr key={i} className="text-center">
                    <td>{item.DATE}</td>
                    <td>{item.LIST_NAME}</td>
                    <td>{item.REVENUE}</td>
                    <td>{item.EXPENSE}</td>
                    <td>{item.NOTE}</td>
                    <td></td>
                  </tr>
                ))}
                {
                  <tr className="text-center">
                    <td colSpan={2}>รวม</td>
                    <td>1,000 บาท</td>
                    <td>2,000 บาท</td>
                    <td colSpan={2}></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
}
