import { useContext, useState } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import { GenerateRandomCode } from "../../common/GenerateRadomCommon";
import { StockContext } from "../../contexts/StockContext";
import IsMenuInsert from "../../layouts/stock/IsMenuInsert";
import ByeMenuInsert from "../../layouts/stock/ByeMenuInsert";
import MenuNewInstallmentInsert from "../../layouts/stock/MenuNewInstallmentInsert";
import InstallmentMenuInsert from "../../layouts/stock/InstallmentMenuInsert";
import KayMenuInsert from "../../layouts/stock/KayMenuInsert";
import { useLocation } from "react-router-dom";

export default function StockAddPage() {
  const {
    isMenuInsert,
    NewInstallmentMenuInsert,
    installmentMenuInsert,
    handlerSubmit,
  } = useContext(StockContext);
  const state = useLocation();
  const id =
    new URLSearchParams(useLocation().search).get("id") ?? state.state.id;
  const addType = new URLSearchParams(useLocation().search).get("type");

  return (
    <ContentLayOut
      title={"เพิ่มข้อมูล"}
      topic={
        id === 0 ? `รหัสเอกสารจะถูกสร้างขึ้นหลังกดบันทึก` : `รหัสเอกสาร : ${id}`
      }
      page={
        <>
          {isMenuInsert && <IsMenuInsert id={id} />}
          {addType === "bye" && <ByeMenuInsert id={id} />}
          {addType === "kay" && <KayMenuInsert id={id} />}
          {addType === "equipment" && <IsMenuInsert id={id} />}
          {NewInstallmentMenuInsert && <MenuNewInstallmentInsert />}
          {installmentMenuInsert && <InstallmentMenuInsert />}
          <div className="text-center">
            <button
              type="button"
              className="btn primary-btn col-3 my-3 "
              onClick={handlerSubmit}
            >
              บันทึก
            </button>
          </div>
        </>
      }
    />
  );
}
