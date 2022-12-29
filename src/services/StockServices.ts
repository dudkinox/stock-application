import Https from "../Https/Index";
import { InsertStockResponse } from "../Models/Response/InsertStockResponse";

const InsertStock = (payload: any) => {
  return Https.post<InsertStockResponse>("/apis/stocks/insert", payload);
};

const StockApi = { InsertStock };

export default StockApi;
