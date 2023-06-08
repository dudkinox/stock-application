import Https from "../Https/Index";
import GetBuyTotalResponse from "../Models/Response/GetBuyTotalResponse";
import { GetDashboardSumResponse } from "../Models/Response/GetDashboardSumResponse";

const getDashboardService = () => {
  return Https.get<[]>(`/apis/dashboard/get/`);
};

const getTypeSelectedService = (major: string, type: string) => {
  return Https.get<[]>(
    `/apis/dashboard/count-type/?major=${major}&type=${type}`
  );
};

const getProfitService = () => {
  return Https.get<string>(`/apis/dashboard/get-profit/`);
};

const postWantMoneyService = (data: any) => {
  return Https.post(`/apis/dashboard/profit/`, data);
};

const getSummaryService = (major: string) => {
  return Https.get<GetDashboardSumResponse>(
    `/apis/dashboard/summary/?major=${major === "ทั้งหมด" ? "" : major}`
  );
};

const getPercentageService = () => {
  return Https.get<number>(`/apis/dashboard/percentage/`);
};

const getSumDateService = (major: string, type: string, date: string) => {
  return Https.get<number>(
    `/apis/dashboard/sum-date/?type=${type}&duration=${date}&major=${major}`
  );
};

const getBuyTotalService = (major: string) => {
  return Https.get<GetBuyTotalResponse>(
    `/apis/dashboard/buy-total/?major=${major}`
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
};

export default DashboardServices;
