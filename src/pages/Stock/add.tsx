import { useState } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import { GenerateRandomCode } from "../../common/GenerateRadomCommon";

export default function StockAddPage() {
  const [genInvoice] = useState<string>(GenerateRandomCode(6));

  return (
    <ContentLayOut
      title={"เพิ่มข้อมูล"}
      topic={`รหัสเอกสาร : ${genInvoice}`}
      page={<></>}
    />
  );
}
