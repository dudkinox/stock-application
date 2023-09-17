import { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";

export function StockEquipmentPage() {
  const { majorUser } = useContext(AppContext);
  const [stock, setStock] = useState<any[]>([]);
  const stockTableHeaders = [
    "รหัสเอกสาร",
    "สาขา",
    "เคส",
    "ฟิล์ม",
    "เลน",
    "หัวชาร์จใหญ่",
    "สายชาร์จ",
    "ซ่อม",
    "ราคารวม",
  ];

  useEffect(() => {
    StockService.GetStockEquipment(majorUser).then((res) => {
      setStock(res.data);
    });
  }, []);

  return (
    <>
      <ContentLayOut
        title={"stock"}
        topic={"สต๊อกสินค้า"}
        page={
          <>
            <div className="card-body">
              <TableCommon
                columns={stockTableHeaders}
                row={stock.map((item, i) => (
                  <tr key={i} className="text-center">
                    <td>{item.ID}</td>
                    <td>{item.MAJOR}</td>
                    <td>{item.CASES}</td>
                    <td>{item.FIRM}</td>
                    <td>{item.LEN}</td>
                    <td>{item.BIG_CHARGE}</td>
                    <td>{item.CHARGE}</td>
                    <td>{item.REPAIR}</td>
                    <td>{item.SUM}</td>
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
