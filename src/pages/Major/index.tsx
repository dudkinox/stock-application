import { useContext, useEffect, useState } from "react";
import TextInput from "../../common/TextInput";
import MajorServices from "../../services/MajorService";
import { MajorRequest } from "../../Models/Request/MajorRequest";
import {
  AlertError,
  AlertSuccess,
  AlertWarning,
} from "../../common/ToastrCommon";
import MajorResponse from "../../Models/Response/GetMajorResponse";
import initTable, { destroyTable } from "../../common/DataTable";
import TableCommon from "../../common/Table";
import { AppContext } from "../../contexts";
import { convertDateToThaiV2 } from "./../../common/DateFormat";

interface MajorManageProps {
  fetchMajor: MajorResponse[];
  setFetchMajor: (value: MajorResponse[]) => void;
}

export default function MajorManage({
  fetchMajor,
  setFetchMajor,
}: MajorManageProps) {
  const [rowTableMajor, setRowTableMajor] = useState<boolean>(false);
  const [addMajor, setAddMajor] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [idUpdate, setIdUpdate] = useState<number>(0);
  const { setIsLoading } = useContext(AppContext);

  const addMajorHandler = () => {
    setRowTableMajor(true);
  };

  const addMajorSubmitHandler = () => {
    const payload: MajorRequest = {
      name: addMajor,
    };

    if (payload.name !== "") {
      setIsLoading(true);
      MajorServices.addMajor(payload)
        .then((res) => {
          AlertSuccess(res.data.message);
          setAddMajor("");
          fetchMajorHandler();
          setIsLoading(false);
        })
        .catch((err) => {
          AlertError(err.response.data.message);
          setIsLoading(false);
        });
    } else {
      AlertWarning("กรุณากรอกชื่อสาขา");
    }
  };

  const deleteMajorHandler = (id: number) => {
    const choice = prompt('พิมพ์ว่า "ยืนยัน" เพื่อยืนยันการลบข้อมูล');
    if (choice !== "ยืนยัน") return;
    setIsLoading(true);
    MajorServices.deleteMajor(id)
      .then((res) => {
        AlertSuccess(res.data.message);
        fetchMajorHandler();
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  };

  const inputUpdate = (id: number, name: string) => {
    $(`#${id}`).html(
      `<input type="text" class="form-control" id="update-major" value="${name}" />`
    );
    setIdUpdate(id);
    setIsUpdate(true);
  };

  const updateMajorHandler = () => {
    const update = $("#update-major").val() as string;

    const payload: MajorRequest = {
      name: update,
    };

    if (payload.name === "") {
      AlertWarning("กรุณากรอกชื่อสาขา");
      return;
    }
    setIsLoading(true);
    MajorServices.updateMajor(payload, idUpdate)
      .then((res) => {
        AlertSuccess(res.data.message);
        setAddMajor("");
        setIsUpdate(false);
        fetchMajorHandler();
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  };

  const fetchMajorHandler = () => {
    setIsLoading(true);
    MajorServices.getMajors()
      .then((res) => {
        destroyTable("#major-table");
        setFetchMajor(res.data);
        setTimeout(
          () => initTable(res.data.length.toString() ?? "0", "#major-table"),
          100
        );
        setIsLoading(false);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchMajorHandler();
  }, [setFetchMajor]);

  useEffect(() => {
    if (!isUpdate) {
      fetchMajorHandler();
    }
  }, [isUpdate]);

  return (
    <>
      <div className="modal-body">
        <div className="container-fluid text-center">
          <TableCommon
            id="major-table"
            columns={[
              <>
                <div>ชื่อสาขา</div>
                <button
                  onClick={addMajorHandler}
                  className="btn primary-btn text-white w-100 mt-2"
                >
                  <i className="nav-icon fas fa-plus" />
                </button>
              </>,
              "รหัสสาขา",
              "วันที่เพิ่มข้อมูล",
              "จัดการ",
            ]}
            row={
              <>
                {fetchMajor.map((item, i) => (
                  <tr key={i}>
                    <td id={`${item.ID}`}>{item.NAME}</td>
                    <td>{item.CODE ?? "-"}</td>
                    <td>{convertDateToThaiV2(new Date(item.CREATED_AT))}</td>
                    <td>
                      <div
                        className="row justify-content-center"
                        id={`update-${item.ID}`}
                      >
                        {!isUpdate ? (
                          <>
                            <button
                              className="btn btn-warning mx-2"
                              onClick={() => inputUpdate(item.ID, item.NAME)}
                            >
                              <i className="nav-icon fas fa-pen" />
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => deleteMajorHandler(item.ID)}
                            >
                              <i className="nav-icon fas fa-trash" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn primary-btn mx-2"
                              onClick={updateMajorHandler}
                            >
                              บันทึก
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setIsUpdate(false);
                              }}
                            >
                              ยกเลิก
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            }
          />
        </div>
        {rowTableMajor && (
          <div className="row container-fluid col-12 mt-3 text-center">
            <div className="col-7">
              <TextInput
                label={"พิมพ์ชื่อสาขาที่ต้องการเพิ่ม"}
                setValue={setAddMajor}
                type={"text"}
                icon={"fa fa-building"}
                value={addMajor}
              />
            </div>
            <div className="col-5 mt-4 d-flex justify-content-around">
              <button
                onClick={addMajorSubmitHandler}
                className="btn primary-btn h-75 col-4"
              >
                เพิ่ม
              </button>
              <button
                className="btn primary-btn h-75 col-4"
                onClick={() => {
                  setRowTableMajor(false);
                  setAddMajor("");
                }}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger col-lg-2 col-sm-auto"
          data-dismiss="modal"
        >
          ปิด
        </button>
      </div>
    </>
  );
}
