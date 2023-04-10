import { useEffect, useState } from "react";
import PaymentService from "../../services/PaymentService";
import SelectChoice from "../../common/Select";
import initChart from "../../common/BarChart";
import GetAllChartResponse from "../../Models/Response/GetAllChartResponse";

export default function HeaderMainContent() {
  const [paymentTotal, setPaymentTotal] = useState<string>("");
  const [ChartTotal, setChartTotal] = useState<GetAllChartResponse[]>([]);

  useEffect(() => {
    const major = sessionStorage.getItem("major") ?? "";
    PaymentService.PaymentSummary(major).then((res) => {
      setPaymentTotal(res.data);
    });

    PaymentService.ChartSummary()
      .then((res) => {
        const chartResult = setChartTotal(res.data);
        const dataPaidCount = chartResult.map((item: any) => item.PAID_COUNT);
        const dataOutstandingCount = chartResult.map(
          (item: any) => item.OUTSTANDING_COUNT
        );
        const dataCompletedCount = chartResult.map(
          (item: any) => item.COMPLETED_COUNT
        );

        setTimeout(
          () =>
            initChart(
              "#barChart",
              dataPaidCount,
              dataOutstandingCount,
              dataCompletedCount
            ),
          100
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setPaymentTotal, setChartTotal]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 col-sm-6 col-md-4 mt-3">
            <SelectChoice
              label={"สาขา"}
              setValue={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
              icon={"fa fa-building"}
              topic={"ทั้งหมด"}
              options={["ทั้งหมด", "สาขา 1", "สาขา 2", "สาขา 3"]}
              value={""}
            />
          </div>
          <div className="col-4 col-sm-6 col-md-4 mt-3">
            <SelectChoice
              label={"ประเภท"}
              setValue={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
              icon={"fa fa-building"}
              topic={"ทั้งหมด"}
              options={["ทั้งหมด", "ซื้อ", "ผ่อน", "ขาย", "อุปกรณ์"]}
              value={""}
            />
          </div>
          <div className="col-4 col-sm-6 col-md-4 mt-3">
            <SelectChoice
              label={"ช่วง"}
              setValue={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
              icon={"fa fa-building"}
              topic={"เดือน"}
              options={["ทั้งหมด", "เดือน", "สัปดาห์", "วัน"]}
              value={""}
            />
          </div>
        </div>
      </div>
    </>
  );
}
