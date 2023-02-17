import Https from "../Https/Index";
import { GetCustomerResponse } from "../Models/Response/GetCustomerResponse";

const getCustomerService = (major: string) => {
  return Https.get<GetCustomerResponse[]>(`apis/customers/get/?major=${major}`);
};

const insertCustomerService = (data: any, major: string) => {
  return Https.post(`apis/customers/insert/?major=${major}`, data);
};

const getCustomerByIdService = (id: string, major: string) => {
  return Https.get(`apis/customers/find/?id=${id}?major=${major}`);
};

const updateCustomerService = (id: string, major: string, payload: any) => {
  return Https.post(`apis/customers/update/?id=${id}&major=${major}`, payload);
};

const deleteCustomerService = (id: string) => {
  return Https.get(`apis/customers/delete/?id=${id}`);
};

const notificationLineService = () => {
  return Https.post(`apis/notifications/`);
};

const CustomerServices = {
  getCustomer: getCustomerService,
  insertCustomer: insertCustomerService,
  getCustomerById: getCustomerByIdService,
  updateCustomer: updateCustomerService,
  deleteCustomer: deleteCustomerService,
  notificationLine: notificationLineService,
};

export default CustomerServices;
