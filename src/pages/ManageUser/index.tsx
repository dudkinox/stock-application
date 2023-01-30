import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/ManageUserContext";
import initTable, { destroyTable } from "../../common/DataTable";
import ModalCommon from "../../common/Modal";
import TextInput from "../../common/TextInput";
import { UserRequest } from "../../Models/Request/UserRequest";
import UserServices from "../../services/UserServices";
import { AlertError, AlertSuccess } from "../../common/ToastrCommon";
import { camelToSnakeObject } from "../../common/CamelToSnake";

export default function ManageUser() {
  const {
    user,
    setUser,
    username,
    setUsername,
    password,
    setPassword,
    major,
    setMajor,
    permission,
    setPermission,
    handlerSubmit,
    reGetUser,
    isShowModal,
    setIsShowModal,
  } = useContext(UserContext);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");
  const [addMajor, setAddMajor] = useState<string>("");
  const [rowTableMajor, setRowTableMajor] = useState<boolean>(false);

  const openModalUpdate = (id: string) => () => {
    ($("#insert-modal") as any).modal("show");
    setIsUpdate(true);
    UserServices.getUserById(id)
      .then((res) => {
        setUpdateId(id);
        setUsername(res.data.USERNAME);
        setMajor(res.data.MAJOR);
        setPermission(res.data.PERMISSION);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  };

  const updateStockHandler = (id: string) => () => {
    let payload: UserRequest = {
      username,
      password,
      major,
      permission,
    };

    UserServices.updateUser(id, camelToSnakeObject(payload))
      .then((res) => {
        AlertSuccess(res.data.message);
        reGetUser();
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  };

  const deleteUser = (id: string) => () => {
    UserServices.deleteUser(id)
      .then((res) => {
        AlertSuccess(res.data.message);
        UserServices.getUser()
          .then((res) => {
            setTimeout(() => destroyTable());
            setUser(res.data);
            setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
          })
          .catch((err) => {
            AlertError(err.response.data.message);
          });
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  };

  const addMajorHandler = () => {
    setRowTableMajor(true);
  };

  useEffect(() => {
    UserServices.getUser()
      .then((res) => {
        setUser(res.data);
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  }, [setUser]);

  return (
    <ContentLayOut
      title={"Manage user"}
      topic={"จัดการผู้ใช้"}
      page={
        <>
          <ModalCommon
            title={"เพิ่มข้อมูล"}
            id={"insert-modal"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
                    <TextInput
                      label={"สาขา:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setMajor}
                      type={"text"}
                      placeholder={"สาขา"}
                      value={major}
                    />
                    <TextInput
                      label={"ชื่อผู้ใช้:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setUsername}
                      type={"text"}
                      placeholder={"ชื่อผู้ใช้"}
                      value={username}
                    />
                    <TextInput
                      label={"สิทธิการเข้าถึง:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setPermission}
                      type={"text"}
                      placeholder={"สิทธิการเข้าถึง"}
                      value={permission}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  {isUpdate ? (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss="modal"
                      onClick={updateStockHandler(updateId)}
                    >
                      อัพเดต
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss={isShowModal && `modal`}
                      onClick={handlerSubmit}
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
          <ModalCommon
            title={"เพิ่มสาขา"}
            id={"insert-major-modal"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
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
                        "จัดการ",
                      ]}
                      row={
                        rowTableMajor && (
                          <>
                            <td>
                              <TextInput
                                label={"พิมพ์ชื่อสาขาที่ต้องการเพิ่ม"}
                                setValue={setAddMajor}
                                type={"text"}
                                icon={"fa fa-building"}
                              />
                            </td>
                            <td className="d-flex justify-content-around my-4 border-0">
                              <button className="btn primary-btn">เพิ่ม</button>
                              <button
                                className="btn primary-btn"
                                onClick={() => {
                                  setRowTableMajor(false);
                                }}
                              >
                                ยกเลิก
                              </button>
                            </td>
                          </>
                        )
                      }
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn primary-btn col-lg-2 col-sm-auto"
                    data-dismiss={isShowModal && `modal`}
                    onClick={handlerSubmit}
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
          <div className="card-body">
            <TableCommon
              columns={[
                <>
                  <div>เพิ่ม/ลบ/เเก้ไข</div>
                  <button
                    className="btn primary-btn text-white w-100 mt-2"
                    data-toggle="modal"
                    data-target="#insert-modal"
                  >
                    <i className="nav-icon fas fa-plus" />
                  </button>
                </>,
                <>
                  <div>สาขา</div>
                  <button
                    className="btn primary-btn text-white w-100 mt-2"
                    data-toggle="modal"
                    data-target="#insert-major-modal"
                  >
                    <i className="nav-icon fas fa-plus" />
                  </button>
                </>,
                "ชื่อผู้ใช้ / username",
                "สิทธิการเข้าถึง",
              ]}
              row={user.map((item, i) => (
                <tr key={i} className="text-center">
                  <td>
                    <div className="row justify-content-center">
                      <button
                        className="btn btn-warning mx-2"
                        onClick={openModalUpdate(item.ID)}
                      >
                        <i className="nav-icon fas fa-pen" />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={deleteUser(item.ID)}
                      >
                        <i className="nav-icon fas fa-trash" />
                      </button>
                    </div>
                  </td>
                  <td>{item.USERNAME}</td>
                  <td>{item.MAJOR}</td>
                  <td>{item.PERMISSION}</td>
                </tr>
              ))}
            />
          </div>
        </>
      }
    />
  );
}
