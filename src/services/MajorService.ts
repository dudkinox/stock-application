import Https from "../Https/Index";
import { MajorRequest } from "../Models/Request/MajorRequest";
import { InsertStockResponse as InsertResponse } from "../Models/Response/InsertStockResponse";

const addMajorService = (data: MajorRequest) => {
  return Https.post<InsertResponse>(`/apis/majors/insert/`, data);
};

const MajorServices = {
  addMajor: addMajorService,
};

export default MajorServices;
