import Https from "../Https/Index"
import GetIncomeResponse from "../Models/Response/GetIncomeResponse"


const getIncomeListService = () => {
    Https.get<GetIncomeResponse>("/apis/income/get");
}

const insertIncomeListService = (data: any) => {
    Https.post("/apis/income/get", data);
}

const incomeServices = {
    getAll: getIncomeListService,
    InsertIncomeList: insertIncomeListService,
}

export default incomeServices;