import React, { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import initTable, { destroyTable } from "../../common/DataTable";
import blogSelectCal from "../../common/SelectRow";
import { convertDateToThaiV2 } from "../../common/DateFormat";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";
import { GetSummarizeResponse } from "../../Models/Response/GetSummarizeResponse";

export default function Summarize() {
  const [totalInstallment, setTotalInstallment] = useState(0);
  const [sumList, setSumList] = useState<GetSummarizeResponse[]>([]);
  const { setIsLoading, majorUser } = useContext(AppContext);

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
        const item = sumList.find((s) => String(s.ID) === id);
        total += item ? Number(item.PRICE_TOTAL) : 0;
      }
    }

    return total;
  };

  const updateTotalInstallmentFromSelection = () => {
    setTotalInstallment(calInstallmentBySelected());
  };

  useEffect(() => {
    setIsLoading(true);
    StockService.GetInstallmentSummarize(majorUser).then((res) => {
      destroyTable("#table-summarize");
      setSumList(res.data);
      setTimeout(
        () => initTable(sumList.length.toString() ?? "0", "#table-summarize"),
        100
      );
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    StockService.GetInstallmentSummarize(majorUser).then((response) => {
      setSumList(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="card-body">
      <TableCommon
        id="table-summarize"
        columns={summarizeHeader}
        row={sumList.map((item) => {
          return (
            <tr key={item.ID} className="text-center">
              <td>{convertDateToThaiV2(new Date(item.DATE))}</td>
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
              <td>{`${item.CUSTOMER}`}</td>
              <td>{item.INSTALLMENT_NO}</td>
              <td>{Number(item.PRICE_TOTAL).toLocaleString()} บาท</td>
              <td>{item.MAJOR}</td>
              <td>{item.MAJOR}</td>
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
