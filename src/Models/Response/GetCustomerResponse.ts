export interface GetCustomerResponse {
  CODE?: string;
  CREATED_AT: string;
  ID: string;
  ID_CARD: string;
  NAME: string;
  LAST_NAME: string;
  TOTAL_PRICE: number | string;
  INSTALLMENT_MONTH: string;
  NUMBER_INSTALLMENT: string;
  PAYMENT: string;
  DATE_PAYMENT: string;
  CUSTOMER_STATUS: string;
  PROCESS: string;
  MAJOR: string;
}
