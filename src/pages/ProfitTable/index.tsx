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
  const [totalStarMoney, setTotalStarMoney] = useState(0);
  const [totalInstallment, setTotalInstallment] = useState(0);
  const [totalEquipment, setTotalEquipment] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [tun, setTun] = useState(0);
  const [totalNet, setTotalNet] = useState(0);

  const [profitTableList, setProfitTableList] = useState<
    GetProfitTableResponse[]
  >([]);
  const { setIsLoading } = useContext(AppContext);

  const calBySelected = () => {
    const checkBoxes = document.getElementsByClassName(
      "row-check"
    ) as HTMLCollectionOf<HTMLInputElement>;
    let totalBuy = 0;
    let totalStarMoney = 0;
    let totalInstallment = 0;
    let totalEquipment = 0;
    let totalExpense = 0;
    let tun = 0;
    let totalNet = 0;

    for (const element of checkBoxes) {
      if (element.checked) {
        const id = element.id.replace("row-", "");
        const item = profitTableList.find((s) => s.MAJOR === id);
        totalBuy += item ? Number(item.TOTAL_BUY) : 0;
        totalStarMoney += item ? Number(item.TOTAL_STAR_MONEY) : 0;
        totalInstallment += item ? Number(item.TOTAL_INSTALLMENT) : 0;
        totalEquipment += item ? Number(item.TOTAL_EQUIPMENT) : 0;
        totalExpense += item ? Number(item.TOTAL_EXPENSE) : 0;
        tun += item ? Number(item.TUN) : 0;
        totalNet += item ? Number(item.TOTAL_NET) : 0;
      }
    }

    return {
      fund: totalBuy,
      starMoney: totalStarMoney,
      installment: totalInstallment,
      equipment: totalEquipment,
      expense: totalExpense,
      tun: tun,
      net: totalNet,
    };
  };

  const updateTotalFromSelection = () => {
    const calculateAll = calBySelected();
    setTotalFund(calculateAll.fund);
    setTotalStarMoney(calculateAll.starMoney);
    setTotalInstallment(calculateAll.installment);
    setTotalEquipment(calculateAll.equipment);
    setTotalExpense(calculateAll.expense);
    setTun(calculateAll.tun);
    setTotalNet(calculateAll.net);
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
    "ค่าซื้อเครื่องเข้า",
    "เงินดาวน์",
    "รายการผ่อน",
    "อุปกรณ์",
    "รายจ่าย",
    "ทุน",
    "สุทธิ",
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
                        <td>{Number(item.TOTAL_BUY).toLocaleString()} บาท</td>
                        <td>
                          {Number(item.TOTAL_STAR_MONEY).toLocaleString()} บาท
                        </td>
                        <td>
                          {Number(item.TOTAL_INSTALLMENT).toLocaleString()} บาท
                        </td>
                        <td>
                          {Number(item.TOTAL_EQUIPMENT).toLocaleString()} บาท
                        </td>
                        <td>
                          {Number(item.TOTAL_EXPENSE).toLocaleString()} บาท
                        </td>
                        <td>{Number(item.TUN).toLocaleString()} บาท</td>
                        <td>{Number(item.TOTAL_NET).toLocaleString()} บาท</td>
                      </tr>
                    );
                  })}
                  foot={
                    <tr className="text-center">
                      <th colSpan={2}>รวม</th>
                      <th>{totalStarMoney.toLocaleString()} บาท</th>
                      <th>{totalFund.toLocaleString()} บาท</th>
                      <th>{totalInstallment.toLocaleString()} บาท</th>
                      <th>{totalEquipment.toLocaleString()} บาท</th>
                      <th>{totalExpense.toLocaleString()} บาท</th>
                      <th>{tun.toLocaleString()} บาท</th>
                      <th>{totalNet.toLocaleString()} บาท</th>
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
