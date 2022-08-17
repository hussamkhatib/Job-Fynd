import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, Fragment } from "react";
import Button from "../ui/Button";
import Props from "./Table.types";

const Table: FC<Props> = ({
  data,
  columns,
  pageCount = undefined,
  pagination = undefined,
  setPagination = undefined,
  sorting = undefined,
  setSorting = undefined,
}) => {
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
      columnVisibility: { id: false },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: pageCount || undefined,
    manualPagination: Boolean(pagination),
    manualSorting: Boolean(sorting),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    debugTable: true,
  });

  if (Array.isArray(data) && !data.length)
    return <div>Nothing To Show Here</div>;

  return (
    <Fragment>
      <div className="mx-auto overflow-auto bg-white">
        <table className="w-full table-fixed whitespace-nowrap text-ellipsis">
          <thead className="bg-neutral-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.column.getSize() }}
                    className="px-2 py-1 border-[1px] border-solid border-neutral-300  whitespace-normal  break-all"
                  >
                    <div
                      {...{
                        className:
                          header.column.getCanSort() && sorting
                            ? "cursor-pointer select-none"
                            : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: (
                          <SortAscendingIcon
                            className="w-5 h-5 ml-1 inline"
                            aria-hidden
                          />
                        ),
                        desc: (
                          <SortDescendingIcon
                            className="w-5 h-5 ml-1 inline"
                            aria-hidden
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-1 px-2 border-[1px] border-solid border-neutral-300 whitespace-normal break-all"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
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
