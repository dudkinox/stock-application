import Https from "../Https/Index";
import { MajorRequest } from "../Models/Request/MajorRequest";
import { InsertStockResponse as StatusResponse } from "../Models/Response/InsertStockResponse";

const addMajorService = (data: MajorRequest) => {
  return Https.post<StatusResponse>(`/apis/majors/insert/`, data);
};

const getMajorsService = () => {
  return Https.get(`/apis/majors/get/`);
};


const deleteMajorService = (id: number) => {
  return Https.get<StatusResponse>(`/apis/majors/delete/?id=${id}`);
};

const updateMajorService = (data: MajorRequest, id: number) => {
  return Https.post<StatusResponse>(`/apis/majors/update/?id=${id}`, data);
};

const MajorServices = {
  addMajor: addMajorService,
  getMajors: getMajorsService,
  deleteMajor: deleteMajorService,
  updateMajor: updateMajorService,
};

export default MajorServices;
