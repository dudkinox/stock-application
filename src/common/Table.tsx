interface TableCommonProps {
  columns: any[];
  row: any;
}

export default function TableCommon({ columns, row }: TableCommonProps) {
  return (
    <table
      id="stock-table"
      className="table table-bordered table-hover dtr-inline collapsed w-100"
    >
      <thead>
        <tr className="text-center">
          {columns.map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>{row}</tbody>
    </table>
  );
}
