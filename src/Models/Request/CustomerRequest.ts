export interface CustomerRequest {
  idCard: string;
  name: string;
  lastName: string;
  totalPrice: number | string;
  installmentMonth: string;
  numberInstallment: string;
  payment: string;
  datePayment: string;
  customerStatus: string;
  process: string;
  major: string;
}
