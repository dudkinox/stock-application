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

const GetFindByIdStockService = (id: string, stockType: string) => {
  return Https.get<any>(`/apis/stocks/find/?id=${id}&stock_type=${stockType}`);
};

const UpdateStockService = (id: string, stockType: string, payload: any) => {
  return Https.post<any>(
    `/apis/stocks/update/?id=${id}&stock_type=${stockType}`,
    payload
  );
};

const DeleteStockByIdService = (idCard: string) => {
  return Https.get<StatusStockResponse>(
    `/apis/stocks/delete/?id_card=${idCard}`
  );
};

const StockService = {
  InsertStock: InsertStockService,
  GetStock: GetStockService,
  GetFindStockById: GetFindByIdStockService,
  UpdateStock: UpdateStockService,
  DeleteStockById: DeleteStockByIdService,
  GetDetailStockService: GetDetailStockService,
};

export default StockService;
