export interface StockEquipmentRequest {
  cases: number;
  firm: number;
  len: number;
  big_charge: number;
  charge: number;
  repair: number;
  sum: number;
}

export interface StockByeRequest {
  version: string;
  price: string;
  imei: string;
  source: string;
  battery: string;
}

export interface StockKayRequest {
  customer: string;
  tel: string;
  version: string;
  imei: string;
  star_money: string;
  month: string;
  installment: string;
  date_payment: string;
}

export interface StockInstallmentRequest {
  installment_no: string;
  price_total: string;
}
