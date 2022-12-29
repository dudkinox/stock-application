import InsertModal from "./InsertModal";
import DetailModal from "./DetailModal";

export default function StockLayout() {
  return (
    <>
      <div className="card-body">
        <table
          id="stockTable"
          className="table table-bordered table-hover dtr-inline collapsed w-100"
        >
          <thead>
            <tr className="text-center">
              <th>รหัสเอกสาร</th>
              <th>
                <InsertModal />
              </th>
              <th>เลขบัตรประชาชน</th>
              <th>ประวัติลูกค้า</th>
              <th>ประเภท</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>1</td>
              <td>
                <div className="row justify-content-center">
                  <button className="btn btn-warning mx-2">
                    <i className="nav-icon fas fa-pen" />
                  </button>
                  <button className="btn btn-danger">
                    <i className="nav-icon fas fa-trash" />
                  </button>
                </div>
              </td>
              <td>Internet Explorer 4.0</td>
              <td>Win 95+</td>
              <td> 4</td>
              <td>
                <DetailModal />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
