import Https from "../Https/Index";
import GetAllChartResponse from "../Models/Response/GetAllChartResponse";

const PaymentSummaryService = (major: string) => {
  return Https.get<string>(`/apis/payments/salary/?major=${major}`);
};

const ChartSummaryService = () => {
  return Https.get<GetAllChartResponse[]>(`/apis/payments/chart/`);
};

const ChartDaySummaryService = () => {
  return Https.get<GetAllChartResponse[]>(`/apis/payments/chart/day`);
};

const ChartWeekSummaryService = () => {
  return Https.get<GetAllChartResponse[]>(`/apis/payments/chart/week`);
};

const ChartMonthSummaryService = () => {
  return Https.get<GetAllChartResponse[]>(`/apis/payments/chart/month`);
};

const InstallmentNumber = (idCard : string) => {
  return Https.get<string>(`/apis/installment_payment/fincert/?id_card=${idCard}`);
};

const PaymentService = {
  PaymentSummary: PaymentSummaryService,
  ChartSummary: ChartSummaryService,
  ChartDaySummary: ChartDaySummaryService,
  ChartWeekSummary: ChartWeekSummaryService,
  ChartMonthSummary: ChartMonthSummaryService,
  InstallmentNumber: InstallmentNumber,
};

export default PaymentService;
