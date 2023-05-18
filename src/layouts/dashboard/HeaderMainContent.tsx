import { useContext, useEffect, useState } from "react";
import PaymentService from "../../services/PaymentService";
import SelectChoice from "../../common/Select";
import { DashboardContext } from "../../contexts/DashboardContext";

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
              topic={"ทั้งหมด"}
              options={typeStock}
              value={type}
            />
          </div>
          <div className="col-4 col-sm-6 col-md-4 mt-3">
            <SelectChoice
              label={"ช่วง"}
              setValue={setDuration}
              icon={"fa fa-building"}
              topic={"ทั้งหมด"}
              options={["ทั้งหมด", "เดือน", "สัปดาห์", "วัน"]}
              value={duration}
            />
          </div>
        </div>
      </div>
    </>
  );
}
