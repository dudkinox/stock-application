export default interface StockRequest {
  date: string;
  invoice: string;
  customerStatus: string;
  stockType: string;
  major: string;
}

export interface StockEquipmentRequest extends StockRequest {
  cases?: number | string;
  firm?: number | string;
  len?: number | string;
  bigCharge?: number | string;
  charge?: number | string;
  repair?: number | string;
  sum?: number | string;
}

export interface StockByeRequest extends StockRequest {
  serialNumber: string;
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
  id: string;
}

export interface StockInstallmentPaymentRequest extends StockRequest {
  id: string;
  installmentNo: number | string;
  priceTotal: number | string;
}

export interface StockFirstInstallmentRequest extends StockRequest {
  installmentMonth: number | string;
  numberInstallment: number | string;
  payment: number | string;
  datePayment: number | string;
  priceTotal: number | string;
  starMoney: number | string;
}
