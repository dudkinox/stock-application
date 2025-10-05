import { useEffect, useState } from "react";
import HeaderPageCommon from "../../common/HeaderPageCommon";
import TableCommon from "../../common/Table";
import initTable, { destroyTable } from "../../common/DataTable";
import blogSelectCal from "../../common/SelectRow";
import { convertDateToThaiV2 } from "../../common/DateFormat";
import TextInput from "../../common/TextInput";

export default function ProfitTable() {
  const [totalFund, setTotalFund] = useState(0);
  const [totalInstallment, setTotalInstallment] = useState(0);
  const [totalKay, setTotalKay] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalStarMoney, setTotalStarMoney] = useState(0);
  const [createAtStart, setCreateAtStart] = useState("");
  const [createAtEnd, setCreateAtEnd] = useState("");

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
        const item = mockData.find((s) => s.ID === id);
        total += item ? Number(item.PROFIT) : 0;
        totalStarMoney += item ? Number(item.TOTAL_STAR_MONEY) : 0;
        totalFund += item ? Number(item.COST) : 0;
        totalInstallment += item ? Number(item.TOTAL_INSTALLMENT) : 0;
        totalKay += item ? Number(item.SELLING_PRICE) : 0;
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
    "วันที่ขาย",
    blogSelectCal(selectAll),
    "สาขา",
    "รหัสเอกสาร",
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
  const mockData = [
    {
      ID: "1",
      DATE_KAY: "2024-06-01",
      MAJOR: "สาขา A",
      CODE: "DOC-001",
      TOTAL_STAR_MONEY: "5000",
      COST: "10000",
      TOTAL_INSTALLMENT: "15000",
      SELLING_PRICE: "16000",
      PROFIT: "6000",
    },
  ];

  const handleFilter = () => {
    // setIsLoading(true);
    // incomeServices.getAll().then((res) => {
    destroyTable("#profit-table");
    //   setIncomeList(res.data);
    setTimeout(() => initTable("0", "#profit-table"), 100);
    // setIsLoading(false);
  };

  const handleResetFilter = () => {
    setCreateAtStart("");
    setCreateAtEnd("");
    // incomeServices.getAll().then((res) => {
    destroyTable("#profit-table");
    //   setIncomeList(res.data);
    setTimeout(() => initTable("0", "#profit-table"), 100);
    // });
  };

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
                <div className="container-fluid my-3">
                  <div className="row text-center">
                    <div className="col-sm-6">
                      <TextInput
                        label={"Filter วันที่ขายเริ่ม"}
                        setValue={setCreateAtStart}
                        type={"date"}
                        icon={"far fa-calendar-alt"}
                        value={createAtStart}
                      />
                    </div>
                    <div className="col-sm-6">
                      <TextInput
                        label={"Filter วันที่ขายสิ้นสุด"}
                        setValue={setCreateAtEnd}
                        type={"date"}
                        icon={"far fa-calendar-alt"}
                        value={createAtEnd}
                      />
                    </div>
                    <div className="col-sm-6">
                      <br />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={handleFilter}
                      >
                        ค้นหา
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <br />
                      <button
                        className="btn btn-warning mt-2"
                        onClick={handleResetFilter}
                      >
                        ล้างค่า
                      </button>
                    </div>
                  </div>
                </div>
                <TableCommon
                  id="profit-table"
                  columns={columns}
                  row={mockData.map((item) => {
                    return (
                      <tr key={item.ID} className="text-center">
                        <td>{convertDateToThaiV2(new Date(item.DATE_KAY))}</td>
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
                        <td>{item.MAJOR}</td>
                        <td>{item.CODE}</td>
                        <td>
                          {Number(item.TOTAL_STAR_MONEY).toLocaleString()} บาท
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
                      <th colSpan={4}>รวม</th>
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
