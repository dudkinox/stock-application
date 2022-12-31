import React, { useState } from "react";

export default function DetailModal() {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(true);
  const toggleClose = () => setShow(false);

  return (
    <>
      <button
        className="btn primary-btn text-white"
        data-toggle="modal"
        data-target="#DetailStock"
        onClick={toggleShow}
      >
        รายละเอียด
      </button>

      <div
        className={`modal fade ${show ? "show" : ""}`}
        id="DetailStock"
        tabIndex={-1}
        aria-labelledby="DetailStockLabel"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">รายละเอียด</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row justify-content-center col-12 mb-3">
                  <div className="col-2 my-3">
                    <label className="col-form-label">เคส</label>
                  </div>
                  <div className="col-4 my-3">
                    <input
                      type="email"
                      className="form-control col-auto"
                      placeholder=""
                    />
                  </div>
                  <div className="col-2 my-3">
                    <label className="col-form-label">เคส</label>
                  </div>
                  <div className="col-4 my-3">
                    <input
                      type="email"
                      className="form-control col-auto"
                      placeholder=""
                    />
                  </div>
                  <div className="col-2 my-3">
                    <label className="col-form-label">เคส</label>
                  </div>
                  <div className="col-4 my-3">
                    <input
                      type="email"
                      className="form-control col-auto"
                      placeholder=""
                    />
                  </div>
                  <div className="col-2 my-3">
                    <label className="col-form-label">เคส</label>
                  </div>
                  <div className="col-4 my-3">
                    <input
                      type="email"
                      className="form-control col-auto"
                      placeholder=""
                    />
                  </div>
                  <div className="col-2 my-3">
                    <label className="col-form-label">เคส</label>
                  </div>
                  <div className="col-4 my-3">
                    <input
                      type="email"
                      className="form-control col-auto"
                      placeholder=""
                    />
                  </div>
                  <div className="col-2 my-3">
                    <label className="col-form-label">เคส</label>
                  </div>
                  <div className="col-4 my-3">
                    <input
                      type="email"
                      className="form-control col-auto"
                      placeholder=""
                    />
                  </div>
                  <div className="col-2 my-3">
                    <label className="col-form-label">เคส</label>
                  </div>
                  <div className="col-4 my-3">
                    <input
                      type="email"
                      className="form-control col-auto"
                      placeholder=""
                    />
                  </div>
                  <div className="col-2 my-3">
                    <label className="col-form-label">เคส</label>
                  </div>
                  <div className="col-4 my-3">
                    <input
                      type="email"
                      className="form-control col-auto"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="btn btn-danger col-3"
                data-dismiss="modal"
                onClick={toggleClose}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
