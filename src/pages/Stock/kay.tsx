import { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";

export function StockKayPage() {
  const { majorUser } = useContext(AppContext);
  const [stock, setStock] = useState<any[]>([]);
  const stockTableHeaders = [
    "เลขบัตรประชาชน / ชื่อลูกค้า",
    "สาขา",
    "ชื่อลูกค้า",
    "เบอร์โทร",
    "รุ่น",
    "imei",
    "เงินดาว",
    "ผ่อนกี่เดือน",
    "ผ่อนเดือนละ",
    "จ่ายทุกวันที่",
  ];

  useEffect(() => {
    StockService.GetStockKay(majorUser).then((res) => {
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
                    <td>{item.ID_CARD}</td>
                    <td>{item.MAJOR}</td>
                    <td>{item.CUSTOMER}</td>
                    <td>{item.TEL}</td>
                    <td>{item.VERSION}</td>
                    <td>{item.IMEI}</td>
                    <td>{item.STAR_MONEY}</td>
                    <td>{item.MONTH}</td>
                    <td>{item.INSTALLMENT}</td>
                    <td>{item.DATE_PAYMENT}</td>
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
