import { useContext, useEffect, useState } from "react";
import HeaderPageCommon from "../../common/HeaderPageCommon";
import TableCommon from "../../common/Table";
import initTable, { destroyTable } from "../../common/DataTable";
import blogSelectCal from "../../common/SelectRow";
import StockService from "../../services/StockServices";
import { GetProfitTableResponse } from "../../Models/Response/GetProfitTableResponse";
import { AppContext } from "../../contexts";

export default function ProfitTable() {
  const [totalFund, setTotalFund] = useState(0);
  const [totalInstallment, setTotalInstallment] = useState(0);
  const [totalKay, setTotalKay] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalStarMoney, setTotalStarMoney] = useState(0);
  const [profitTableList, setProfitTableList] = useState<
    GetProfitTableResponse[]
  >([]);
  const { setIsLoading } = useContext(AppContext);

  const calBySelected = () => {
    const checkBoxes = document.getElementsByClassName(
      "row-check"
    ) as HTMLCollectionOf<HTMLInputElement>;
    let total = 0;
    let totalStarMoney = 0;
    let totalFund = 0;
    let totalInstallment = 0;
    let totalKay = 0;

    for (const element of checkBoxes) {
      if (element.checked) {
        const id = element.id.replace("row-", "");
        const item = profitTableList.find((s) => s.MAJOR === id);
        total += item ? Number(item.TOTAL_PROFIT) : 0;
        totalStarMoney += item ? Number(item.TOTAL_STAR_MONEY) : 0;
        totalFund += item ? Number(item.TOTAL_FOUND) : 0;
        totalInstallment += item ? Number(item.TOTAL_INSTALLMENT) : 0;
        totalKay += item ? Number(item.TOTAL_PRICE) : 0;
      }
    }

    return {
      profit: total,
      starMoney: totalStarMoney,
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
    setTotalStarMoney(calculateAll.starMoney);
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
    "เงินดาว",
    "ทุน",
    "ยอดผ่อน",
    <>
      ราคาขาย
      <br />
      (เงินดาว + ผ่อน)
    </>,
    "กำไร",
  ];

  useEffect(() => {
    setIsLoading(true);
    StockService.GetProfitTable()
      .then((res) => {
        setProfitTableList(res.data);
        destroyTable("#profit-table");
        setTimeout(
          () => initTable(res.data.length.toString() ?? "0", "#profit-table"),
          100
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                  row={profitTableList.map((item) => {
                    return (
                      <tr key={item.MAJOR} className="text-center">
                        <td>{item.MAJOR}</td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const checkBox = document.getElementById(
                              `row-${item.MAJOR}`
                            ) as HTMLInputElement;

                            checkBox.checked = !checkBox.checked;
                            updateTotalFromSelection();
                          }}
                        >
                          <input
                            type="checkbox"
                            className="row-check"
                            id={`row-${item.MAJOR}`}
                            onClick={(e) => e.stopPropagation()}
                            onChange={updateTotalFromSelection}
                          />
                        </td>
                        <td>
                          {Number(item.TOTAL_STAR_MONEY).toLocaleString()} บาท
                        </td>
                        <td>{Number(item.TOTAL_FOUND).toLocaleString()} บาท</td>
                        <td>
                          {Number(item.TOTAL_INSTALLMENT).toLocaleString()} บาท
                        </td>
                        <td>{Number(item.TOTAL_PRICE).toLocaleString()} บาท</td>
                        <td>
                          {Number(item.TOTAL_PROFIT).toLocaleString()} บาท
                        </td>
                      </tr>
                    );
                  })}
                  foot={
                    <tr className="text-center">
                      <th colSpan={2}>รวม</th>
                      <th>{totalStarMoney.toLocaleString()} บาท</th>
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
