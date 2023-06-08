import { useEffect } from "react";
import ModalCommon from "../../common/Modal";
import TableCommon from "../../common/Table";
import initTable, { destroyTable } from "../../common/DataTable";

export default function BalanceDetail() {
  const columns = ["เครื่อง", "ราคา"];
  useEffect(() => {
    // setIsLoading(true);
    setTimeout(() => destroyTable());
    setTimeout(() => initTable("0"), 100);
    // setIsLoading(false);
  }, []);
  return (
    <>
      <ModalCommon
        title={"เครื่องที่เหลือ"}
        content={
          <>
            <div className="container my-3 text-center">
              <TableCommon
                columns={columns}
                row={
                  <>
                    <tr>
                      <td>test</td>
                      <td>test</td>
                    </tr>
                  </>
                }
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
