import { useState, useEffect } from "react";
import StockRequest from "../../Models/Request/StockRequest";
import Https from "../../Https/Index";
import InsertModal from "./InsertModal";
import DetailModal from "./DetailModal";

export default function StockLayout() {
  const [stock, setStock] = useState<StockRequest[]>([]);

  useEffect(() => {
    Https.get("/apis/stocks/get")
      .then((res: any) => {
        setStock(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (stock.length >= 1) {
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
              {stock.map((item, i) => {
                return (
                  <tr key={i} className="text-center">
                    <td>รหัสเอกสาร</td>
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
                    <td>{item.idCard}</td>
                    <td>{item.customerStatus}</td>
                    <td>{item.stockType}</td>
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
  } else {
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
              <tr className="text-center">
                <td colSpan={6}>
                  <h2 className="mt-2">ยังไม่มีข้อมูล</h2>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
