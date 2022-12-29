import { useContext } from "react";
import TextInput from "../../../common/TextInput";
import { StockContext } from "../../../contexts/StockContext";
import { MenuByeEnum } from "../../../enum/menuInsert.enum";

export default function ByeMenuInsert() {
  const { setVersion, setPrice, setImei, setSource, setBattery } =
    useContext(StockContext);
  return (
    <>
      <TextInput
        label={MenuByeEnum.VERSION}
        icon={"fas fa-mobile"}
        setValue={setVersion}
        type={"text"}
        placeholder={"รุ่น"}
      />
      <TextInput
        label={MenuByeEnum.PRICE}
        icon={"fas fa-money-bill"}
        setValue={setPrice}
        type={"text"}
        placeholder={"ราคา"}
      />
      <TextInput
        label={MenuByeEnum.IMEI}
        icon={"fas fa-mobile"}
        setValue={setImei}
        type={"text"}
        placeholder={"imei เครื่อง"}
      />
      <TextInput
        label={MenuByeEnum.SOURCE}
        icon={"fas fa-map-marker-alt"}
        setValue={setSource}
        type={"text"}
        placeholder={"แหล่งที่มา"}
      />
      <TextInput
        label={MenuByeEnum.BATTERY}
        icon={"fas fa-battery-full"}
        setValue={setBattery}
        type={"text"}
        placeholder={"แบตเตอรี่"}
      />
    </>
  );
}
