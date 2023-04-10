import Https from "../Https/Index";
import GetAllChartResponse from "../Models/Response/GetAllChartResponse";

const PaymentSummaryService = (major: string) => {
  return Https.get<string>(`/apis/payments/salary/?major=${major}`);
};

const ChartSummaryService = () => {
  return Https.get<GetAllChartResponse[]>(`/apis/payments/chart/`);
};

const PaymentService = {
  PaymentSummary: PaymentSummaryService,
  ChartSummary: ChartSummaryService,
};

export default PaymentService;
