export default interface GetIncomeRequest {
  DATE: string;
  LIST_NAME: string;
  REVENUE: number | string;
  EXPENSE: number | string;
  NOTE: string;
  MAJOR: string;
  IS_EXCEPT: boolean;
}
