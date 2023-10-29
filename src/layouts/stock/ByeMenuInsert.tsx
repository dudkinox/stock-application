import { useContext, useEffect } from "react";
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

  return (
    <>
      <TextInput
        label={MenuByeEnum.SERIAL_NUMBER}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          setEdit({
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
        value={edit.payload.SERIAL_NUMBER}
      />
      <TextInput
        label={MenuByeEnum.VERSION}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          setEdit({
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
        value={edit.payload.VERSION}
      />
      <TextInput
        label={MenuByeEnum.PRICE}
        type={"number"}
        icon={"fas fa-money-bill"}
        setValue={(e) =>
          setEdit({
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
        value={edit.payload.PRICE}
      />
      <TextInput
        label={MenuByeEnum.IMEI}
        icon={"fas fa-mobile"}
        setValue={(e) =>
          setEdit({
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
        value={edit.payload.IMEI}
      />
      <TextInput
        label={MenuByeEnum.SOURCE}
        icon={"fas fa-map-marker-alt"}
        setValue={(e) =>
          setEdit({
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
        value={edit.payload.SOURCE}
      />
      <TextInput
        label={MenuByeEnum.BATTERY}
        icon={"fas fa-battery-full"}
        setValue={(e) =>
          setEdit({
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
        value={edit.payload.BATTERY}
      />
    </>
  );
}
