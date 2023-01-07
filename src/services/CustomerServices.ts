import Https from "../Https/Index";

const getCustomerService = () => {
  return Https.get(`apis/customers/get/`);
};

const insertCustomerService = (data: any) => {
  return Https.post(`apis/customers/insert/`, data);
};

const deleteCustomerService = (id: string) => {
  return Https.get(`apis/customers/delete/?id=${id}`);
};

const CustomerServices = {
  getCustomer: getCustomerService,
  insertCustomer: insertCustomerService,
  deleteCustomer: deleteCustomerService,
};

export default CustomerServices;
