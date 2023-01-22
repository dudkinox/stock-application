import Https from "../Https/Index";
import { GetUserResponse } from "../Models/Response/GetUserResponse";

const getUserService = () => {
    return Https.get<GetUserResponse[]>(`apis/accounts/get/`);
};

const insertUserService = (payload: any) => {
  return Https.post(`apis/accounts/insert/`, payload);
};

const getUserByIdService = (id: string) => {
  return Https.get(`apis/accounts/find/?id=${id}`);
};

const updateUserService = (id: string, payload: any) => {
  return Https.post(`apis/accounts/update/?id=${id}`, payload);
};

const deleteUserService = (id: string) => {
  return Https.get(`apis/accounts/delete/?id=${id}`);
};

const UserServices = {
  getUser: getUserService,
  insertUser: insertUserService,
  getUserById: getUserByIdService,
  updateUser: updateUserService,
  deleteUser: deleteUserService,
};

export default UserServices;
