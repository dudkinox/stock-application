import InsertModal from "./InsertModal";

export default function StockLayout() {
  return (
    <>
      <div className="card-body">
        <table id="example2" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="col-2 text-center">
                <InsertModal />
              </th>
              <th className="text-center">ลำดับ</th>
              <th>Platform(s)</th>
              <th>Engine version</th>
              <th>CSS grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="col-2 text-center">
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
