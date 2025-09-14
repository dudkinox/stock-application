import { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";
import HeaderPageCommon from "../../common/HeaderPageCommon";
import initTable, { destroyTable } from "../../common/DataTable";
import { useNavigate } from "react-router-dom";
import { StockContext } from "../../contexts/StockContext";
import { convertDateToThaiV2 } from "../../common/DateFormat";

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
  const navigate = useNavigate();

  const stockTableHeaders = [
    "วันที่เพิ่มข้อมูล",
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

  const stockTableHeadersAdmin = [
    "วันที่เพิ่มข้อมูล",
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
    "วันที่เพิ่มข้อมูล",
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

  useEffect(() => {
    setIsLoading(true);
    StockService.GetStockKay(majorUser).then((res) => {
      destroyTable();
      setStock(res.data);
      setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
    });
    StockService.GetStockBye(majorUser).then((res) => {
      destroyTable();
      setBuyList(res.data);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#kay-table"),
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
                  columns={stockBuyListTableHeaders}
                  row={buyList.map((item, i) =>
                    item.STATUS === "0" ? (
                      <tr key={i} className="text-center">
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
                <TableCommon
                  id="kay-table"
                  columns={
                    majorUser.toLocaleLowerCase() === "admin"
                      ? stockTableHeadersAdmin
                      : stockTableHeaders
                  }
                  row={stock.map((item, i) => {
                    const profit =
                      Number(item.MONTH) * Number(item.INSTALLMENT) +
                      Number(item.STAR_MONEY) -
                      Number(item.COST);
                    return (
                      <tr key={i} className="text-center">
                        <td>
                          {convertDateToThaiV2(new Date(item.CREATED_AT))}
                        </td>
                        <td>{`${item.CODE}-${item.ID}`}</td>
                        <td>{item.MAJOR}</td>
                        <td>{convertDateToThaiV2(new Date(item.DATE))}</td>
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
                        <td>{item.DATE_PAYMENT}</td>
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
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
