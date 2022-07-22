import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, Fragment } from "react";
import Button from "../ui/Button";
import { Props } from "./Table.types";

const Table: FC<Props> = ({
  data,
  columns,
  manualPagination = false,
  pageCount,
  setPagination,
  state,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: pageCount || undefined,
    manualPagination,
    onPaginationChange: setPagination || undefined,
    state,
  });

  if (Array.isArray(data) && !data.length)
    return <div>Nothing To Show Here</div>;
  return (
    <Fragment>
      <div className="flex flex-col w-full overflow-auto bg-white">
        <table className="whitespace-nowrap text-ellipsis">
          <thead className="bg-[#F8F9FD]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-2 border-[1px] border-solid"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-[1px] border-solid">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {manualPagination && (
        <div className="flex items-center justify-end gap-2 py-2">
          <span className="text-sm text-gray-500 ">
            {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
          </span>
          <Button
            StartIcon={ChevronLeftIcon}
            size="sm"
            color="minimal"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <Button
            StartIcon={ChevronRightIcon}
            size="sm"
            color="minimal"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Table;
