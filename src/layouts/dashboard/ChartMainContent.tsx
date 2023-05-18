import HeaderPageCommon from "../../common/HeaderPageCommon";

export default function ChartMainContent() {
  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <section className="col-lg-12 connectedSortable">
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
              <div className="card">
                <div className="card-header pb-0">
                  <div className="row col-12">
                    <div className="col-4 text-center">
                      <p className="">ยอดผ่อนทั้งหมด</p>
                      <p className="h3">10 เครื่อง</p>
                    </div>
                    <div className="col-4 text-center">
                      <p className="">กำไรทั้งหมด </p>
                      <p className="h3">1,000,000 บาท</p>
                    </div>
                    <div className="col-4 text-center">
                      <p className="">กำไรที่อยากได้</p>
                      <p className="h3">5,000,000 บาท</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}