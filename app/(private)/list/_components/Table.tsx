import React from "react";

interface Columns {
  header: string;
  accessor: string;
  className?: string;
}

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: Columns[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="text-sm-regular text-left text-gray-500">
          {columns.map((column, index) => (
            <th key={index} className={column?.className}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item, index) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
