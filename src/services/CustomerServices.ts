import Https from "../Https/Index";
import { GetCustomerResponse } from "../Models/Response/GetCustomerResponse";

const getCustomerService = () => {
  return Https.get<GetCustomerResponse[]>(`apis/customers/get/`);
};

const insertCustomerService = (data: any) => {
  return Https.post(`apis/customers/insert/`, data);
};

const getCustomerByIdService = (id: string) => {
  return Https.get(`apis/customers/find/?id=${id}`);
};

const updateCustomerService = (id: string, payload: any) => {
  return Https.post(`apis/customers/update/?id=${id}`, payload);
};

const deleteCustomerService = (id: string) => {
  return Https.get(`apis/customers/delete/?id=${id}`);
};

const CustomerServices = {
  getCustomer: getCustomerService,
  insertCustomer: insertCustomerService,
  getCustomerById: getCustomerByIdService,
  updateCustomer: updateCustomerService,
  deleteCustomer: deleteCustomerService,
};

export default CustomerServices;
