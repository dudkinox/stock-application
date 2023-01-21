import Https from "../Https/Index";
import { AccountRequest } from "../Models/Request/AccountRequest";
import { InsertStockResponse } from "../Models/Response/InsertStockResponse";

const getLoginService = (data: AccountRequest) => {
  return Https.post<InsertStockResponse>(`apis/accounts/login/`, data);
};

const AccountServices = {
  getLogin: getLoginService,
};

export default AccountServices;
