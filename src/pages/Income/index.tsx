import { useContext, useEffect, useState } from "react";
import ContentLayOut from "../../layouts/ContentLayOut";
import ModalCommon from "../../common/Modal";
import TextInput from "../../common/TextInput";
import { IncomeContext } from "../../contexts/IncomeContext";
import GetIncomeResponse from "../../Models/Response/GetIncomeResponse";
import { convertDateToThaiV2 } from "../../common/DateFormat";
import GetIncomeRequest from "../../Models/Request/GetIncomeRequest";
import incomeServices from "../../services/IncomeServices";
import {
  AlertError,
  AlertSuccess,
  AlertWarning,
} from "../../common/ToastrCommon";
import { AppContext } from "../../contexts";
import GetFundResponse from "../../Models/Response/GetFundResponse";
import fundServices from "../../services/FundServices";
import GetFundRequest from "../../Models/Request/GetFundRequest";
import SelectChoice from "../../common/Select";
import MajorResponse from "../../Models/Response/GetMajorResponse";
import MajorServices from "../../services/MajorService";
import TableCommon from "../../common/Table";
import initTable, { destroyTable } from "../../common/DataTable";

export default function IncomePage() {
  const { isEdit, isDelete, setIsLoading } = useContext(AppContext);
  const [incomeList, setIncomeList] = useState<GetIncomeResponse[]>([]);
  const [fundList, setFundList] = useState<GetFundResponse[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");
  const [funds, setFunds] = useState<string>("");
  const [updateIdFund, setUpdateIdFund] = useState<string>("");
  const [fetchMajor, setFetchMajor] = useState<MajorResponse[]>([]);
  const [isExcept, setIsExcept] = useState<boolean>(false);

  let fundTotal = 0;
  let incomeTotal = 0;
  let outcomeTotal = 0;
  const {
    date,
    setDate,
    listName,
    setListName,
    revenue,
    setRevenue,
    expense,
    setExpense,
    note,
    setNote,
    isShowModal,
    clearInputValue,
    major,
    setMajor,
  } = useContext(IncomeContext);

  const incomeTableHeaders = [
    "timestamp",
    "รายการ",
    "สาขา",
    "รายจ่าย(บาท)",
    "รายรับ(บาท)",
    "หมายเหตุ",
    "แก้ไข",
    "ลบ",
  ];

  const fundTableHeaders = ["วันที่", "รายจ่าย(บาท)", "แก้ไข", "ลบ"];

  const openModalIncomeUpdate = (id: string) => () => {
    ($("#insert-modal") as any).modal("show");

    setIsUpdate(true);
    setIsLoading(true);

    incomeServices
      .findIncome(id)
      .then((res: any) => {
        const data = res.data;

        setUpdateId(data.ID);
        setDate(data.DATE);
        setListName(data.LIST_NAME);
        setRevenue(data.REVENUE);
        setExpense(data.EXPENSE);
        setNote(data.NOTE);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);

        AlertError(err);
        setIsLoading(false);
      });
  };

  const openModalFundUpdate = (id: string) => () => {
    ($("#want-money-update") as any).modal("show");

    setIsUpdate(true);
    setIsLoading(true);
    fundServices
      .findFund(id)
      .then((res: any) => {
        const data = res.data;
        setFunds(data.MONEY);
        setUpdateIdFund(data.ID);
        setIsLoading(false);
      })
      .catch((err: any) => {
        AlertError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    incomeServices.getAll().then((res) => {
      destroyTable("#income-table");
      setIncomeList(res.data);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#income-table"),
        100
      );
    });
    fundServices.getAll().then((res) => {
      destroyTable("#fund-table");
      setFundList(res.data);
      setTimeout(
        () => initTable(res.data.length.toString() ?? "0", "#fund-table"),
        100
      );
      setIsLoading(false);
    });
  }, [setIncomeList, setFundList]);

  const insertFund = () => {
    setIsLoading(true);

    const payload: GetFundRequest = {
      money: funds,
    };

    fundServices
      .InsertFundList(payload)
      .then((res: any) => {
        AlertSuccess(res.data.message);

        fundServices
          .getAll()
          .then((res: any) => {
            setFundList(res.data);
            clearInputValue();
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      })
      .catch((err: any) => {
        AlertError(err);
        setIsLoading(false);
      });
  };

  const updateFund = (id: string) => () => {
    const payload: GetFundRequest = {
      money: funds,
    };
    setIsLoading(true);
    fundServices
      .updateFundList(id, payload)
      .then((res: any) => {
        AlertSuccess(res.data.message);
        setIsUpdate(false);
        clearInputValue();
        fundServices
          .getAll()
          .then((res: any) => {
            setFundList(res.data);
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      })
      .catch((err: any) => {
        AlertError(err.message);
        fundServices
          .getAll()
          .then((res: any) => {
            setFundList(res.data);
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      });
  };

  const deleteFund = (id: string) => () => {
    const choice = prompt('พิมพ์ว่า "ยืนยัน" เพื่อยืนยันการลบข้อมูล');
    if (choice !== "ยืนยัน") return;
    setIsLoading(true);
    fundServices
      .DeleteFundList(id)
      .then((res: any) => {
        fundServices
          .getAll()
          .then((res: any) => {
            setFundList(res.data);
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      })
      .catch((err: any) => {
        AlertSuccess("ลบสำเร็จ");
        fundServices
          .getAll()
          .then((res: any) => {
            setFundList(res.data);
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      });
  };

  const insertHandler = () => {
    const payload: GetIncomeRequest = {
      DATE: date,
      LIST_NAME: listName,
      REVENUE: revenue,
      EXPENSE: expense,
      NOTE: note,
      MAJOR: major,
      IS_EXCEPT: isExcept,
    };
    if (
      date !== "" &&
      listName !== "" &&
      revenue !== "" &&
      expense !== "" &&
      major !== ""
    ) {
      setIsLoading(true);

      incomeServices
        .InsertIncomeList(payload)
        .then((res: any) => {
          AlertSuccess(res.data.message);

          incomeServices
            .getAll()
            .then((res: any) => {
              setIncomeList(res.data);
              clearInputValue();
              setIsLoading(false);
            })
            .catch((err: any) => {
              AlertError(err);
              setIsLoading(false);
            });
        })
        .catch((err: any) => {
          AlertError(err);
        });
    } else {
      AlertWarning("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const updateHandler = (id: string) => () => {
    const payload: GetIncomeRequest = {
      DATE: date,
      LIST_NAME: listName,
      REVENUE: revenue,
      EXPENSE: expense,
      NOTE: note,
      MAJOR: major,
      IS_EXCEPT: isExcept,
    };
    setIsLoading(true);

    incomeServices
      .updateIncomeList(id, payload)
      .then((res: any) => {
        AlertSuccess(res.data.message);
        incomeServices
          .getAll()
          .then((res: any) => {
            setIncomeList(res.data);
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      })
      .catch((err: any) => {
        AlertError(err.message);
        incomeServices
          .getAll()
          .then((res: any) => {
            setIncomeList(res.data);
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      });
  };

  const deleteHandler = (id: string) => () => {
    const choice = prompt('พิมพ์ว่า "ยืนยัน" เพื่อยืนยันการลบข้อมูล');
    if (choice !== "ยืนยัน") return;
    setIsLoading(true);
    incomeServices
      .DeleteIncomeList(id)
      .then((res: any) => {
        AlertSuccess(res.data.message);
        incomeServices
          .getAll()
          .then((res: any) => {
            setIncomeList(res.data);
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      })
      .catch((err: any) => {
        AlertError(err.message);
        incomeServices
          .getAll()
          .then((res: any) => {
            setIncomeList(res.data);
            setIsLoading(false);
          })
          .catch((err: any) => {
            AlertError(err);
            setIsLoading(false);
          });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    MajorServices.getMajors()
      .then((res) => {
        const data = res.data;
        setFetchMajor(data);
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  }, [setFetchMajor]);

  return (
    <ContentLayOut
      title={"รายรับ-รายจ่าย"}
      topic={"รายรับ-รายจ่าย"}
      btnHeader={
        <button
          onClick={() => {
            setIsUpdate(false);
            clearInputValue();
          }}
          className="btn primary-btn text-white float-right"
          data-toggle="modal"
          data-target="#insert-modal"
          data-dismiss={isShowModal && `modal`}
        >
          เพิ่มรายการ
        </button>
      }
      page={
        <>
          <ModalCommon
            title={isUpdate ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
            id={"insert-modal"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
                    <TextInput
                      label={"วันที่:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setDate}
                      type={"date"}
                      value={date}
                    />
                    <SelectChoice
                      topic="เลือกสาขา"
                      setValue={setMajor}
                      icon="far fa-calendar-alt"
                      label={"สาขา:"}
                      value={major}
                      options={fetchMajor.map((item) => item.NAME)}
                    />
                    <TextInput
                      label={"ชื่อรายการ:"}
                      icon={"far fa-list-alt"}
                      setValue={setListName}
                      type={"text"}
                      value={listName}
                    />
                    <TextInput
                      label={"รายจ่าย:"}
                      icon={"fas fa-money-bill-wave"}
                      setValue={setRevenue}
                      type={"number"}
                      value={revenue}
                    />
                    <TextInput
                      label={"รายรับ:"}
                      icon={"fas fa-money-bill-wave"}
                      setValue={setExpense}
                      type={"number"}
                      value={expense}
                    />
                    <TextInput
                      label={"หมายเหตุ:"}
                      icon={"far fa-comments"}
                      setValue={setNote}
                      type={"text"}
                      value={note}
                    />
                    <div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="get_money"
                          onChange={() => setIsExcept(!isExcept)}
                          value={isExcept ? "true" : "false"}
                        />
                        <label className="form-check-label" htmlFor="get_money">
                          ติ๊กเพื่อดึงเงินออก (จะไม่รวมสถิติ รายรับ - รายจ่าย)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {isUpdate ? (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss="modal"
                      onClick={updateHandler(updateId)}
                    >
                      อัพเดต
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss="modal"
                      onClick={insertHandler}
                    >
                      บันทึก
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-danger col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                  >
                    ยกเลิก
                  </button>
                </div>
              </>
            }
          />
          <div className="card-body">
            <div
              className="tablecommon-responsive"
              style={{
                overflowX: "auto",
                scrollbarGutter: "stable",
              }}
            >
              <TableCommon
                id="income-table"
                columns={incomeTableHeaders}
                row={incomeList.map((item) => {
                  incomeTotal += Number(item.EXPENSE);
                  outcomeTotal += Number(item.REVENUE);

                  return (
                    <tr key={item.ID} className="text-center">
                      <td>
                        <span className="d-none">{item.CREATED_AT}</span>
                        {convertDateToThaiV2(new Date(item.CREATED_AT))}
                      </td>
                      <td>{item.LIST_NAME}</td>
                      <td>{item.MAJOR}</td>
                      <td>{Number(item.REVENUE).toLocaleString()}</td>
                      <td>{Number(item.EXPENSE).toLocaleString()}</td>
                      <td>{item.NOTE}</td>
                      <td>
                        {isEdit() ? (
                          <button
                            className="btn btn-warning mx-2"
                            onClick={openModalIncomeUpdate(item.ID)}
                          >
                            <i className="nav-icon fas fa-pen" />
                          </button>
                        ) : (
                          "ไม่มีสิทธิ"
                        )}
                      </td>
                      <td>
                        {isDelete() ? (
                          <button
                            className="btn btn-danger"
                            onClick={deleteHandler(item.ID)}
                          >
                            <i className="nav-icon fas fa-trash" />
                          </button>
                        ) : (
                          "ไม่มีสิทธิ"
                        )}
                      </td>
                    </tr>
                  );
                })}
                foot={
                  <tr className="text-center">
                    <td colSpan={3}>รวม</td>
                    <td>{outcomeTotal.toLocaleString()} บาท</td>
                    <td>{incomeTotal.toLocaleString()} บาท</td>
                    <td colSpan={3}></td>
                  </tr>
                }
              />
            </div>
          </div>
        </>
      }
      topicFunds={"ทุน"}
      btnHeaderFunds={
        <button
          className="btn primary-btn text-white float-right"
          data-toggle="modal"
          data-target="#want-money"
        >
          เพิ่มรายการ
        </button>
      }
      pageFunds={
        <>
          <ModalCommon
            title={"เพิ่มทุน"}
            id={"want-money"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
                    <TextInput
                      label={"ทุน"}
                      setValue={setFunds}
                      type={"number"}
                      icon={"fa fa-money-bill"}
                      value={funds}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn primary-btn col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                    onClick={insertFund}
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                  >
                    ยกเลิก
                  </button>
                </div>
              </>
            }
          />
          <ModalCommon
            title={"แก้ไขทุน"}
            id={"want-money-update"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
                    <TextInput
                      label={"ทุน"}
                      setValue={setFunds}
                      type={"number"}
                      icon={"fa fa-money-bill"}
                      value={funds}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn primary-btn col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                    onClick={updateFund(updateIdFund)}
                  >
                    อัพเดต
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger col-lg-2 col-sm-auto"
                    data-dismiss="modal"
                  >
                    ยกเลิก
                  </button>
                </div>
              </>
            }
          />
          <div className="card-body">
            <TableCommon
              id="fund-table"
              columns={fundTableHeaders}
              row={fundList.map((item) => {
                fundTotal += Number(item.MONEY);
                return (
                  <tr key={item.ID} className="text-center">
                    <td>
                      <span className="d-none">{item.DATE}</span>
                      {convertDateToThaiV2(new Date(item.DATE))}
                    </td>
                    <td>{Number(item.MONEY).toLocaleString()}</td>
                    <td>
                      {isEdit() ? (
                        <button
                          className="btn btn-warning mx-2"
                          onClick={openModalFundUpdate(item.ID)}
                        >
                          <i className="nav-icon fas fa-pen" />
                        </button>
                      ) : (
                        "ไม่มีสิทธิ"
                      )}
                    </td>
                    <td>
                      {isDelete() ? (
                        <button
                          className="btn btn-danger"
                          onClick={deleteFund(item.ID)}
                        >
                          <i className="nav-icon fas fa-trash" />
                        </button>
                      ) : (
                        "ไม่มีสิทธิ"
                      )}
                    </td>
                  </tr>
                );
              })}
              foot={
                <tr className="text-center">
                  <td colSpan={1}>รวม</td>
                  <td>{fundTotal.toLocaleString()} บาท</td>
                  <td colSpan={2}></td>
                </tr>
              }
            />
          </div>
        </>
      }
    />
  );
}
