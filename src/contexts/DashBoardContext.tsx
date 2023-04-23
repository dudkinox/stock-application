import {
    createContext,
    ReactNode,
    useEffect,
    useMemo,
    useState,
    useContext,
  } from "react";
import GetAllChartResponse from "../Models/Response/GetAllChartResponse";
import PaymentService from "../services/PaymentService";
  
  interface DashBoardContextProps {
    chartTotal: GetAllChartResponse[];
    setChartTotal: (value: GetAllChartResponse[]) => void;
  }
  
  export const DashBoardContext = createContext<DashBoardContextProps>({
    chartTotal: [],
    setChartTotal: (value: GetAllChartResponse[]) => {},
  });
  
  interface ChildrenProps {
    children: ReactNode;
  }
  
  export function DashBoardContextProvider({ children }: ChildrenProps) {
    const [chartTotal, setChartTotal] = useState<GetAllChartResponse[]>([]);
   
    useEffect(() => {
        PaymentService.ChartSummary()
        .then((res:any) => {
          const chartResult = setChartTotal(res.data);
          // const dataPaidCount = chartResult.map((item: any) => item.PAID_COUNT);
          // const dataOutstandingCount = chartResult.map(
          //   (item: any) => item.OUTSTANDING_COUNT
          // );
          // const dataCompletedCount = chartResult.map(
          //   (item: any) => item.COMPLETED_COUNT
          // );
  
          setTimeout(
            () =>
              initChart(
                "#barChart",
                // dataPaidCount,
                // dataOutstandingCount,
                // dataCompletedCount
              ),
            100
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    const values = useMemo(
      () => ({
        chartTotal,
        setChartTotal
      }),
      [
        chartTotal,
        setChartTotal
      ]
    );
  
    return (
      <DashBoardContext.Provider value={values}>
        {children}
      </DashBoardContext.Provider>
    );
  }
  