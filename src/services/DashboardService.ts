import Https from "../Https/Index";

const getDashboardService = () => {
  return Https.get<[]>(`/apis/dashboard/get/`);
};

const getTypeSelectedService = (major: string, type: string) => {
  return Https.get<[]>(`/apis/dashboard/count-type/?major=${major}&type=${type}`);
  
};

const DashboardServices = {
  getDashboards: getDashboardService,
  getTypeSelected: getTypeSelectedService,
};

export default DashboardServices;
