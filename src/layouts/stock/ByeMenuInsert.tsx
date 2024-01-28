import { useContext, useEffect, useState } from "react";
import TextInput from "../../common/TextInput";
import { StockContext } from "../../contexts/StockContext";
import { MenuByeEnum } from "../../enum/menuInsert.enum";
import StockService from "../../services/StockServices";

interface ByeMenuInsertProps {
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

export default function ByeMenuInsert({
  id,
  setEdit,
  edit,
}: ByeMenuInsertProps) {
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
  } = useContext(StockContext);
  const [isInsert, setIsInsert] = useState(false);

  useEffect(() => {
    const major = sessionStorage.getItem("majorEdit");
    if (major) {
      StockService.GetFindStockById(id, major, "ซื้อ").then((res) => {
        setEdit({
          stockType: "ซื้อ",
          major: major,
          payload: res.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    setIsInsert(Number(id) === 0);
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      {!isInsert && (
        <TextInput
          label={MenuByeEnum.DATE}
          icon={"fas fa-calendar"}
          setValue={(e: any) =>
            setEdit({
              major: edit.major,
              stockType: edit.stockType,
              payload: {
                ...edit.payload,
                DATE: e,
              },
            })
          }
          type={"date"}
          placeholder={"วันที่ขาย"}
          value={String(edit.payload.DATE).split(" ")[0]}
        />
      )}
      <TextInput
        label={MenuByeEnum.SERIAL_NUMBER}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          isInsert
            ? setSerialNumber(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  SERIAL_NUMBER: e,
                },
              })
        }
        type={"text"}
        placeholder={"Serial Number"}
        value={isInsert ? serialNumber : edit.payload.SERIAL_NUMBER}
      />
      <TextInput
        label={MenuByeEnum.VERSION}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          isInsert
            ? setVersion(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  VERSION: e,
                },
              })
        }
        type={"text"}
        placeholder={"รุ่น"}
        value={isInsert ? version : edit.payload.VERSION}
      />
      <TextInput
        label={MenuByeEnum.PRICE}
        type={"number"}
        icon={"fas fa-money-bill"}
        setValue={(e) =>
          isInsert
            ? setPrice(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  PRICE: e,
                },
              })
        }
        min={0}
        placeholder={"ราคา"}
        value={isInsert ? price : edit.payload.PRICE}
      />
      <TextInput
        label={MenuByeEnum.IMEI}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          isInsert
            ? setImei(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  IMEI: e,
                },
              })
        }
        type={"text"}
        placeholder={"imei เครื่อง"}
        maxLength={15}
        value={isInsert ? imei : edit.payload.IMEI}
      />
      <TextInput
        label={MenuByeEnum.SOURCE}
        icon={"fas fa-map-marker-alt"}
        setValue={(e) =>
          isInsert
            ? setSource(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  SOURCE: e,
                },
              })
        }
        type={"text"}
        placeholder={"แหล่งที่มา"}
        value={isInsert ? source : edit.payload.SOURCE}
      />
      <TextInput
        label={MenuByeEnum.BATTERY}
        icon={"fas fa-battery-full"}
        setValue={(e) =>
          isInsert
            ? setBattery(e)
            : setEdit({
                major: edit.major,
                stockType: edit.stockType,
                payload: {
                  ...edit.payload,
                  BATTERY: e,
                },
              })
        }
        type={"text"}
        placeholder={"แบตเตอรี่"}
        value={isInsert ? battery : edit.payload.BATTERY}
      />
    </>
  );
}
