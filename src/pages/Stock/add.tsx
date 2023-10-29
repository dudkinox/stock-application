import { useContext, useState } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import { StockContext } from "../../contexts/StockContext";
import IsMenuInsert from "../../layouts/stock/IsMenuInsert";
import ByeMenuInsert from "../../layouts/stock/ByeMenuInsert";
import InstallmentMenuInsert from "../../layouts/stock/InstallmentMenuInsert";
import KayMenuInsert from "../../layouts/stock/KayMenuInsert";
import { useLocation } from "react-router-dom";
import StockService from "../../services/StockServices";
import { AlertError, AlertSuccess } from "../../common/ToastrCommon";

export default function StockAddPage() {
  const { isMenuInsert, handlerSubmit } = useContext(StockContext);
  const state = useLocation();
  const id =
    new URLSearchParams(useLocation().search).get("id") ?? state.state.id;
  const addType = new URLSearchParams(useLocation().search).get("type");

  const [edit, setEdit] = useState({
    stockType: "",
    major: "",
    payload: {},
  });

  const updateHandlerSubmit = () => {
    setIsLoading(true);

    StockService.UpdateStock(id, edit.stockType, edit.payload, edit.major)
      .then((res) => {
        AlertSuccess("แก้ไขข้อมูลสำเร็จ");
        setIsLoading(false);
        // window.location.href = "/stock";
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <ContentLayOut
      title={"เพิ่มข้อมูล"}
      topic={
        id === 0 ? `รหัสเอกสารจะถูกสร้างขึ้นหลังกดบันทึก` : `รหัสเอกสาร : ${id}`
      }
      page={
        <>
          {isMenuInsert && <IsMenuInsert id={id} />}
          {addType === "bye" && (
            <ByeMenuInsert id={id} setEdit={setEdit} edit={edit} />
          )}
          {addType === "kay" && <KayMenuInsert id={id} />}
          {addType === "equipment" && <IsMenuInsert id={id} />}
          {addType === "installment" && <InstallmentMenuInsert id={id} />}
          <div className="text-center">
            <button
              type="button"
              className="btn primary-btn col-3 my-3 "
              onClick={id === 0 ? handlerSubmit : updateHandlerSubmit}
            >
              บันทึก
            </button>
          </div>
        </>
      }
    />
  );
}
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
