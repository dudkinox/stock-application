import { useContext } from "react";
import SelectChoice from "../../common/Select";
import { DashboardContext } from "../../contexts/DashboardContext";

export default function HeaderMainContent() {
  const { major, branch, setBranch, type, setType, typeStock, duration,
    setDuration, startDate, setStartDate, endDate, setEndDate } = useContext(DashboardContext);

  const selectDuration = (value: string) => {
    setDuration(value);
    if (value === "ทั้งหมด") {
      setStartDate("");
      return;
    }
    if (value === "กำหนดเอง") return;
    const date = new Date(`${endDate}T00:00:00`);
    if (value === "สัปดาห์") date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    if (value === "เดือน") date.setDate(1);
    setStartDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`);
  };
  const invalidRange = Boolean(startDate && endDate && startDate > endDate);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-4 mt-3">
          <SelectChoice label="สาขา" setValue={setBranch} icon="fa fa-building" topic="ทั้งหมด" options={major.map((item) => item.NAME)} value={branch} />
        </div>
        <div className="col-12 col-md-4 mt-3">
          <SelectChoice label="ประเภท" setValue={setType} icon="fa fa-building" topic="เลือกประเภท" options={typeStock} value={type} />
        </div>
        <div className="col-12 col-md-4 mt-3">
          <SelectChoice label="ช่วง" setValue={selectDuration} icon="fa fa-calendar" topic="ทั้งหมด" options={["ทั้งหมด", "วัน", "สัปดาห์", "เดือน", "กำหนดเอง"]} value={duration} />
        </div>
        <div className="col-12 col-md-6 form-group">
          <label htmlFor="dashboard-start-date">วันที่เริ่มต้น{!startDate && " (ทั้งหมด)"}</label>
          <input id="dashboard-start-date" type="date" className="form-control" value={startDate} max={endDate || undefined}
            onChange={(event) => {
              setStartDate(event.target.value);
              setDuration(event.target.value ? "กำหนดเอง" : "ทั้งหมด");
            }} />
          {!startDate && <small className="form-text">ทั้งหมด — ไม่จำกัดวันที่เริ่มต้น</small>}
        </div>
        <div className="col-12 col-md-6 form-group">
          <label htmlFor="dashboard-end-date">วันที่สิ้นสุด</label>
          <input id="dashboard-end-date" type="date" className="form-control" value={endDate} min={startDate || undefined} required
            onChange={(event) => {
              setEndDate(event.target.value);
              if (startDate) setDuration("กำหนดเอง");
            }} />
        </div>
        {(invalidRange || !endDate) && <p className="col-12 text-danger" role="alert">
          {invalidRange ? "วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่มต้น" : "กรุณาเลือกวันที่สิ้นสุด"}
        </p>}
      </div>
    </div>
  );
}
