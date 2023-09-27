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

const GetStockKayService = (major: string) => {
  return Https.get<any[]>(`/apis/kay/get/?major=${major}`);
};

const GetStockByeService = (major: string) => {
  return Https.get<any[]>(`/apis/bye/get/?major=${major}`);
};

const GetStockEquipmentService = (major: string) => {
  return Https.get<any[]>(`/apis/equipment/get/?major=${major}`);
};

const GetStockInstallmentPaymentService = (major: string) => {
  return Https.get<any[]>(`/apis/bye/installment_payment/?major=${major}`);
};

const GetStockInstallmentPaymentAllService = (major: string) => {
  return Https.get<any[]>(`/apis/installment_payment/get/?major=${major}`);
}

const StockService = {
  InsertStock: InsertStockService,
  GetStock: GetStockService,
  GetDetailStockService: GetDetailStockService,
  GetFindStockById: GetFindByIdStockService,
  UpdateStock: UpdateStockService,
  DeleteStockById: DeleteStockByIdService,
  GetStockKay: GetStockKayService,
  GetStockBye: GetStockByeService,
  GetStockEquipment: GetStockEquipmentService,
  GetStockInstallmentPayment: GetStockInstallmentPaymentService,
  GetStockInstallmentPaymentAll: GetStockInstallmentPaymentAllService
};

export default StockService;
