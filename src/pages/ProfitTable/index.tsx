import { useEffect, useState } from "react";
import HeaderPageCommon from "../../common/HeaderPageCommon";
import TableCommon from "../../common/Table";
import initTable, { destroyTable } from "../../common/DataTable";
import blogSelectCal from "../../common/SelectRow";

export default function ProfitTable() {
  const [totalFund, setTotalFund] = useState(0);
  const [totalInstallment, setTotalInstallment] = useState(0);
  const [totalKay, setTotalKay] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  const calBySelected = () => {
    const checkBoxes = document.getElementsByClassName(
      "row-check"
    ) as HTMLCollectionOf<HTMLInputElement>;
    let total = 0;
    let totalFund = 0;
    let totalInstallment = 0;
    let totalKay = 0;

    for (const element of checkBoxes) {
      if (element.checked) {
        const id = element.id.replace("row-", "");
        const item = mockData.find((s) => s.ID === id);
        total += item ? Number(item.PROFIT) : 0;
        totalFund += item ? Number(item.COST) : 0;
        totalInstallment += item ? Number(item.TOTAL_INSTALLMENT) : 0;
        totalKay += item ? Number(item.SELLING_PRICE) : 0;
      }
    }

    return {
      profit: total,
      fund: totalFund,
      installment: totalInstallment,
      kay: totalKay,
    };
  };

  const updateTotalFromSelection = () => {
    const calculateAll = calBySelected();
    setTotalProfit(calculateAll.profit);
    setTotalFund(calculateAll.fund);
    setTotalInstallment(calculateAll.installment);
    setTotalKay(calculateAll.kay);
  };

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

    updateTotalFromSelection();
  };
  const columns = [
    "สาขา",
    blogSelectCal(selectAll),
    "ทุน",
    "ยอดผ่อน",
    "ราคาขาย",
    "กำไร",
  ];
  const mockData = [
    {
      ID: "1",
      MAJOR: "สาขา A",
      COST: "10000",
      TOTAL_INSTALLMENT: "15000",
      SELLING_PRICE: "16000",
      PROFIT: "6000",
    },
  ];

  useEffect(() => {
    destroyTable("#profit-table");
    setTimeout(() => initTable("0", "#profit-table"), 100);
  }, []);

  return (
    <div className="content-wrapper">
      <HeaderPageCommon title={"สรุป"} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-12">
              <div className="card-header">
                <h2 className="card-title">ตารางคำนวณรวม</h2>
              </div>
              <div className="card-body">
                <TableCommon
                  id="profit-table"
                  columns={columns}
                  row={mockData.map((item) => {
                    return (
                      <tr key={item.ID} className="text-center">
                        <td>{item.MAJOR}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const checkBox = document.getElementById(
                              `row-${item.ID}`
                            ) as HTMLInputElement;

                            checkBox.checked = !checkBox.checked;
                            updateTotalFromSelection();
                          }}
                        >
                          <input
                            type="checkbox"
                            className="row-check"
                            id={`row-${item.ID}`}
                            onClick={(e) => e.stopPropagation()}
                            onChange={updateTotalFromSelection}
                          />
                        </td>
                        <td>{Number(item.COST).toLocaleString()} บาท</td>
                        <td>
                          {Number(item.TOTAL_INSTALLMENT).toLocaleString()} บาท
                        </td>
                        <td>
                          {Number(item.SELLING_PRICE).toLocaleString()} บาท
                        </td>
                        <td>{Number(item.PROFIT).toLocaleString()} บาท</td>
                      </tr>
                    );
                  })}
                  foot={
                    <tr className="text-center">
                      <th colSpan={2}>รวม</th>
                      <th>{totalFund.toLocaleString()} บาท</th>
                      <th>{totalInstallment.toLocaleString()} บาท</th>
                      <th>{totalKay.toLocaleString()} บาท</th>
                      <th>{totalProfit.toLocaleString()} บาท</th>
                    </tr>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
