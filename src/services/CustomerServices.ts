import Https from "../Https/Index";

const getCustomerService = () => {
  return Https.get(`apis/customers/get/`);
};

const CustomerServices = {
  getCustomer: getCustomerService,
};

export default CustomerServices;
