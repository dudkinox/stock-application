import { useState } from "react";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";

export function StockKayPage() {
  const [stock, setStock] = useState<any[]>([]);
  const stockTableHeaders = [
    "วันที่",
    "เลขบัตรประชาชน",
    "ประวัติลูกค้า",
    "ประเภท",
    "รายละเอียด",
  ];

  useEffects(() => {}, []);

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
                    <td>{convertDateToThai(new Date(item.DATE))}</td>
                    <td>{item.ID_CARD}</td>
                    <td>{item.CUSTOMER_STATUS}</td>
                    <td>{item.STOCK_TYPE}</td>
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
function useEffects(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
