export interface StockEquipmentRequest {
  cases: string;
  firm: string;
  len: string;
  big_charge: string;
  charge: string;
  repair: string;
  sum: string;
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

export interface StockKayRequest {
  installment_no: string;
  price_total: string;
}
