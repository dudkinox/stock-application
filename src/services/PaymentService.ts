import Https from "../Https/Index";

const PaymentSummaryService = (major: string) => {
  return Https.get<string>(`/apis/payments/salary/?major=${major}`);
};

const PaymentService = {
  PaymentSummary: PaymentSummaryService,
};

export default PaymentService;
