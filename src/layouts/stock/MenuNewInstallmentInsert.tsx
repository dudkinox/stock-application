import { useContext, useState } from "react";
import TextInput from "../../common/TextInput";
import { MenuNewInstallmentEnum } from "../../enum/menuInsert.enum";
import { StockContext } from "../../contexts/StockContext";
import SelectChoice from "../../common/Select";
import React from "react";

export default function MenuNewInstallmentInsert() {
  const {
    installmentMonth,
    setInstallmentMonth,
    numberInstallment,
    setNumberInstallment,
    payment,
    setPayment,
    newDatePayment,
    setNewDatePayment,
    newPriceTotal,
    setNewPriceTotal,
    newStarMoney,
    setNewStarMoney,
  } = useContext(StockContext);

  return (
    <>
      <TextInput
        label={MenuNewInstallmentEnum.TOTAL_PRICE}
        icon={"fas fa-mobile"}
        setValue={setNewPriceTotal}
        type={"number"}
        placeholder={"ราคาเต็ม"}
        value={newPriceTotal}
      />
      <TextInput
        label={MenuNewInstallmentEnum.STAR_MONEY}
        icon={"fas fa-mobile"}
        setValue={setNewStarMoney}
        type={"number"}
        placeholder={"เงินดาวน์"}
        value={newStarMoney}
      />
      <TextInput
        label={MenuNewInstallmentEnum.INSTALLMENT_MONTH}
        icon={"fas fa-mobile"}
        setValue={setInstallmentMonth}
        type={"number"}
        placeholder={"ต้องผ่อนต่อเดือน"}
        value={installmentMonth}
      />
      <TextInput
        label={MenuNewInstallmentEnum.NUMBER_INSTALLMENT}
        icon={"fas fa-mobile"}
        setValue={setNumberInstallment}
        type={"number"}
        placeholder={"จำนวนงวดที่ผ่อนแล้ว"}
        value={numberInstallment}
      />
      <TextInput
        label={MenuNewInstallmentEnum.PAYMENT}
        icon={"fas fa-mobile"}
        setValue={setPayment}
        type={"number"}
        placeholder={"ยอดชำระปัจจุบัน"}
        value={payment}
      />
      <SelectChoice
        topic="วันที่ต้องชำระ"
        setValue={setNewDatePayment}
        icon="far fa-calendar-alt"
        label={"วันที่ต้องชำระ:"}
        value={newDatePayment}
        options={Array.from({ length: 30 }, (_, i) => (i + 1).toString())}
      />
    </>
  );
}
