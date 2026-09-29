import { useContext, useState } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import { StockContext } from "../../contexts/StockContext";
import IsMenuInsert from "../../layouts/stock/IsMenuInsert";
import ByeMenuInsert from "../../layouts/stock/ByeMenuInsert";
import InstallmentMenuInsert from "../../layouts/stock/InstallmentMenuInsert";
import KayMenuInsert from "../../layouts/stock/KayMenuInsert";
import { useLocation, useNavigate } from "react-router-dom";
import StockService from "../../services/StockServices";
import { AlertError, AlertSuccess } from "../../common/ToastrCommon";
import { AppContext } from "../../contexts";
import { PathEnum } from "../../enum/path.enum";

export default function StockAddPage() {
  const { isMenuInsert, handlerSubmit, updateKey } = useContext(StockContext);
  const { setIsLoading } = useContext(AppContext);
  const state = useLocation();
  const navigate = useNavigate();
  const id =
    new URLSearchParams(state.search).get("id") ?? state.state?.id ?? 0;
  const addType = new URLSearchParams(state.search).get("type");

  const cancelHandler = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    const returnPath =
      addType === "bye"
        ? PathEnum.STOCK_BYE
        : addType === "kay"
        ? PathEnum.STOCK_KAY
        : addType === "equipment"
        ? PathEnum.STOCK_EQUIPMENT
        : addType === "installment"
        ? PathEnum.STOCK_INSTALLMENT_PAYMENT
        : PathEnum.STOCK_SUM;

    navigate(returnPath, { replace: true });
  };

  const [edit, setEdit] = useState({
    stockType: "",
    major: "",
    payload: {},
  });

  const updateHandlerSubmit = () => {
    setIsLoading(true);

    StockService.UpdateStock(id, edit.stockType, edit.payload, edit.major)
      .then(() => {
        AlertSuccess("แก้ไขข้อมูลสำเร็จ");
        setIsLoading(false);

        window.location.href =
          edit.stockType === "ซื้อ"
            ? "/stock-bye"
            : edit.stockType === "ขาย"
            ? "/stock-kay"
            : edit.stockType === "อุปกรณ์"
            ? "/stock-equipment"
            : "/stock-installment-payment";
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
          {isMenuInsert && (
            <IsMenuInsert id={id} setEdit={setEdit} edit={edit} />
          )}
          {addType === "bye" && (
            <ByeMenuInsert id={id} setEdit={setEdit} edit={edit} />
          )}
          {addType === "kay" && (
            <KayMenuInsert setEdit={setEdit} edit={edit} id={id} />
          )}
          {addType === "equipment" && (
            <IsMenuInsert id={id} setEdit={setEdit} edit={edit} />
          )}
          {addType === "installment" && (
            <InstallmentMenuInsert id={id} setEdit={setEdit} edit={edit} />
          )}
          <div className="text-center">
            <button
              type="button"
              className="btn primary-btn col-3 my-3 mr-2"
              onClick={
                id === 0 || !updateKey ? handlerSubmit : updateHandlerSubmit
              }
            >
              บันทึก
            </button>
            <button
              type="button"
              className="btn btn-secondary col-3 my-3"
              onClick={cancelHandler}
            >
              ยกเลิก
            </button>
          </div>
        </>
      }
    />
  );
}
