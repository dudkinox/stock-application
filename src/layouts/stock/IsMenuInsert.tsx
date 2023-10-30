import TextInput from "../../common/TextInput";
import { MenuEquipmentEnum } from "../../enum/menuInsert.enum";
import { useContext, useEffect, useState } from "react";
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

export default function IsMenuInsert({ id, setEdit, edit }: IsMenuInsertProps) {
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
    updateKey: updateKay,
  } = useContext(StockContext);
  const [isInsert, setIsInsert] = useState(false);

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

  useEffect(() => {
    setIsInsert(Number(id) === 0);
  }, []);

  return (
    <>
      <TextInput
        label={MenuEquipmentEnum.CASES}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          isInsert
            ? setCases(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  CASES: e,
                },
              })
        }
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"เคส"}
        value={isInsert ? cases : edit.payload.CASES}
      />
      <TextInput
        label={MenuEquipmentEnum.FIRM}
        icon={"fas fa-mobile-alt"}
        setValue={(e) =>
          isInsert
            ? setFirm(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  FIRM: e,
                },
              })
        }
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"ฟิล์ม"}
        value={isInsert ? firm : edit.payload.FIRM}
      />
      <TextInput
        label={MenuEquipmentEnum.LEN}
        icon={"fas fa-camera"}
        setValue={(e) =>
          isInsert
            ? setLen(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  LEN: e,
                },
              })
        }
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"กันเลนส์"}
        value={isInsert ? len : edit.payload.LEN}
      />
      <TextInput
        label={MenuEquipmentEnum.BIG_CHARGE}
        icon={"fas fa-charging-station"}
        setValue={(e) =>
          isInsert
            ? setBigCharge(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  BIG_CHARGE: e,
                },
              })
        }
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"หัวชาร์จใหญ่"}
        value={isInsert ? bigCharge : edit.payload.BIG_CHARGE}
      />
      <TextInput
        label={MenuEquipmentEnum.CHARGE}
        icon={"fas fa-plug"}
        setValue={(e) =>
          isInsert
            ? setCharge(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  CHARGE: e,
                },
              })
        }
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"สายชาร์จ"}
        value={isInsert ? charge : edit.payload.CHARGE}
      />
      <TextInput
        label={MenuEquipmentEnum.REPAIR}
        icon={"fas fa-tools"}
        setValue={(e) =>
          isInsert
            ? setRepair(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  REPAIR: e,
                },
              })
        }
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"ซ่อม"}
        value={isInsert ? repair : edit.payload.REPAIR}
      />
      <TextInput
        label={MenuEquipmentEnum.SUM}
        icon={"fas fa-money-bill"}
        setValue={(e) =>
          isInsert
            ? setSum(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  SUM: e,
                },
              })
        }
        type={"number"}
        min={0}
        minLength={0}
        placeholder={"ราคา"}
        value={isInsert ? sum : edit.payload.SUM}
      />
    </>
  );
}
