import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  useTableInstance,
} from "@tanstack/react-table";
import classNames from "classnames";
import { FC, Fragment } from "react";

type Props = {
  table: any;
  columns: any;
  data: unknown[];
  manualPagination?: boolean;
  pageCount?: number;
  setPagination?: OnChangeFn<PaginationState>;
  state?: any;
};

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
          <button
            onClick={() => instance.previousPage()}
            disabled={!instance.getCanPreviousPage()}
          >
            <ChevronLeftIcon
              className={classNames(
                "w-5 h-5 ",
                instance.getCanPreviousPage()
                  ? "text-gray-500"
                  : "text-gray-300"
              )}
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => instance.nextPage()}
            disabled={!instance.getCanNextPage()}
          >
            <ChevronRightIcon
              className={classNames(
                "w-5 h-5 ",
                instance.getCanNextPage() ? "text-gray-500" : "text-gray-300"
              )}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Table;
