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

export interface StockByeRequest extends StockRequest {
  version: string;
  price: number | string;
  imei: string;
  source: string;
  battery: string;
}

export interface StockKayRequest extends StockRequest {
  customer: string;
  tel: string;
  version: string;
  imei: string;
  starMoney: number | string;
  month: number | string;
  installment: number | string;
  datePayment: number | string;
}

export interface StockInstallmentPaymentRequest extends StockRequest {
  installmentNo: number | string;
  priceTotal: number | string;
}
