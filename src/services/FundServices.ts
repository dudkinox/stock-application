import Https from "../Https/Index";
import GetFundResponse from "../Models/Response/GetFundResponse";

const getFundListService = () => {
  return Https.get<GetFundResponse[]>("/apis/tun/get/");
};

const insertFundListService = (data: any) => {
  return Https.post("/apis/tun/insert/", data);
};

const findFundListService = (id: string) => {
    return Https.get<GetFundResponse[]>(`/apis/tun/find/?id=${id}`);
  };

const updateFundListService = (id: string, data: any) => {
  return Https.post(`/apis/tun/update/?id=${id}`, data);
};

const deleteFundListService = (id: string) => {
  return Https.delete(`/apis/tun/delete/?id=${id}`);
};

const fundServices = {
  getAll: getFundListService,
  findFund: findFundListService,
  InsertFundList: insertFundListService,
  updateFundList: updateFundListService,
  DeleteFundList: deleteFundListService,
};

export default fundServices;
