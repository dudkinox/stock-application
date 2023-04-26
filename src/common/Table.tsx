interface TableCommonProps {
  columns: any[];
  row: any;
  id?: string;
}

export default function TableCommon({ columns, row, id }: TableCommonProps) {
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
      <tbody>{row}</tbody>
    </table>
  );
}
