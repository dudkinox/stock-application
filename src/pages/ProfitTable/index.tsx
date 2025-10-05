import { useEffect } from "react";
import HeaderPageCommon from "../../common/HeaderPageCommon";
import TableCommon from "../../common/Table";
import initTable, { destroyTable } from "../../common/DataTable";

export default function ProfitTable() {
  const columns = ["สาขา", "ทุน", "ยอดผ่อน", "ราคาขาย", "กำไร"];
  const row = [
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
                  row={row.map((item) => {
                    return (
                      <tr key={item.ID} className="text-center">
                        <td>{item.MAJOR}</td>
                        <td>{Number(item.COST).toLocaleString()}</td>
                        <td>
                          {Number(item.TOTAL_INSTALLMENT).toLocaleString()}
                        </td>
                        <td>{Number(item.SELLING_PRICE).toLocaleString()}</td>
                        <td>{Number(item.PROFIT).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
