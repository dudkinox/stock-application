import { useContext, useEffect, useState } from "react";
import HeaderPageCommon from "../../common/HeaderPageCommon";
import InitGraph from "../../common/Graph";
import { DashboardContext } from "../../contexts/DashboardContext";
import ModalCommon from "../../common/Modal";
import TextInput from "../../common/TextInput";
import DashboardServices from "../../services/DashboardService";
import { GetDashboardSumResponse } from "../../Models/Response/GetDashboardSumResponse";
import { AppContext } from "../../contexts";
import GetBuyTotalResponse from "../../Models/Response/GetBuyTotalResponse";
import BalanceDetail from "./BalanceDetail";
import initTable, { destroyTable } from "../../common/DataTable";
import GetBalanceDetailResponse from "../../Models/Response/GetBalanceDetailResponse";

export default function ChartMainContent() {
  const { branch, type, duration, totalSum, desiredProfit } =
    useContext(DashboardContext);
  const [profit, setProfit] = useState<string>("");
  const [summary, setSummary] = useState<GetDashboardSumResponse>();
  const [percentage, setPercentage] = useState<number>(0);
  const [buyTotal, setBuyTotal] = useState<GetBuyTotalResponse>();
  const [balanceDetail, setBalanceDetail] = useState<
    GetBalanceDetailResponse[]
  >([]);
  const { setIsLoading } = useContext(AppContext);

  useEffect(() => {
    InitGraph(branch, type, duration);
    setIsLoading(true);
    DashboardServices.getProfit().then((res) => {
      setProfit(res.data);
    });
    DashboardServices.getSummary(branch).then((res) => {
      setSummary(res.data);
    });
    DashboardServices.getPercentage().then((res) => {
      setPercentage(res.data);
    });
    DashboardServices.getBuyTotal(branch).then((res) => {
      setBuyTotal(res.data);
    });
    DashboardServices.getBalanceDetail(branch).then((res) => {
      setTimeout(() => destroyTable());
      setBalanceDetail(res.data);
      setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      setIsLoading(false);
    });
  }, [setProfit, setSummary, setPercentage, branch]);

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
                  <p>{type === "" ? "-" : `ยอด${type}ทั้งหมด`} </p>
                  <p className="h3">
                    {type === "" ? "0" : `${totalSum} เครื่อง`}{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="card col-sm-6">
              <div className="card-body pb-0">
                <div className="text-center">
                  <p>กำไรทั้งหมด </p>
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
                        }จาก${type}${duration}นี้`}
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
                  <p>{"รายจ่าย"}</p>
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
          </div>
          <div className="card">
            <div className="card-header pb-0">
              <div className="row col-12">
                <div className="col-4 text-center">
                  <p>{"จำนวนเครื่องที่ซื้อ"}</p>
                  <p className="h3">{buyTotal?.COUNT.toLocaleString()}</p>
                </div>
                <div className="col-4 text-center">
                  <p>{"ขายไปแล้ว"}</p>
                  <p className="h3">{buyTotal?.BUY.toLocaleString()}</p>
                </div>
                <div className="col-4 text-center">
                  <p>{"เหลือจำนวนเครื่อง"}</p>
                  <p className="h3">{buyTotal?.BALANCE.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
