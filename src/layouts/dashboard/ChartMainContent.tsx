export default function ChartMainContent() {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <section className="col-lg-12 connectedSortable">
            <div className="card">
              <div className="card-header pb-0">
                <div className="row col-12">
                  <div className="col-3 text-center">
                    <p className="">ยอดขายทั้งหมด</p>
                    <p>1 เครื่อง</p>
                  </div>
                  <div className="col-3 text-center">
                    <p className="">ยอดขายต่อเดือน </p>
                    <p>1 เครื่อง</p>
                  </div>
                  <div className="col-3 text-center">
                    <p className="">ยอดขายต่อสัปดาห์</p>
                    <p>1 เครื่อง</p>
                  </div>
                  <div className="col-3 text-center">
                    <p className="">ยอดขายต่อวัน</p>
                    <p>1 เครื่อง</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="mx-4">
                    <input className="mx-2" type="checkbox" disabled />
                    <label className="form-check-label">ชำระเเล้ว</label>
                  </div>
                  <div>
                    <input className="mx-2" type="checkbox" />
                    <label className="form-check-label">ค้างชำระ</label>
                  </div>
                  <div className="mx-4">
                    <input className="mx-2" type="checkbox" />
                    <label className="form-check-label">ชำระหมดเเล้ว</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body"></div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
