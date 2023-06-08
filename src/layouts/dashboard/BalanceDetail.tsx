import GetBalanceDetailResponse from "../../Models/Response/GetBalanceDetailResponse";
import ModalCommon from "../../common/Modal";
import TableCommon from "../../common/Table";

interface BalanceDetailProps {
  balanceDetail: GetBalanceDetailResponse[];
}

export default function BalanceDetail({ balanceDetail }: BalanceDetailProps) {
  const columns = ["เครื่อง", "ราคา"];

  return (
    <>
      <ModalCommon
        title={"เครื่องที่เหลือ"}
        content={
          <>
            <div className="container my-3 text-center">
              <TableCommon
                columns={columns}
                row={balanceDetail.map((item) => (
                  <tr>
                    <td>{item.VERSION}</td>
                    <td>{Number(item.PRICE).toLocaleString()}</td>
                  </tr>
                ))}
                id="stock-table"
              />
            </div>
          </>
        }
        id={"balance-modal"}
      />
    </>
  );
}
