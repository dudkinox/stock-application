export default interface GetAllChartResponse {
    PAYMENT_MONTH?: number | string;
    DATE_RESULT?: number | string;
    DAY_OF_WEEK?: number | string;
    MONTH?: number | string;
    PAYMENT_COUNT: number | string;
    PAID_COUNT: number | string;
    OUTSTANDING_COUNT: number | string;
    COMPLETED_COUNT: number | string;
}
