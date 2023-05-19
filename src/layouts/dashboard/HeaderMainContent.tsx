import { useContext, useEffect, useState } from "react";
import PaymentService from "../../services/PaymentService";
import SelectChoice from "../../common/Select";
import { DashboardContext } from "../../contexts/DashboardContext";
import InitGraph from "../../common/Graph";

export default function HeaderMainContent() {
  const [paymentTotal, setPaymentTotal] = useState<string>("");

  const {
    setBranch,
    setType,
    setDuration,
    major,
    branch,
    type,
    duration,
    typeStock,
  } = useContext(DashboardContext);

  useEffect(() => {
    const major = sessionStorage.getItem("major") ?? "";
    PaymentService.PaymentSummary(major).then((res) => {
      setPaymentTotal(res.data);
    });
  }, [setPaymentTotal]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 col-sm-6 col-md-4 mt-3">
            <SelectChoice
              label={"สาขา"}
              setValue={setBranch}
              icon={"fa fa-building"}
              topic={"ทั้งหมด"}
              options={major.map((item) => item.NAME)}
              value={branch}
            />
          </div>
          <div className="col-4 col-sm-6 col-md-4 mt-3">
            <SelectChoice
              label={"ประเภท"}
              setValue={setType}
              icon={"fa fa-building"}
              topic={"เลือกประเภท"}
              options={typeStock}
              value={type}
            />
          </div>
          <div className="col-4 col-sm-6 col-md-4 mt-3">
            <SelectChoice
              label={"ช่วง"}
              setValue={(e) => {
                setDuration(e);
                document.getElementById("barChart")?.remove();
                const element = document.createElement("canvas");
                element.id = "barChart";
                element.style.minHeight = "250px";
                element.style.height = "250px";
                element.style.maxHeight = "250px";
                element.style.maxWidth = "100%";
                document.getElementsByClassName("chart")[0];
                document
                  .getElementsByClassName("chart")[0]
                  .appendChild(element);

                InitGraph(branch, type, e);
              }}
              icon={"fa fa-building"}
              topic={"วัน"}
              options={["วัน", "สัปดาห์", "เดือน"]}
              value={duration}
            />
          </div>
        </div>
      </div>
    </>
  );
}
