import TextInput from "../../../common/TextInput";
import { MenuEquipmentEnum } from "../../../enum/menuInsert.enum";
import { useContext } from "react";
import { StockContext } from "../../../contexts/StockContext";

export default function IsMenuInsert() {
  const {
    setCases,
    setFirm,
    setLen,
    setBigCharge,
    setCharge,
    setRepair,
    setSum,
  } = useContext(StockContext);

  return (
    <>
      <TextInput
        label={MenuEquipmentEnum.CASES}
        icon={"fas fa-mobile"}
        setValue={setCases}
        type={"number"}
        placeholder={"เคส"}
        minLength={0}
      />
      <TextInput
        label={MenuEquipmentEnum.FIRM}
        icon={"fas fa-mobile-alt"}
        setValue={setFirm}
        type={"number"}
        placeholder={"ฟิล์ม"}
        minLength={0}
      />
      <TextInput
        label={MenuEquipmentEnum.LEN}
        icon={"fas fa-camera"}
        setValue={setLen}
        type={"number"}
        placeholder={"กันเลนส์"}
        minLength={0}
      />
      <TextInput
        label={MenuEquipmentEnum.BIG_CHARGE}
        icon={"fas fa-charging-station"}
        setValue={setBigCharge}
        type={"number"}
        placeholder={"หัวชาร์จใหญ่"}
        minLength={0}
      />
      <TextInput
        label={MenuEquipmentEnum.CHARGE}
        icon={"fas fa-plug"}
        setValue={setCharge}
        type={"number"}
        placeholder={"สายชาร์จ"}
        minLength={0}
      />
      <TextInput
        label={MenuEquipmentEnum.REPAIR}
        icon={"fas fa-tools"}
        setValue={setRepair}
        type={"number"}
        placeholder={"ซ่อม"}
        minLength={0}
      />
      <TextInput
        label={MenuEquipmentEnum.SUM}
        icon={"fas fa-money-bill"}
        setValue={setSum}
        type={"number"}
        placeholder={"ราคา"}
        minLength={0}
      />
    </>
  );
}
