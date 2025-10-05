import React from "react";

export default function blogSelectCal(selectAll: () => void) {
  return (
    <div className="form-check" onClick={selectAll}>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexCheckDefault"
        style={{ cursor: "pointer" }}
      />
      <label
        className="form-check-label"
        htmlFor="flexCheckDefault"
        style={{ cursor: "pointer" }}
      >
        ติ๊กเพื่อเลือกทั้งหมด
      </label>
    </div>
  );
}
