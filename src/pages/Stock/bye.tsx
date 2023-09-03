import { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";
import initTable, { destroyTable } from "../../common/DataTable";
export function StockByePage() {
  const { majorUser, setIsLoading } = useContext(AppContext);
  const [buyList, setBuyList] = useState<any[]>([]);
  const stockBuyListTableHeaders = [
    "รหัสเอกสาร",
    "สาขา",
    "Serial Number",
    "รุ่น",
    "imei",
    "แหล่งที่มา",
    "Battery",
    "ขาย",
  ];

  useEffect(() => {
    setIsLoading(true);
    StockService.GetStockBye(majorUser).then((res) => {
      destroyTable();
      setBuyList(res.data);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#kay-table"),
        100
      );
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <ContentLayOut
        title={"stock"}
        topic={"สต๊อกสินค้า ที่ซื้อ"}
        page={
          <>
            <div className="card-body">
              <TableCommon
                columns={stockBuyListTableHeaders}
                row={buyList.map((item, i) => (
                  <tr key={i} className="text-center">
                    <td>{item.ID}</td>
                    <td>{item.MAJOR}</td>
                    <td>{item.SERIAL_NUMBER}</td>
                    <td>{item.VERSION}</td>
                    <td>{item.IMEI}</td>
                    <td>{item.SOURCE}</td>
                    <td>{item.BATTERY}</td>
                    <td>{item.STATUS === "0" ? "ยังไม่ขาย" : "ขายไปแล้ว"}</td>
                  </tr>
                ))}
              />
            </div>
          </>
        }
      />
    </>
  );
}
