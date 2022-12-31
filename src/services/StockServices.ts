import Https from "../Https/Index";
import { GetStockResponse } from "../Models/Response/GetStockResponse";
import { InsertStockResponse } from "../Models/Response/InsertStockResponse";

const InsertStock = (payload: string) => {
  return Https.get<InsertStockResponse>(`/apis/stocks/insert${payload}`);
};

const GetStock = () => {
  return Https.get<GetStockResponse[]>(`/apis/stocks/get/`);
};

const StockApi = { InsertStock, GetStock };

export default StockApi;
