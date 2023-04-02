import { useEffect } from "react";
import { GetStockResponse } from "../../Models/Response/GetStockResponse";

interface DetailStockProps {
  item: GetStockResponse;
}

export default function DetailStock({ item }: DetailStockProps) {
  useEffect(() => {
    console.log(item);
  }, [item]);
  return (
    <div className="row">
      <div className="col-6">test</div>
      <div className="col-6">test</div>
    </div>
  );
}
