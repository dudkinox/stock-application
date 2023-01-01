import Https from "../Https/Index";
import { GetStockResponse } from "../Models/Response/GetStockResponse";
import { InsertStockResponse } from "../Models/Response/InsertStockResponse";

const InsertStockService = (payload: string) => {
  return Https.get<InsertStockResponse>(`/apis/stocks/insert/${payload}`);
};

const GetStockService = () => {
  return Https.get<GetStockResponse[]>(`/apis/stocks/get/`);
};

const StockService = {
  InsertStock: InsertStockService,
  GetStock: GetStockService,
};

export default StockService;
