import Https from "../Https/Index";
import GetBalanceDetailResponse from "../Models/Response/GetBalanceDetailResponse";
import GetBuyTotalResponse from "../Models/Response/GetBuyTotalResponse";
import { GetDashboardSumResponse } from "../Models/Response/GetDashboardSumResponse";

export interface DashboardDateRange {
  start_date: string;
  end_date: string;
}

const getDashboardService = () => {
  return Https.get<[]>(`/apis/dashboard/get/`);
};

const getTypeSelectedService = (major: string, type: string, dates?: DashboardDateRange) => {
  return Https.get<[]>(
    `/apis/dashboard/count-type/`, { params: { major, type, ...dates } }
  );
};

const getProfitService = () => {
  return Https.get<string>(`/apis/dashboard/get-profit/`);
};

const postWantMoneyService = (data: any) => {
  return Https.post(`/apis/dashboard/profit/`, data);
};

const getSummaryService = (major: string, dates?: DashboardDateRange) => {
  return Https.get<GetDashboardSumResponse>(
    `/apis/dashboard/summary/`, { params: { major, ...dates } }
  );
};

const getPercentageService = (dates?: DashboardDateRange) => {
  return Https.get<number>(`/apis/dashboard/percentage/`, { params: dates });
};

const getSumDateService = (major: string, type: string, date: string, dates?: DashboardDateRange) => {
  return Https.get<number>(
    `/apis/dashboard/sum-date/`, { params: { type, duration: date, major, ...dates } }
  );
};

const getBuyTotalService = (major: string) => {
  return Https.get<GetBuyTotalResponse>(
    `/apis/dashboard/buy-total/?major=${major}`
  );
};

const getBalanceDetailService = (major: string) => {
  return Https.get<GetBalanceDetailResponse[]>(
    `/apis/dashboard/balance-detail/?major=${major}`
  );
};

const DashboardServices = {
  getDashboards: getDashboardService,
  getTypeSelected: getTypeSelectedService,
  getProfit: getProfitService,
  postWantMoney: postWantMoneyService,
  getSummary: getSummaryService,
  getPercentage: getPercentageService,
  getSumDate: getSumDateService,
  getBuyTotal: getBuyTotalService,
  getBalanceDetail: getBalanceDetailService,
};

export default DashboardServices;
