import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { getCoreRowModel, useTableInstance } from "@tanstack/react-table";
import { FC, Fragment } from "react";
import Button from "../ui/Button";
import { Props } from "./Table.types";

const Table: FC<Props> = ({
  table,
  data,
  columns,
  manualPagination = false,
  pageCount,
  setPagination,
  state,
}) => {
  const instance = useTableInstance(table, {
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
      <div className="flex flex-col w-full overflow-auto">
        <table className="whitespace-nowrap text-ellipsis">
          <thead className="bg-[#F8F9FD]">
            {instance.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="p-2 border-[1px] border-solid"
                  >
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {instance.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-[1px] border-solid">
                    {cell.renderCell()}
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
            {instance.getState().pagination.pageIndex + 1}/
            {instance.getPageCount()}
          </span>
          <Button
            StartIcon={ChevronLeftIcon}
            size="sm"
            color="minimal"
            onClick={() => instance.previousPage()}
            disabled={!instance.getCanPreviousPage()}
          />
          <Button
            StartIcon={ChevronRightIcon}
            size="sm"
            color="minimal"
            onClick={() => instance.nextPage()}
            disabled={!instance.getCanNextPage()}
          />
        </div>
      )}
    </Fragment>
  );
};

export default Table;
