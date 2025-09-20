import { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";
import HeaderPageCommon from "../../common/HeaderPageCommon";
import initTable, { destroyTable } from "../../common/DataTable";
import { useNavigate } from "react-router-dom";
import { StockContext } from "../../contexts/StockContext";
import { convertDateToThaiV2 } from "../../common/DateFormat";
import TextInput from "../../common/TextInput";

export function StockKayPage() {
  const { majorUser, setIsLoading, deleteStock, isEdit, isDelete } =
    useContext(AppContext);
  const {
    setMajorInsert,
    setImei,
    setVersion,
    setStockID,
    setUpdateKey: setUpdateKay,
  } = useContext(StockContext);
  const [stock, setStock] = useState<any[]>([]);
  const [buyList, setBuyList] = useState<any[]>([]);
  const [createAtStart, setCreateAtStart] = useState<string>("");
  const [createAtEnd, setCreateAtEnd] = useState<string>("");
  const [filterDateStart, setFilterDateStart] = useState<string>("");
  const [filterDateEnd, setFilterDateEnd] = useState<string>("");
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [totalStarMoney, setTotalStarMoney] = useState<number>(0);
  const navigate = useNavigate();

  const stockTableHeaders = [
    "timestamp",
    "เลือก",
    "รหัสเอกสาร",
    "สาขา",
    "วันที่ขาย",
    "ชื่อลูกค้า",
    "เบอร์โทร",
    "รุ่น",
    "imei",
    "เงินดาว",
    "ผ่อนกี่เดือน",
    "ผ่อนเดือนละ",
    "จ่ายทุกวันที่",
    "แก้ไข / ลบ",
  ];

  const selectAll = () => {
    const checkBoxes = document.getElementsByClassName(
      "row-check"
    ) as HTMLCollectionOf<HTMLInputElement>;
    const mainCheckBox = document.getElementById(
      "flexCheckDefault"
    ) as HTMLInputElement;

    for (const element of checkBoxes) {
      element.checked = mainCheckBox.checked;
    }

    updateTotalProfitFromSelection();
  };

  function blogSelectCal() {
    return (
      <div className="form-check" onClick={selectAll}>
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          style={{ cursor: "pointer" }}
        />
        <label
          className="form-check-label"
          htmlFor="flexCheckDefault"
          style={{ cursor: "pointer" }}
        >
          ติ๊กเพื่อเลือกทั้งหมด
        </label>
      </div>
    );
  }

  const stockTableHeadersAdmin = [
    "timestamp",
    blogSelectCal(),
    "รหัสเอกสาร",
    "สาขา",
    "วันที่ขาย",
    "กำไร",
    "ชื่อลูกค้า",
    "เบอร์โทร",
    "รุ่น",
    "imei",
    "เงินดาว",
    "ผ่อนกี่เดือน",
    "ผ่อนเดือนละ",
    "จ่ายทุกวันที่",
    "แก้ไข / ลบ",
  ];

  const stockBuyListTableHeaders = [
    "timestamp",
    "รหัสเอกสาร",
    "สาขา",
    "Serial Number",
    "รุ่น",
    "imei",
    "แหล่งที่มา",
    "Battery",
    "ขาย",
    "แก้ไข / ลบ",
  ];

  const handlerKay = (
    id: string,
    majorInsert: string,
    version: string,
    imei: string
  ) => {
    setMajorInsert(majorInsert);
    setVersion(version);
    setImei(imei);
    setStockID(id);
    setUpdateKay(false);
    navigate(`/stock/add?type=kay`, { state: { id } });
  };

  const handleResetFilter = () => {
    setCreateAtStart("");
    setCreateAtEnd("");
    setFilterDateStart("");
    setFilterDateEnd("");
    StockService.GetStockKay(majorUser).then((res) => {
      destroyTable("#kay-table");
      setStock(res.data);
      setTotalProfit(0);
      setTotalStarMoney(0);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#kay-table"),
        100
      );
    });
  };

  const handleFilter = () => {
    setIsLoading(true);
    StockService.GetStockKay(
      majorUser,
      createAtStart,
      createAtEnd,
      filterDateStart,
      filterDateEnd
    ).then((res) => {
      destroyTable("#kay-table");
      setStock(res.data);
      setTotalProfit(0);
      setTotalStarMoney(0);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#kay-table"),
        100
      );
      setIsLoading(false);
    });
  };

  const updateTotalProfitFromSelection = () => {
    setTotalProfit(calProfitBySelected());
    setTotalStarMoney(calStarMoneyBySelected());
  };

  const calProfitBySelected = () => {
    const checkBoxes = document.getElementsByClassName(
      "row-check"
    ) as HTMLCollectionOf<HTMLInputElement>;
    let total = 0;

    for (const element of checkBoxes) {
      if (element.checked) {
        const id = element.id.replace("row-", "");
        const item = stock.find((s) => s.ID === id);
        const profit =
          Number(item.MONTH) * Number(item.INSTALLMENT) +
          Number(item.STAR_MONEY) -
          Number(item.COST);
        total += profit;
      }
    }

    return total;
  };

  const calStarMoneyBySelected = () => {
    const checkBoxes = document.getElementsByClassName(
      "row-check"
    ) as HTMLCollectionOf<HTMLInputElement>;
    let total = 0;

    for (const element of checkBoxes) {
      if (element.checked) {
        const id = element.id.replace("row-", "");
        const item = stock.find((s) => s.ID === id);
        total += Number(item.STAR_MONEY);
      }
    }

    return total;
  };

  useEffect(() => {
    setIsLoading(true);
    StockService.GetStockKay(majorUser).then((res) => {
      destroyTable("#kay-table");
      setStock(res.data);
      setTotalProfit(0);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#kay-table"),
        100
      );
    });
    StockService.GetStockBye(majorUser).then((res) => {
      destroyTable("#buy-table");
      setBuyList(res.data);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#buy-table"),
        100
      );
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="content-wrapper">
      <HeaderPageCommon title={"stock"} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-12">
              <div className="card-header">
                <h2 className="card-title">{"เครื่องที่มีในคลัง"}</h2>
              </div>

              <div className="card-body">
                <TableCommon
                  id="buy-table"
                  columns={stockBuyListTableHeaders}
                  row={buyList.map((item) =>
                    item.STATUS === "0" ? (
                      <tr key={item.ID} className="text-center">
                        <td>
                          <span className="d-none">{item.CREATED_AT}</span>
                          {convertDateToThaiV2(new Date(item.CREATED_AT))}
                        </td>
                        <td>{`${item.CODE}-${item.ID}`}</td>
                        <td>{item.MAJOR}</td>
                        <td>{item.SERIAL_NUMBER}</td>
                        <td>{item.VERSION}</td>
                        <td>{item.IMEI}</td>
                        <td>{item.SOURCE}</td>
                        <td>{item.BATTERY}</td>
                        <td>
                          <button
                            type="button"
                            className="btn primary-btn"
                            onClick={() =>
                              handlerKay(
                                item.ID,
                                item.MAJOR,
                                item.VERSION,
                                item.IMEI
                              )
                            }
                          >
                            ขาย
                          </button>
                        </td>
                        <td>
                          {isEdit() ? (
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => {
                                sessionStorage.setItem("majorEdit", item.MAJOR);
                                setUpdateKay(true);
                                navigate(`/stock/add?type=bye&id=${item.ID}`);
                              }}
                            >
                              แก้ไข
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-warning disabled"
                            >
                              แก้ไข
                            </button>
                          )}
                          &emsp;
                          {isDelete() ? (
                            <button
                              type="button"
                              className="btn my-3 btn-danger"
                              onClick={deleteStock(item.ID, item.MAJOR)}
                            >
                              ลบ
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn my-3 btn-danger disabled"
                            >
                              ลบ
                            </button>
                          )}
                        </td>
                      </tr>
                    ) : (
                      <></>
                    )
                  )}
                />
              </div>
            </div>
            <div className="card col-12">
              <div className="card-header">
                <h2 className="card-title">{"ขายไปแล้ว"}</h2>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row text-center">
                    <div className="col-sm-5">
                      <TextInput
                        label={"Filter timestamp เริ่ม"}
                        setValue={setCreateAtStart}
                        type={"date"}
                        icon={"far fa-calendar-alt"}
                        value={createAtStart}
                      />
                    </div>
                    <div className="col-sm-5">
                      <TextInput
                        label={"Filter timestamp สิ้นสุด"}
                        setValue={setCreateAtEnd}
                        type={"date"}
                        icon={"far fa-calendar-alt"}
                        value={createAtEnd}
                      />
                    </div>
                    <div className="col-sm-2">
                      <br />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={handleFilter}
                      >
                        ค้นหา
                      </button>
                    </div>
                    <div className="col-sm-5">
                      <TextInput
                        label={"Filter วันที่ขายเริ่มต้น"}
                        setValue={setFilterDateStart}
                        type={"date"}
                        icon={"far fa-calendar-alt"}
                        value={filterDateStart}
                      />
                    </div>
                    <div className="col-sm-5">
                      <TextInput
                        label={"Filter วันที่ขายสิ้นสุด"}
                        setValue={setFilterDateEnd}
                        type={"date"}
                        icon={"far fa-calendar-alt"}
                        value={filterDateEnd}
                      />
                    </div>
                    <div className="col-sm-2">
                      <br />
                      <button
                        className="btn btn-warning mt-2"
                        onClick={handleResetFilter}
                      >
                        ล้างค่า
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <TableCommon
                  id="kay-table"
                  columns={
                    majorUser.toLocaleLowerCase() === "admin"
                      ? stockTableHeadersAdmin
                      : stockTableHeaders
                  }
                  row={stock.map((item) => {
                    const profit =
                      Number(item.MONTH) * Number(item.INSTALLMENT) +
                      Number(item.STAR_MONEY) -
                      Number(item.COST);

                    return (
                      <tr key={item.ID} className="text-center">
                        <td>
                          {convertDateToThaiV2(new Date(item.CREATED_AT))}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const checkBox = document.getElementById(
                              `row-${item.ID}`
                            ) as HTMLInputElement;

                            checkBox.checked = !checkBox.checked;
                            updateTotalProfitFromSelection();
                          }}
                        >
                          <input
                            type="checkbox"
                            className="row-check"
                            id={`row-${item.ID}`}
                            onClick={(e) => e.stopPropagation()}
                            onChange={updateTotalProfitFromSelection}
                          />
                        </td>
                        <td>{`${item.CODE}-${item.ID}`}</td>
                        <td>{item.MAJOR}</td>
                        <td>
                          {convertDateToThaiV2(new Date(item.DATE_PAYMENT))}
                        </td>
                        {majorUser.toLocaleLowerCase() === "admin" && (
                          <td>
                            <p className="badge badge-success mx-1">
                              {profit.toLocaleString()} บาท
                            </p>
                          </td>
                        )}
                        <td>{item.CUSTOMER}</td>
                        <td>{item.TEL}</td>
                        <td>{item.VERSION}</td>
                        <td>{item.IMEI}</td>
                        <td>{Number(item.STAR_MONEY).toLocaleString()}</td>
                        <td>{item.MONTH}</td>
                        <td>{Number(item.INSTALLMENT).toLocaleString()}</td>
                        <td>{new Date(item.DATE_PAYMENT).getDate()}</td>
                        <td>
                          {isEdit() ? (
                            <button
                              type="button"
                              className="btn btn-warning"
                              onClick={() => {
                                sessionStorage.setItem("majorEdit", item.MAJOR);
                                navigate(`/stock/add?type=kay`, {
                                  state: { id: item.ID },
                                });
                                setUpdateKay(true);
                              }}
                            >
                              แก้ไข
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-warning disabled"
                            >
                              แก้ไข
                            </button>
                          )}
                          &emsp;
                          {isDelete() ? (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={deleteStock(item.ID, item.MAJOR)}
                            >
                              ลบ
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger disabled"
                            >
                              ลบ
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  foot={
                    <tr className="text-center">
                      <td colSpan={5}>รวม</td>
                      <td>{totalProfit.toLocaleString()} บาท</td>
                      <td colSpan={4}></td>
                      <td>{totalStarMoney.toLocaleString()} บาท</td>
                      <td colSpan={4}></td>
                    </tr>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
