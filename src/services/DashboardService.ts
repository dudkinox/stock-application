import Https from "../Https/Index";

const getDashboardService = () => {
  return Https.get<[]>(`/apis/dashboard/get/`);
};

const DashboardServices = {
  getDashboards: getDashboardService,
};

export default DashboardServices;
