interface TableCommonProps {
  columns: any[];
  row: any;
  id?: string;
  showSummary?: boolean;
  summaryRow?: any;
}

export default function TableCommon({
  columns,
  row,
  id,
  showSummary = false,
  summaryRow,
}: TableCommonProps) {
  return (
    <table
      id={id ?? "stock-table"}
      className="table table-bordered table-hover dtr-inline collapsed w-100"
    >
      <thead>
        <tr className="text-center">
          {columns.map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {row}
        {showSummary ? (
          <tr className="text-center">
            <td colSpan={2}>
              สรุป
            </td>
            <td>รายจ่าย(บาท)</td>
            <td>รายรับ(บาท)</td>
            <td>คงเหลือ(บาท)</td>
          </tr>
        ) : null}
        {summaryRow}
      </tbody>
    </table>
  );
}
