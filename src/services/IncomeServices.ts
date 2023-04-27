import Https from "../Https/Index";
import GetIncomeResponse from "../Models/Response/GetIncomeResponse";

const getIncomeListService = () => {
  return Https.get<GetIncomeResponse[]>("/apis/incomes/get/");
};

const findIncomeListService = (id: number) => {
  return Https.get<GetIncomeResponse[]>(`/apis/incomes/find/?id=${id}`);
};

const insertIncomeListService = (data: any) => {
  return Https.post("/apis/incomes/insert/", data);
};

const deleteIncomeLustService = (id: string) => {
  return Https.delete(`/apis/incomes/delete/?id=${id}`);
};

const incomeServices = {
  getAll: getIncomeListService,
  findIncome: findIncomeListService,
  InsertIncomeList: insertIncomeListService,
  DeleteIncomeList: deleteIncomeLustService,
};

export default incomeServices;
