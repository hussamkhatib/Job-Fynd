/* eslint-disable react/jsx-key */
import { FC } from "react";
import { useTable } from "react-table";
import { StudentCol } from "../../types/student";
import CellList from "./Cell/CellList";
import LoadingTable from "./LoadingTable";

interface Props {
  columns: StudentCol[];
  rowsCount: number;
  data: any[];
  isLoading?: boolean;
}

const Table: FC<Props> = ({ columns, rowsCount, data, isLoading }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  if (isLoading) return <LoadingTable columns={columns} rows={rowsCount} />;

  return (
    <div className="w-full overflow-auto">
      <table {...getTableProps()}>
        <thead className="bg-[#F8F9FD]">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-2 border-[1px] border-solid"
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
                      {Array.isArray(cell.value) ? (
                        <CellList arr={cell.value} />
                      ) : (
                        cell.render("Cell")
                      )}
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
