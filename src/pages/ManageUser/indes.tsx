import TableCommon from "../../common/Table";
import ContentLayOut from "../../layouts/ContentLayOut";
import { useEffect } from "react";
import initTable from "../../common/DataTable";

export default function ManageUser() {
  useEffect(() => {
    initTable("0" ?? "0");
  }, []);

  return (
    <ContentLayOut
      title={"Manage user"}
      topic={"จัดการผู้ใช้"}
      page={
        <>
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
                "สาขา",
                "ชื่อผู้ใช้ / username",
                "รหัสผ่าน",
                "สิทธิการเข้าถึง",
              ]}
              row={[]}
            />
          </div>
        </>
      }
    />
  );
}
