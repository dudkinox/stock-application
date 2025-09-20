interface TableCommonProps {
  columns: any[];
  row: any;
  id?: string;
  foot?: any;
}

export default function TableCommon({
  columns,
  row,
  id,
  foot,
}: Readonly<TableCommonProps>) {
  return (
    <div
      className="tablecommon-responsive"
      style={{
        overflowX: "auto",
        scrollbarGutter: "stable",
      }}
    >
      <table
        id={id ?? "stock-table"}
        className="table table-bordered table-hover dtr-inline collapsed w-100"
      >
        <thead>
          <tr className="text-center">
            {columns.map((item, i) => (
              <th key={item.ID ?? i} className="align-middle">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{row}</tbody>
        <tfoot>{foot}</tfoot>
      </table>
    </div>
  );
}
