import Https from "../Https/Index";
import { InsertStockResponse } from "../Models/Response/InsertStockResponse";

const InsertStock = (payload: any) => {
  return Https.post<InsertStockResponse>("/apis/stocks/insert", payload)
    .then((res) => {
      alert(res.data.message);
    })
    .catch((err) => {
      alert("บันทึกข้อมูลไม่สำเร็จ");
      alert(err);
    });
};

const StockApi = { InsertStock };

export default StockApi;
