import React from "react";

export default function ChartMainContent() {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <section className="col-lg-12 connectedSortable">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-chart-pie mr-1" />
                  Sales
                </h3>
                <div className="card-tools">
                  <ul className="nav nav-pills ml-auto">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#revenue-chart"
                        data-toggle="tab"
                      >
                        Area
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#sales-chart"
                        data-toggle="tab"
                      >
                        Donut
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="tab-content p-0">
                  <div
                    className="chart tab-pane active"
                    id="revenue-chart"
                    style={{ position: "relative", height: 300 }}
                  >
                    <canvas
                      id="revenue-chart-canvas"
                      height={300}
                      style={{ height: 300 }}
                    />
                  </div>
                  <div
                    className="chart tab-pane"
                    id="sales-chart"
                    style={{ position: "relative", height: 300 }}
                  >
                    <canvas
                      id="sales-chart-canvas"
                      height={300}
                      style={{ height: 300 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
