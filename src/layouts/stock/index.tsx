import InsertModal from "./InsertModal";
import DetailModal from "./DetailModal";
import { useContext, useEffect } from "react";
import { StockContext } from "../../contexts/StockContext";
import StockService from "../../services/StockServices";
import initTable from "../../common/DataTable";

export default function StockLayout() {
  const { stock, setStock } = useContext(StockContext);

  useEffect(() => {
    StockService.GetStock()
      .then((res) => {
        setStock([]);
        setStock(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, [setStock]);

  const deleteStock = (id: string) => () => {
    StockService.DeleteStockById(id)
      .then((res) => {
        alert(res.data.message);
        StockService.GetStock()
          .then((res) => {
            setStock([]);
            setStock(res.data);
            setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <div className="card-body">
        <table
          id={"stock-table"}
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
            {stock.map((item, i) => {
              return (
                <tr key={i} className="text-center">
                  <td>{item.ID}</td>
                  <td>
                    <div className="row justify-content-center">
                      <button className="btn btn-warning mx-2">
                        <i className="nav-icon fas fa-pen" />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={deleteStock(item.ID)}
                      >
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
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
