import Https from "../Https/Index";

const getCustomerService = () => {
  return Https.get(`apis/customers/get/`);
};

const insertCustomerService = (data: any) => {
  return Https.post(`apis/customers/insert/`, data);
};

const CustomerServices = {
  getCustomer: getCustomerService,
  insertCustomer: insertCustomerService,
};

export default CustomerServices;
