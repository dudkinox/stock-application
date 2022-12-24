import React, { useState, useEffect } from "react";
import Https from "../../Https/Index";
import StockInterface from "../../Interfaces/StockInterface";
import InsertModal from "./InsertModal";
import DetailModal from "./DetailModal";

export default function StockLayout() {
  const [stock, setStock] = useState<StockInterface[]>([]);

  useEffect(() => {
    Https.get("/apis/stocks/get")
      .then((res: any) => {
        setStock(res.data);
        console.log(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="card-body">
        <table
          id="stockTable"
          className="table table-bordered table-hover dtr-inline collapsed"
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
              <td>1</td>
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
              <td>Internet Explorer 4.0</td>
              <td>Win 95+</td>
              <td> 4</td>
              <td>
                <DetailModal />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
