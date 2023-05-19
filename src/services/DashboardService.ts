import Https from "../Https/Index";

const getDashboardService = () => {
  return Https.get<[]>(`/apis/dashboard/get/`);
};

const getTypeSelectedService = (major: string, type: string) => {
  return Https.get<[]>(`/apis/dashboard/count-type/?major=${major}&type=${type}`);
  
};

const getProfitService = () => {
  return Https.get<string>(`/apis/dashboard/get-profit/`);
};

const postWantMoneyService = (data: any) => {
  return Https.post(`/apis/dashboard/profit/`, data);
};


const DashboardServices = {
  getDashboards: getDashboardService,
  getTypeSelected: getTypeSelectedService,
  getProfit: getProfitService,
  postWantMoney: postWantMoneyService,
};

export default DashboardServices;
