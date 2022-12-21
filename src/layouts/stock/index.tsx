import InsertModal from "./InsertModal";

export default function StockLayout() {
  return (
    <>
      <div className="card-body">
        <table
          id="example2"
          className="table table-bordered table-hover table-responsive"
        >
          <thead>
            <tr className="text-center">
              <th className="col-2">
                <InsertModal />
              </th>
              <th>ลำดับ</th>
              <th>Platform(s)</th>
              <th>Engine version</th>
              <th>CSS grade</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="col-2">
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
              <td>X</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
