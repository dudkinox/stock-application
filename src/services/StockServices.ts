import Https from "../Https/Index";
import { GetStockResponse } from "../Models/Response/GetStockResponse";
import { InsertStockResponse as StatusStockResponse } from "../Models/Response/InsertStockResponse";

const InsertStockService = (payload: string) => {
  return Https.get<StatusStockResponse>(`/apis/stocks/insert/${payload}`);
};

const GetStockService = (major: string) => {
  return Https.get<GetStockResponse[]>(`/apis/stocks/get/?major=${major}`);
};

const GetDetailStockService = (idCard: string, major: string) => {
  return Https.get<any>(
    `/apis/stocks/detail/?id_card=${idCard}&major=${major}`
  );
};

const GetFindByIdStockService = (
  id: string,
  major: string,
  stockType: string
) => {
  return Https.get<any>(
    `/apis/stocks/find/?id=${id}&major=${major}&stock_type=${stockType}`
  );
};

const UpdateStockService = (id: string, stockType: string, payload: any) => {
  return Https.post<any>(
    `/apis/stocks/update/?id=${id}&stock_type=${stockType}`,
    payload
  );
};

const DeleteStockByIdService = (idCard: string, major: string) => {
  return Https.get<StatusStockResponse>(
    `/apis/stocks/delete/?id_card=${idCard}&major=${major}`
  );
};

const StockService = {
  InsertStock: InsertStockService,
  GetStock: GetStockService,
  GetDetailStockService: GetDetailStockService,
  GetFindStockById: GetFindByIdStockService,
  UpdateStock: UpdateStockService,
  DeleteStockById: DeleteStockByIdService,
};

export default StockService;
