import { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";

export function StockInstallmentPaymentPage() {
  const { majorUser } = useContext(AppContext);
  const [stock, setStock] = useState<any[]>([]);
  const stockTableHeaders = [
    "เลขบัตรประชาชน / ชื่อลูกค้า",
    "สาขา",
    "งวดที่",
    "จำนวนเงิน",
  ];

  useEffect(() => {
    StockService.GetStockInstallmentPayment(majorUser).then((res) => {
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
                    <td>{item.INSTALLMENT_NO}</td>
                    <td>{item.PRICE_TOTAL}</td>
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
