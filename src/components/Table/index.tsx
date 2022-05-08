/* eslint-disable react/jsx-key */
import { FC } from "react";
import { useTable } from "react-table";

interface Props {
  columns: any;
  data: any;
  isLoading?: boolean;
}

const Table: FC<Props> = ({ columns, data, isLoading }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (isLoading) return <p>Loading</p>;

  return (
    <div className="w-full overflow-auto">
      <table {...getTableProps()}>
        <thead className="bg-[#F8F9FD]">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-[1px] border-solid"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="p-2 border-[1px] border-solid"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
