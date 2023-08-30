import { useContext, useEffect, useState } from "react";
import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import StockService from "../../services/StockServices";
import { AppContext } from "../../contexts";
import HeaderPageCommon from "../../common/HeaderPageCommon";
import initTable, { destroyTable } from "../../common/DataTable";
import { useNavigate } from "react-router-dom";
import { StockContext } from "../../contexts/StockContext";

export function StockKayPage() {
  const { majorUser, setIsLoading } = useContext(AppContext);
  const {
    setKayMenuInsert,
    setByeMenuInsert,
    setIsMenuInsert,
    setNewInstallmentMenuInsert,
  } = useContext(StockContext);
  const [stock, setStock] = useState<any[]>([]);
  const [buyList, setBuyList] = useState<any[]>([]);
  const navigate = useNavigate();

  const stockTableHeaders = [
    "เลขบัตรประชาชน / ชื่อลูกค้า",
    "สาขา",
    "ชื่อลูกค้า",
    "เบอร์โทร",
    "รุ่น",
    "imei",
    "เงินดาว",
    "ผ่อนกี่เดือน",
    "ผ่อนเดือนละ",
    "จ่ายทุกวันที่",
  ];

  const stockBuyListTableHeaders = [
    "รหัสเอกสาร",
    "สาขา",
    "Serial Number",
    "รุ่น",
    "imei",
    "แหล่งที่มา",
    "Battery",
    "สถานะ",
    "ขาย",
  ];

  const handlerKay = (id: string) => {
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
    <>
      <div className="content-wrapper">
        <HeaderPageCommon title={"stock"} />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="card col-12">
                <div className="card-header">
                  <h2 className="card-title">{"เครื่องที่มีในคลัง"}</h2>
                </div>
                <>
                  <div className="card-body">
                    <TableCommon
                      columns={stockBuyListTableHeaders}
                      row={buyList.map((item, i) => (
                        <tr key={i} className="text-center">
                          <td>{item.ID}</td>
                          <td>{item.MAJOR}</td>
                          <td>{item.SERIAL_NUMBER}</td>
                          <td>{item.VERSION}</td>
                          <td>{item.IMEI}</td>
                          <td>{item.SOURCE}</td>
                          <td>{item.BATTERY}</td>
                          <td>{item.STATUS}</td>
                          <td>
                            <button
                              type="button"
                              className="btn primary-btn"
                              onClick={() => handlerKay(item.ID)}
                            >
                              ขาย
                            </button>
                          </td>
                        </tr>
                      ))}
                    />
                  </div>
                </>
              </div>
              <div className="card col-12">
                <div className="card-header">
                  <h2 className="card-title">{"ขายไปแล้ว"}</h2>
                </div>
                <>
                  <div className="card-body">
                    <TableCommon
                      id="kay-table"
                      columns={stockTableHeaders}
                      row={stock.map((item, i) => (
                        <tr key={i} className="text-center">
                          <td>{item.ID}</td>
                          <td>{item.MAJOR}</td>
                          <td>{item.CUSTOMER}</td>
                          <td>{item.TEL}</td>
                          <td>{item.VERSION}</td>
                          <td>{item.IMEI}</td>
                          <td>{item.STAR_MONEY}</td>
                          <td>{item.MONTH}</td>
                          <td>{item.INSTALLMENT}</td>
                          <td>{item.DATE_PAYMENT}</td>
                        </tr>
                      ))}
                    />
                  </div>
                </>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
