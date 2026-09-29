import { useContext, useEffect, useState } from "react";
import { AlertError } from "../../common/ToastrCommon";
import { DashboardContext } from "../../contexts/DashboardContext";
import ModalCommon from "../../common/Modal";
import TextInput from "../../common/TextInput";
import DashboardServices from "../../services/DashboardService";
import { GetDashboardSumResponse } from "../../Models/Response/GetDashboardSumResponse";
import { AppContext } from "../../contexts";

export default function ChartMainContent() {
  const { branch, type, startDate, endDate, totalSum, desiredProfit, setTotalSum, setDesiredProfit } =
    useContext(DashboardContext);
  const [profit, setProfit] = useState<string>("");
  const [summary, setSummary] = useState<GetDashboardSumResponse>();
  const [percentage, setPercentage] = useState<number>(0);
  const { setIsLoading } = useContext(AppContext);

  useEffect(() => {
    if (!endDate || (startDate && startDate > endDate)) return;
    let active = true;
    const dates = { start_date: startDate, end_date: endDate };
    Promise.all([
      DashboardServices.getProfit(),
      DashboardServices.getSummary(branch, dates),
      DashboardServices.getPercentage(dates),
      DashboardServices.getTypeSelected(branch, type, dates),
      DashboardServices.getSumDate(branch, type, "ทั้งหมด", dates),
    ]).then(([profitResult, summaryResult, percentageResult, countResult, sumResult]) => {
      if (!active) return;
      setProfit(profitResult.data);
      setSummary(summaryResult.data);
      setPercentage(Number(percentageResult.data) || 0);
      setTotalSum(countResult.data.toString());
      setDesiredProfit(sumResult.data);
    }).catch((error) => {
      if (active) AlertError(error.response?.data?.message ?? "โหลดข้อมูลสรุปไม่สำเร็จ");
    }).finally(() => {
      if (active) setIsLoading(false);
    });
    return () => { active = false; };
  }, [branch, type, startDate, endDate]);

  return (
    <>
      <ModalCommon
        title={"กำไรที่อยากได้"}
        content={
          <>
            <div className="container my-3 text-center">
              <TextInput
                label={"กำไร"}
                setValue={setProfit}
                type={"number"}
                icon={"fa fa-money-bill"}
              />
              <button
                type="button"
                className="btn primary-btn col-2"
                data-dismiss={`modal`}
                onClick={() => {
                  DashboardServices.postWantMoney({ money: profit });
                }}
              >
                บันทึก
              </button>
            </div>
          </>
        }
        id={"want-money"}
      />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-sm-6">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>{type === "" ? "-" : `ยอด${type}ในช่วงที่เลือก`} </p>
                  <p className="h3">
                    {type === "" ? "0" : `${totalSum} เครื่อง`}{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="card col-sm-6">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>กำไรรวมทุกสาขาในช่วงที่เลือก</p>
                  <p className="h3">{percentage.toLocaleString()} บาท </p>
                </div>
              </div>
            </div>
            <div className="card col-sm-6">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>
                    กำไรที่อยากได้{" "}
                    <button
                      className="btn btn-warning mx-2 "
                      data-toggle="modal"
                      data-target="#want-money"
                      style={{ fontSize: "13px" }}
                    >
                      <i className="nav-icon fas fa-pen" />
                    </button>
                  </p>
                  <p className="h3">{Number(profit).toLocaleString()} บาท</p>
                </div>
              </div>
            </div>
            <div className="card col-sm-6">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>
                    {type === ""
                      ? `-`
                      : `ราย${
                          type === "อุปกรณ์"
                            ? "จ่าย"
                            : type === "ซื้อ"
                            ? "จ่าย"
                            : "รับ"
                        }จาก${type}ในช่วงที่เลือก`}
                  </p>
                  <p className="h3">
                    {type !== ""
                      ? Number(desiredProfit).toLocaleString() + " บาท"
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="card col-sm-4">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>{"ค่าซื้อเครื่องเข้า"}</p>
                  <p className="h3">{summary?.TUN.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="card col-sm-4">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>{"เงินดาวน์"}</p>
                  <p className="h3">{summary?.DOWN.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="card col-sm-4">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>{"รายการผ่อน"}</p>
                  <p className="h3">{summary?.INSTALLMENT.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="card col-sm-4">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>{"อุปกรณ์"}</p>
                  <p className="h3">
                    {summary?.EQUIPMENT_COUNT.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="card col-sm-4">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>รายจ่าย (รวมดึงเงินออก)</p>
                  <p className="h3">{summary?.OUTCOME.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="card col-sm-4">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>{"สุทธิ"}</p>
                  <p className="h3">{summary?.TOTAL.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="card col-sm-12">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>{"เงินที่เหลือของร้านในช่วงที่เลือก"}</p>
                  <p className="h3">
                    {(summary?.REMAINING ?? 0).toLocaleString()} บาท
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
