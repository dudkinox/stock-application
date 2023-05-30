import { useState } from "react";
import TextInput from "../../common/TextInput";
import { MenuNewInstallmentEnum } from "../../enum/menuInsert.enum";

export default function MenuNewInstallmentInsert() {
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [starMoney, setStarMoney] = useState<string>("");
  const [installmentMonth, setInstallmentMonth] = useState<string>("");
  const [numberInstallment, setNumberInstallment] = useState<string>("");
  const [payment, setPayment] = useState<string>("");
  const [datePayment, setDatePayment] = useState<string>("");

  return (
    <>
      <TextInput
        label={MenuNewInstallmentEnum.TOTAL_PRICE}
        icon={"fas fa-mobile"}
        setValue={setTotalPrice}
        type={"text"}
        placeholder={"ราคาเต็ม"}
        value={totalPrice}
      />
      <TextInput
        label={MenuNewInstallmentEnum.STAR_MONEY}
        icon={"fas fa-mobile"}
        setValue={setStarMoney}
        type={"text"}
        placeholder={"เงินดาวน์"}
        value={starMoney}
      />
      <TextInput
        label={MenuNewInstallmentEnum.INSTALLMENT_MONTH}
        icon={"fas fa-mobile"}
        setValue={setInstallmentMonth}
        type={"text"}
        placeholder={"ต้องผ่อนต่อเดือน"}
        value={installmentMonth}
      />
      <TextInput
        label={MenuNewInstallmentEnum.NUMBER_INSTALLMENT}
        icon={"fas fa-mobile"}
        setValue={setNumberInstallment}
        type={"text"}
        placeholder={"จำนวนงวดที่ผ่อนแล้ว"}
        value={numberInstallment}
      />
      <TextInput
        label={MenuNewInstallmentEnum.PAYMENT}
        icon={"fas fa-mobile"}
        setValue={setPayment}
        type={"text"}
        placeholder={"ยอดชำระปัจจุบัน"}
        value={payment}
      />
      <TextInput
        label={MenuNewInstallmentEnum.DATE_PAYMENT}
        icon={"fas fa-mobile"}
        setValue={setDatePayment}
        type={"text"}
        placeholder={"วันที่ต้องชำระ"}
        value={datePayment}
      />
    </>
  );
}
