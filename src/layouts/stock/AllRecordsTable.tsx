import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../contexts";
import StockService from "../../services/StockServices";
import { PathEnum } from "../../enum/path.enum";
import { convertDateToThaiV3 } from "../../common/DateFormat";

const categories = [
  { name: "ซื้อ", amount: "PRICE", path: PathEnum.STOCK_BYE },
  { name: "ขาย", amount: "STAR_MONEY", path: PathEnum.STOCK_KAY },
  { name: "ผ่อน", amount: "PRICE_TOTAL", path: PathEnum.STOCK_INSTALLMENT_PAYMENT },
  { name: "อุปกรณ์", amount: "SUM", path: PathEnum.STOCK_EQUIPMENT },
];

type RecordData = Record<string, string | number | null>;
export function combineStockRecords(groups: RecordData[][]) {
  return groups.flatMap((rows, index) => rows.map((item, rowIndex) => ({
    key: `${index}-${item.ID}-${rowIndex}`,
    type: categories[index].name,
    path: categories[index].path,
    code: item.CODE ? `${item.CODE}-${item.ID}` : String(item.ID),
    date: String(item.DATE ?? "").slice(0, 10),
    created: String(item.CREATED_AT ?? ""),
    branch: String(item.MAJOR ?? ""),
    detail: index === 2 ? `งวดที่ ${item.INSTALLMENT_NO ?? "-"}` : String(item.VERSION ?? (index === 3 ? "อุปกรณ์" : "-")),
    imei: String(item.IMEI ?? ""),
    amount: Number(item[categories[index].amount] ?? 0),
  }))).sort((a, b) => b.date.localeCompare(a.date) || b.created.localeCompare(a.created) || b.code.localeCompare(a.code, undefined, { numeric: true }));
}

export default function AllRecordsTable() {
  const { majorUser } = useContext(AppContext);
  const [records, setRecords] = useState<ReturnType<typeof combineStockRecords>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0);
  const [type, setType] = useState("");
  const [branch, setBranch] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const invalidDates = Boolean(start && end && start > end);

  useEffect(() => {
    if (!majorUser) return;
    let active = true;
    setLoading(true);
    setError(false);
    Promise.all([
      StockService.GetStockBye(majorUser),
      StockService.GetStockKay(majorUser),
      StockService.GetStockInstallmentPaymentAll(majorUser),
      StockService.GetStockEquipment(majorUser),
    ]).then((results) => {
      if (results.some((result) => !Array.isArray(result.data))) throw new Error("Invalid stock response");
      if (active) setRecords(combineStockRecords(results.map((result) => result.data)));
    }).catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [majorUser, reload]);

  useEffect(() => { setPage(1); }, [type, branch, start, end, search, pageSize]);
  const filtered = useMemo(() => records.filter((item) => !invalidDates
    && (!type || item.type === type)
    && (!branch || item.branch === branch)
    && (!start || item.date >= start)
    && (!end || (item.date !== "" && item.date <= end))
    && `${item.code} ${item.type} ${item.branch} ${item.detail} ${item.imei} ${item.date} ${item.amount}`.toLowerCase().includes(search.trim().toLowerCase())),
  [records, type, branch, start, end, search, invalidDates]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const offset = (currentPage - 1) * pageSize;
  const branches = [...new Set(records.map((item) => item.branch))].sort();

  return <section className="card" aria-labelledby="all-records-title">
    <div className="card-header"><h2 id="all-records-title" className="card-title">ตารางรายการทั้งหมด — ซื้อ / ขาย / ผ่อน / อุปกรณ์</h2></div>
    <div className="card-body">
      <div className="row">
        <div className="col-12 col-md-3 form-group">
          <label htmlFor="all-stock-type">ประเภท</label>
          <select id="all-stock-type" className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">ทั้งหมด</option>{categories.map((item) => <option key={item.name}>{item.name}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-3 form-group">
          <label htmlFor="all-stock-branch">สาขา</label>
          <select id="all-stock-branch" className="form-control" value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">ทั้งหมด</option>{branches.map((name) => <option key={name}>{name}</option>)}
          </select>
        </div>
        <div className="col-12 col-md-3 form-group">
          <label htmlFor="all-stock-start">วันที่เริ่มต้น (ค.ศ.)</label>
          <input id="all-stock-start" type="date" className="form-control" value={start} max={end || undefined} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div className="col-12 col-md-3 form-group">
          <label htmlFor="all-stock-end">วันที่สิ้นสุด (ค.ศ.)</label>
          <input id="all-stock-end" type="date" className="form-control" value={end} min={start || undefined} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>
      {invalidDates && <p className="text-danger" role="alert">วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่มต้น</p>}
      <div className="d-flex flex-wrap align-items-end mb-3">
        <div className="form-group flex-grow-1 mr-2 mb-0">
          <label htmlFor="all-stock-search">ค้นหารหัสเอกสาร รุ่น IMEI หรือสาขา</label>
          <input id="all-stock-search" type="search" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <button type="button" className="btn btn-secondary mt-2" onClick={() => { setType(""); setBranch(""); setStart(""); setEnd(""); setSearch(""); }}>ล้างตัวกรอง</button>
      </div>
      {loading ? <p role="status">กำลังโหลดรายการทั้ง 4 ประเภท…</p> : error ? <div role="alert">โหลดรายการไม่สำเร็จ <button type="button" className="btn btn-secondary" onClick={() => setReload((value) => value + 1)}>ลองใหม่</button></div> : <>
        <p>พบ {filtered.length.toLocaleString()} จาก {records.length.toLocaleString()} รายการ · เรียงตามวันที่รายการล่าสุด</p>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead><tr>{["วันที่ (ค.ศ.)", "รหัสเอกสาร", "ประเภท", "สาขา", "รายละเอียด", "IMEI", "จำนวนเงิน (บาท)", "หน้ารายการ"].map((label) => <th key={label}>{label}</th>)}</tr></thead>
            <tbody>{filtered.slice(offset, offset + pageSize).map((item) => <tr key={item.key}>
              <td className="text-nowrap">{item.date ? convertDateToThaiV3(new Date(`${item.date}T00:00:00`), true) : "-"}</td><td>{item.code}</td><td>{item.type}</td><td>{item.branch}</td><td>{item.detail}</td><td>{item.imei || "-"}</td>
              <td className="text-right">{item.amount.toLocaleString("th-TH", { maximumFractionDigits: 2 })}</td>
              <td><a href={item.path} className="btn btn-sm btn-secondary">หน้า{item.type}</a></td>
            </tr>)}{filtered.length === 0 && <tr><td colSpan={8} className="text-center">ไม่พบรายการตามตัวกรอง</td></tr>}</tbody>
          </table>
        </div>
        <p className="text-sm">จำนวนเงิน: ซื้อ = ราคาซื้อ · ขาย = เงินดาวน์/เงินรับเริ่มต้น · ผ่อน = เงินรับชำระงวด · อุปกรณ์ = ยอดรวมอุปกรณ์</p>
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <label>แสดง <select aria-label="จำนวนรายการต่อหน้า" className="mx-2" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>{[25, 50, 100].map((size) => <option key={size}>{size}</option>)}</select>รายการต่อหน้า</label>
          <div><button type="button" className="btn btn-secondary" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>ก่อนหน้า</button><span className="mx-3">{currentPage} / {pages}</span><button type="button" className="btn btn-secondary" disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>ถัดไป</button></div>
        </div>
      </>}
    </div>
  </section>;
}
