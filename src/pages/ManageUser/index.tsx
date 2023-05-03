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
import MajorManage from "../Major";
import MajorResponse from "../../Models/Response/GetMajorResponse";
import MajorServices from "../../services/MajorService";
import SelectChoice from "../../common/Select";
import AccountServices from "../../services/AccountService";
import { AppContext } from "../../contexts";

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
    canEdit,
    setCanEdit,
    canDelete,
    setCanDelete,
    handlerSubmit,
    reGetUser,
    isShowModal,
  } = useContext(UserContext);
  const { isLogin, isEdit, isDelete } = useContext(AppContext)
  const [fetchMajor, setFetchMajor] = useState<MajorResponse[]>([]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  const openModalUpdate = (id: string, username: string) => () => {
    ($("#insert-modal") as any).modal("show");
    setIsUpdate(true);
    AccountServices.getFindUser(username)
      .then((res) => {
        setUpdateId(id);
        setUsername(res.data.USERNAME);
        setMajor(res.data.MAJOR);
        setCanEdit(res.data.CAN_EDIT)
        setCanDelete(res.data.CAN_DELETE)
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  };

  const updateAccountHandler = (id: string) => async () => {
    let payload: UserRequest = {
      username,
      password,
      major,
      canEdit,
      canDelete,
    };

    try {
      const updateUserRes = await UserServices.updateUser(id, camelToSnakeObject(payload));
      const findUserRes = await AccountServices.getFindUser(isLogin);
      sessionStorage.setItem("major", findUserRes.data.MAJOR);
      sessionStorage.setItem("can_edit", findUserRes.data.CAN_EDIT ? "TRUE" : "FALSE");
      sessionStorage.setItem("can_delete", findUserRes.data.CAN_DELETE ? "TRUE" : "FALSE");
      reGetUser();
      AlertSuccess(updateUserRes.data.message);
    } catch (error: any) {
      AlertError(error.response.data.message);
    }
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

  useEffect(() => {
    MajorServices.getMajors()
      .then((res) => {
        const data = res.data;
        data.push({
          ID: "",
          NAME: "admin",
        });
        setFetchMajor(data);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  }, [setFetchMajor]);

  return (
    <ContentLayOut
      title={"Manage user"}
      topic={"จัดการผู้ใช้"}
      btnHeader={
        <button
          className="btn primary-btn text-white float-right"
          data-toggle="modal"
          data-target="#insert-modal"
        >
          เพิ่มผู้ใช้
        </button>
      }
      page={
        <>
          <ModalCommon
            title={"เพิ่มข้อมูล"}
            id={"insert-modal"}
            content={
              <>
                <div className="modal-body">
                  <div className="container-fluid">
                    <SelectChoice
                      topic="เลือกสาขา"
                      setValue={setMajor}
                      icon="far fa-calendar-alt"
                      label={"สาขา:"}
                      value={major}
                      options={fetchMajor.map((item) => item.NAME)}
                    />
                    <TextInput
                      label={"ชื่อผู้ใช้:"}
                      icon={"far fa-calendar-alt"}
                      setValue={setUsername}
                      type={"text"}
                      placeholder={"ชื่อผู้ใช้"}
                      value={username}
                    />
                    {!isUpdate ? (
                      <TextInput
                        label={"รหัสผ่าน:"}
                        icon={"fa fa-unlock-alt"}
                        setValue={setPassword}
                        type={"password"}
                        placeholder={"รหัสผ่าน"}
                        value={password}
                      />
                    ) : null}
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        id="canEdit"
                        onChange={(e: any) => setCanEdit(e.target.checked)}
                        checked={canEdit}
                      />
                      <label htmlFor="canEdit" className="custom-control-label">
                        สามาถแก้ไขข้อมูลได้
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input"
                        type="checkbox"
                        id="canDelete"
                        onChange={(e: any) => setCanDelete(e.target.checked)}
                        checked={canDelete}
                      />
                      <label htmlFor="canDelete" className="custom-control-label">
                        สามาถลบข้อมูลได้
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {isUpdate ? (
                    <button
                      type="button"
                      className="btn primary-btn col-lg-2 col-sm-auto"
                      data-dismiss="modal"
                      onClick={updateAccountHandler(updateId)}
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
              <MajorManage
                fetchMajor={fetchMajor}
                setFetchMajor={setFetchMajor}
              />
            }
          />
          <div className="card-body">
            <TableCommon
              columns={[
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
                "สิทธิการแก้ไขข้อมูล",
                "สิทธิการลบข้อมูล",
                "แก้ไข",
                "ลบ",
              ]}
              row={user.map((item, i) => (
                <tr key={i} className="text-center">
                  <td>{item.USERNAME}</td>
                  <td>{item.MAJOR}</td>
                  <td>{item.CAN_EDIT ? "มี" : "ไม่มี"}</td>
                  <td>{item.CAN_DELETE ? "มี" : "ไม่มี"}</td>
                  <td>{isEdit() ?
                    <button
                      className="btn btn-warning mx-2"
                      onClick={openModalUpdate(item.ID, item.USERNAME)}
                    >
                      <i className="nav-icon fas fa-pen" />
                    </button>
                    : "ไม่มีสิทธิ"
                  }
                  </td>
                  <td>
                    {isDelete() && isLogin !== item.USERNAME ?
                      <button
                        className="btn btn-danger"
                        onClick={deleteUser(item.ID)}
                      >
                        <i className="nav-icon fas fa-trash" />
                      </button>
                      : "ไม่มีสิทธิ"
                    }
                  </td>
                </tr>
              ))}
            />
          </div>
        </>
      }
    />
  );
}
