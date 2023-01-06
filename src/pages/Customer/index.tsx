import { useEffect } from "react";
import initTable from "../../common/DataTable";
import ContentLayOut from "../../layouts/ContentLayOut";
import TableCommon from "../../common/Table";
import CustomerServices from "../../services/CustomerServices";
import { AlertError } from "../../common/ToastrCommon";

export default function CustomerPage() {
  useEffect(() => {
    CustomerServices.getCustomer()
      .then((res) => {
        setTimeout(() => initTable(res.data.length.toString() ?? "0"), 100);
      })
      .catch((err) => {
        AlertError(err.response.data.message);
      });
  }, []);

  return (
    <ContentLayOut
      title={"Customer"}
      topic={"ข้อมูลลูกค้า"}
      page={
        <div className="card-body">
          <TableCommon
            columns={[
              "รหัสลูกค้า",
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
              "เลขบัตรประชาชน",
              "ชื่อ-สกุล",
              "ต้องผ่อนต่อเดือน",
              "จำนวนงวดที่ผ่อนแล้ว",
              "วันที่ต้องชำระ",
              "ประวัติลูกค้า",
              "สถานะ",
            ]}
            row={[].map((item, i) => (
              <tr key={i} className="text-center">
                <td></td>
                <td>
                  <div className="row justify-content-center">
                    <button
                      className="btn btn-warning mx-2"
                      //   onClick={openModalUpdate(item.ID, item.STOCK_TYPE)}
                    >
                      <i className="nav-icon fas fa-pen" />
                    </button>
                    <button
                      className="btn btn-danger"
                      //   onClick={deleteStock(item.ID_CARD)}
                    >
                      <i className="nav-icon fas fa-trash" />
                    </button>
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button
                    className="btn primary-btn text-white"
                    data-toggle="modal"
                    data-target="#detail-modal"
                    // onClick={openDetailModal(item.ID_CARD, item.STOCK_TYPE)}
                  >
                    รายละเอียด
                  </button>
                </td>
              </tr>
            ))}
          />
        </div>
      }
    />
  );
}
