import TextInput from "../../common/TextInput";
import { MenuEquipmentEnum } from "../../enum/menuInsert.enum";
import { useContext, useEffect } from "react";
import { StockContext } from "../../contexts/StockContext";
import StockService from "../../services/StockServices";

interface IsMenuInsertProps {
  id: string;
  setEdit: React.Dispatch<
  React.SetStateAction<{
    stockType: string;
    major: string;
    payload: {};
  }>
>;
edit: {
  stockType: string;
  major: string;
  payload: any;
};
}

export default function IsMenuInsert({ id,setEdit,
  edit }: IsMenuInsertProps) {
  const {
    cases,
    setCases,
    firm,
    setFirm,
    len,
    setLen,
    bigCharge,
    setBigCharge,
    charge,
    setCharge,
    repair,
    setRepair,
    sum,
    setSum,
    updateKay,
  } = useContext(StockContext);

  useEffect(() => {
    const major = sessionStorage.getItem("majorEdit");
    
    if (major) {
      StockService.GetFindStockById(id, major, "อุปกรณ์").then((res) => {
        setEdit({
          stockType: "อุปกรณ์",
          major: major,
          payload: res.data,
        });
      });
    }
  }, []);

  return (
    <>
      <TextInput
        label={MenuEquipmentEnum.CASES}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          !updateKay
            ? setCases(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                 CASES: e,
                },
              })}
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"เคส"}
        value={!updateKay ? cases : edit.payload.CASES}
      />
      <TextInput
        label={MenuEquipmentEnum.FIRM}
        icon={"fas fa-mobile-alt"}
        setValue={(e) =>
          !updateKay
            ? setFirm(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  FIRM: e,
                },
              })}
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"ฟิล์ม"}
        value={!updateKay ? firm : edit.payload.FIRM}
      />
      <TextInput
        label={MenuEquipmentEnum.LEN}
        icon={"fas fa-camera"}
        setValue={(e) =>
          !updateKay
            ? setLen(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  LEN: e,
                },
              })}
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"กันเลนส์"}
        value={!updateKay ? len : edit.payload.LEN}
      />
      <TextInput
        label={MenuEquipmentEnum.BIG_CHARGE}
        icon={"fas fa-charging-station"}
        setValue={(e) =>
          !updateKay
            ? setBigCharge(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  BIG_CHARGE: e,
                },
              })}
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"หัวชาร์จใหญ่"}
        value={!updateKay ? bigCharge : edit.payload.BIG_CHARGE}
      />
      <TextInput
        label={MenuEquipmentEnum.CHARGE}
        icon={"fas fa-plug"}
        setValue={(e) =>
          !updateKay
            ? setCharge(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  CHARGE: e,
                },
              })}
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"สายชาร์จ"}
        value={!updateKay ? charge : edit.payload.CHARGE}
      />
      <TextInput
        label={MenuEquipmentEnum.REPAIR}
        icon={"fas fa-tools"}
        setValue={(e) =>
          !updateKay
            ? setRepair(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                 REPAIR: e,
                },
              })}
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"ซ่อม"}
        value={!updateKay ? repair : edit.payload.REPAIR}
      />
      <TextInput
        label={MenuEquipmentEnum.SUM}
        icon={"fas fa-money-bill"}
        setValue={(e) =>
          !updateKay
            ? setSum(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  SUM: e,
                },
              })}
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"ราคา"}
        value={!updateKay ? sum : edit.payload.SUM}
      />
    </>
  );
}
