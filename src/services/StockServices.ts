import Https from "../Https/Index";
import StockInterface from "../Interfaces/StockInterface";

const InsertStock = (data: any) => {
  return Https.post<StockInterface>("/apis/stocks/insert", data)
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

const StockApi = { InsertStock };

export default StockApi;
