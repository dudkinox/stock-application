import Https from "../Https/Index";
import {} from "../Models/StockModel";

const InsertStock = (data: any) => {
  return Https.post("/apis/stocks/insert", data)
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const StockApi = { InsertStock };

export default StockApi;
