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
        data-bs-toggle="modal"
        data-bs-target="#InsertStock"
        onClick={toggleShow}
      >
        <i className="nav-icon fas fa-plus" />
      </button>

      <div
        className={`modal shm ${show ? "d-block" : ""}`}
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
                className="btn-close border border-0 bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={toggleClose}
              >
                {/* <span aria-hidden="true">&times;</span> */}
                <i className="fas fa-times "></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={toggleClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
