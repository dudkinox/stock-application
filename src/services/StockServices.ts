import Https from "../Https/Index";
import { InsertStockResponse } from "../Models/Response/InsertStockResponse";

const InsertStock = (payload: string) => {
  return Https.get<InsertStockResponse>(`/apis/stocks/insert${payload}`);
};

const StockApi = { InsertStock };

export default StockApi;
