import InsertModal from "./InsertModal";
import DetailModal from "./DetailModal";
import { useContext } from "react";
import { StockContext } from "../../contexts/StockContext";

export default function StockLayout() {
  const { stock } = useContext(StockContext);
  return (
    <>
      <div className="card-body">
        <table
          id="stockTable"
          className="table table-bordered table-hover dtr-inline collapsed w-100"
        >
          <thead>
            <tr className="text-center">
              <th>รหัสเอกสาร</th>
              <th>
                <InsertModal />
              </th>
              <th>เลขบัตรประชาชน</th>
              <th>ประวัติลูกค้า</th>
              <th>ประเภท</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {stock.length > 0 ? (
              stock.map((item, i) => {
                return (
                  <tr key={i} className="text-center">
                    <td>{item.ID}</td>
                    <td>
                      <div className="row justify-content-center">
                        <button className="btn btn-warning mx-2">
                          <i className="nav-icon fas fa-pen" />
                        </button>
                        <button className="btn btn-danger">
                          <i className="nav-icon fas fa-trash" />
                        </button>
                      </div>
                    </td>
                    <td>{item.ID_CARD}</td>
                    <td>{item.CUSTOMER_STATUS}</td>
                    <td>{item.STOCK_TYPE}</td>
                    <td>
                      <DetailModal />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="text-center">
                <td colSpan={6}>
                  <h2 className="mt-2">ยังไม่มีข้อมูล</h2>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
