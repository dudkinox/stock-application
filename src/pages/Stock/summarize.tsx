import React from "react";
import TableCommon from "../../common/Table";

export default function Summarize() {
  const summarizeHeader = ["สาขา", "ชื่อลูกค้า", "จำนวนการผ่อน", "ทุน", "กำไร"];

  return (
    <div className="card-body">
      <TableCommon columns={summarizeHeader} row={[]} />
    </div>
  );
}
