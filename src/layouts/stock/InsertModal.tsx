import React, { useState } from "react";

export default function InsertModal() {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(true);
  const toggleClose = () => setShow(false);

  return (
    <>
      <div>เพิ่ม/ลบ/เเก้ไข</div>
      <button
        className="btn primary-btn text-white w-100 mt-2"
        data-toggle="modal"
        data-target="#InsertStock"
        onClick={toggleShow}
      >
        <i className="nav-icon fas fa-plus" />
      </button>

      <div
        className={`modal fade ${show ? "show" : ""}`}
        id="InsertStock"
        tabIndex={-1}
        aria-labelledby="InsertStockLabel"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
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
              <div className="container">
                <form>
                  <div className="row mb-3">
                    <div className="form-group mx-4">
                      <label className="float-left">วันที่:</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="far fa-calendar-alt"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          data-inputmask-alias="datetime"
                          data-inputmask-inputformat="dd/mm/yyyy"
                          data-mask
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="float-left">เลขบัตรประชาชน:</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="far fa-id-card"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          minLength={13}
                          maxLength={13}
                          autoComplete="on"
                          placeholder="x-xxxx-xxxxx-xx-x"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn primary-btn col-2">
                บันทึก
              </button>
              <button
                type="button"
                className="btn btn-danger col-2"
                data-dismiss="modal"
                onClick={toggleClose}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
