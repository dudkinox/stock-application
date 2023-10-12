import { useContext, useEffect } from "react";
import TextInput from "../../common/TextInput";
import { StockContext } from "../../contexts/StockContext";
import { MenuByeEnum } from "../../enum/menuInsert.enum";
import StockService from "../../services/StockServices";

interface ByeMenuInsertProps {
  id: string;
}

export default function ByeMenuInsert({ id }: ByeMenuInsertProps) {
  const {
    serialNumber,
    setSerialNumber,
    version,
    setVersion,
    price,
    setPrice,
    imei,
    setImei,
    source,
    setSource,
    battery,
    setBattery,
    setDate,
    setStockType,
  } = useContext(StockContext);

  return (
    <>
      <TextInput
        label={MenuByeEnum.SERIAL_NUMBER}
        icon={"fas fa-mobile"}
        setValue={setSerialNumber}
        type={"text"}
        placeholder={"Serial Number"}
        value={serialNumber}
      />
      <TextInput
        label={MenuByeEnum.VERSION}
        icon={"fas fa-mobile"}
        setValue={setVersion}
        type={"text"}
        placeholder={"รุ่น"}
        value={version}
      />
      <TextInput
        label={MenuByeEnum.PRICE}
        type={"number"}
        icon={"fas fa-money-bill"}
        setValue={setPrice}
        min={0}
        placeholder={"ราคา"}
        value={price}
      />
      <TextInput
        label={MenuByeEnum.IMEI}
        icon={"fas fa-mobile"}
        setValue={setImei}
        type={"text"}
        placeholder={"imei เครื่อง"}
        value={imei}
      />
      <TextInput
        label={MenuByeEnum.SOURCE}
        icon={"fas fa-map-marker-alt"}
        setValue={setSource}
        type={"text"}
        placeholder={"แหล่งที่มา"}
        value={source}
      />
      <TextInput
        label={MenuByeEnum.BATTERY}
        icon={"fas fa-battery-full"}
        setValue={setBattery}
        type={"text"}
        placeholder={"แบตเตอรี่"}
        value={battery}
      />
    </>
  );
}
