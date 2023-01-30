import { useState } from "react";
import TableCommon from "../../common/Table";
import TextInput from "../../common/TextInput";
import MajorServices from "../../services/MajorService";
import { MajorRequest } from "../../Models/Request/MajorRequest";
import {
  AlertError,
  AlertSuccess,
  AlertWarning,
} from "../../common/ToastrCommon";

interface MajorManageProps {
  isShowModal: boolean;
}

export default function MajorManage({ isShowModal }: MajorManageProps) {
  const [rowTableMajor, setRowTableMajor] = useState<boolean>(false);
  const [addMajor, setAddMajor] = useState<string>("");

  const addMajorHandler = () => {
    setRowTableMajor(true);
  };

  const addMajorSubmitHandler = () => {
    const payload: MajorRequest = {
      name: addMajor,
    };

    if (payload.name !== "") {
      MajorServices.addMajor(payload)
        .then((res) => {
          AlertSuccess(res.data.message);
          setAddMajor("");
        })
        .catch((err) => {
          AlertError(err.response.data.message);
        });
    } else {
      AlertWarning("กรุณากรอกชื่อสาขา");
    }
  };

  return (
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
                      value={addMajor}
                    />
                  </td>
                  <td className="d-flex justify-content-around my-4 border-0">
                    <button
                      onClick={addMajorSubmitHandler}
                      className="btn primary-btn"
                    >
                      เพิ่ม
                    </button>
                    <button
                      className="btn primary-btn"
                      onClick={() => {
                        setRowTableMajor(false);
                        setAddMajor("");
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
          className="btn btn-danger col-lg-2 col-sm-auto"
          data-dismiss="modal"
        >
          ปิด
        </button>
      </div>
    </>
  );
}
