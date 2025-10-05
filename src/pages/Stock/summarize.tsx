import React, { useEffect } from "react";
import TableCommon from "../../common/Table";
import initTable, { destroyTable } from "../../common/DataTable";
import blogSelectCal from "../../common/SelectRow";
import { convertDateToThaiV2 } from "../../common/DateFormat";

export default function Summarize() {
  const [totalInstallment, setTotalInstallment] = React.useState(0);

  const mockData = [
    {
      ID: 1,
      BRANCH: "สาขา 1",
      CUSTOMER_NAME: "สมชาย ใจดี",
      INSTALLMENT_NO: 1,
      INSTALLMENT: 5000,
      DATE_PAYMENT: "2024-06-01",
      STATUS: "ยังไม่ครบ",
    },
    {
      ID: 2,
      BRANCH: "สาขา 2",
      CUSTOMER_NAME: "สมหญิง สวยงาม",
      INSTALLMENT_NO: 2,
      INSTALLMENT: 7000,
      DATE_PAYMENT: "2024-06-05",
      STATUS: "ครบกำหนด",
    },
    {
      ID: 3,
      BRANCH: "สาขา 2",
      CUSTOMER_NAME: "สมหญิง สวยงาม",
      INSTALLMENT_NO: 1,
      INSTALLMENT: 7000,
      DATE_PAYMENT: "2024-06-05",
      STATUS: "ครบกำหนด",
    },
  ];

  const selectAll = () => {
    const checkBoxes = document.getElementsByClassName(
      "row-check"
    ) as HTMLCollectionOf<HTMLInputElement>;
    const mainCheckBox = document.getElementById(
      "flexCheckDefault"
    ) as HTMLInputElement;

    for (const element of checkBoxes) {
      element.checked = mainCheckBox.checked;
    }

    updateTotalInstallmentFromSelection();
  };

  const summarizeHeader = [
    "วันที่ผ่อน",
    blogSelectCal(selectAll),
    "ชื่อลูกค้า",
    "ผ่อนครั้งที่",
    "ราคาผ่อน",
    "สาขา",
    "สถานะ",
  ];

  const calInstallmentBySelected = () => {
    const checkBoxes = document.getElementsByClassName(
      "row-check"
    ) as HTMLCollectionOf<HTMLInputElement>;
    let total = 0;

    for (const element of checkBoxes) {
      if (element.checked) {
        const id = element.id.replace("row-", "");
        const item = mockData.find((s) => String(s.ID) === id);
        total += item ? item.INSTALLMENT : 0;
      }
    }

    return total;
  };

  const updateTotalInstallmentFromSelection = () => {
    setTotalInstallment(calInstallmentBySelected());
  };

  useEffect(() => {
    destroyTable("#table-summarize");
    setTimeout(
      () => initTable(mockData.length.toString() ?? "0", "#table-summarize"),
      100
    );
  }, []);

  return (
    <div className="card-body">
      <TableCommon
        id="table-summarize"
        columns={summarizeHeader}
        row={mockData.map((item) => {
          return (
            <tr key={item.CUSTOMER_NAME} className="text-center">
              <td>{convertDateToThaiV2(new Date(item.DATE_PAYMENT))}</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const checkBox = document.getElementById(
                    `row-${item.ID}`
                  ) as HTMLInputElement;

                  checkBox.checked = !checkBox.checked;
                  updateTotalInstallmentFromSelection();
                }}
              >
                <input
                  type="checkbox"
                  className="row-check"
                  id={`row-${item.ID}`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={updateTotalInstallmentFromSelection}
                />
              </td>
              <td>{item.CUSTOMER_NAME}</td>
              <td>{item.INSTALLMENT_NO}</td>
              <td>{item.INSTALLMENT.toLocaleString()} บาท</td>
              <td>{item.BRANCH}</td>
              <td>{item.STATUS}</td>
            </tr>
          );
        })}
        foot={
          <tr>
            <td colSpan={4} className="text-center">
              จำนวนการผ่อนสะสม
            </td>
            <td className="text-center">
              {totalInstallment.toLocaleString()} บาท
            </td>
            <td colSpan={2}></td>
          </tr>
        }
      />
    </div>
  );
}
