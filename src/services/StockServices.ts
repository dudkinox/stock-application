import Https from "../Https/Index";
import { GetStockResponse } from "../Models/Response/GetStockResponse";
import { InsertStockResponse as StatusStockResponse } from "../Models/Response/InsertStockResponse";

const InsertStockService = (payload: string) => {
  return Https.get<StatusStockResponse>(`/apis/stocks/insert/${payload}`);
};

const GetStockService = () => {
  return Https.get<GetStockResponse[]>(`/apis/stocks/get/`);
};

const GetDetailStockService = (idCard: string) => {
  return Https.get<any>(`/apis/stocks/detail/?id_card=${idCard}`);
};

const DeleteStockByIdService = (id: string) => {
  return Https.get<StatusStockResponse>(`/apis/stocks/delete/?id=${id}`);
};

const StockService = {
  InsertStock: InsertStockService,
  GetStock: GetStockService,
  DeleteStockById: DeleteStockByIdService,
  GetDetailStockService: GetDetailStockService,
};

export default StockService;
