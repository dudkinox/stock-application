import Https from "../Https/Index"
import GetIncomeResponse from "../Models/Response/GetIncomeResponse"


const getIncomeListService = () => {
   return Https.get<GetIncomeResponse[]>("/apis/incomes/get/");
}

const insertIncomeListService = (data: any) => {
   return Https.post("/apis/incomes/insert/", data);
}

const incomeServices = {
    getAll: getIncomeListService,
    InsertIncomeList: insertIncomeListService,
}

export default incomeServices;