export default interface StockRequest {
  date: string;
  idCard: string;
  customerStatus: string;
  stockType: string;
}

export interface StockEquipmentRequest extends StockRequest {
  cases: number | string;
  firm: number | string;
  len: number | string;
  bigCharge: number | string;
  charge: number | string;
  repair: number | string;
  sum: number | string;
}
