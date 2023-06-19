import Https from "../Https/Index";
import { GetStockResponse } from "../Models/Response/GetStockResponse";
import { InsertStockResponse as StatusStockResponse } from "../Models/Response/InsertStockResponse";

const InsertStockService = (payload: string) => {
  return Https.get<StatusStockResponse>(`/apis/stocks/insert/${payload}`);
};

const GetStockService = (major: string) => {
  return Https.get<GetStockResponse[]>(`/apis/stocks/get/?major=${major}`);
};

const GetDetailStockService = (id: string, major: string) => {
  return Https.get<any>(`/apis/stocks/detail/?id=${id}&major=${major}`);
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

const UpdateStockService = (
  id: string,
  stockType: string,
  payload: any,
  major: string
) => {
  return Https.post<any>(
    `/apis/stocks/update/?id=${id}&stock_type=${stockType}&major=${major}`,
    payload
  );
};

const DeleteStockByIdService = (id: string, major: string) => {
  return Https.get<StatusStockResponse>(
    `/apis/stocks/delete/?id=${id}&major=${major}`
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
