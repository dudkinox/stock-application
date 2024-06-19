import Https from "../Https/Index";
import { AccountRequest } from "../Models/Request/AccountRequest";
import { InsertStockResponse } from "../Models/Response/InsertStockResponse";
import GetAccountResponse from "../Models/Response/GetAccountResponse";

const getLoginService = (data: AccountRequest) => {
  return Https.post<InsertStockResponse>(`apis/accounts/login/`, data);
};

const getFindUserService = (username: string) => {
  return Https.get<GetAccountResponse>(
    `/apis/accounts/find/?username=${username}`
  );
};

const changePasswordService = (password: string, id: string) => {
  return Https.post(`/apis/accounts/change_password/?id=${id}`, { password });
};

const AccountServices = {
  getLogin: getLoginService,
  getFindUser: getFindUserService,
  changePassword: changePasswordService,
};

export default AccountServices;
