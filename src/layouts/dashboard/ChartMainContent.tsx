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
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">กราฟสถิติ</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="remove"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="chart">
                  <canvas
                    id="barChart"
                    style={{
                      minHeight: 250,
                      height: 250,
                      maxHeight: 250,
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
