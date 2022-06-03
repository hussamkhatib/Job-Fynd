/* eslint-disable react/jsx-key */
import { FC, forwardRef, useEffect, useRef } from "react";
import { useTable, useRowSelect } from "react-table";

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }: any, ref) => {
    const defaultRef = useRef();
    const resolvedRef: any = ref || defaultRef;
    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);
IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

interface Props {
  columns: any[];
  data: any[];
  isLoading?: boolean;
  children?: any;
}
const SelectionRowTable: FC<Props> = ({
  columns,
  data,
  isLoading,
  children,
}) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  }: any = useTable(
    {
      columns,
      data,
      getRowId: (row: any) => {
        return row.id;
      },
      initialState: {
        hiddenColumns: ["id"],
      },
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          // Let's make a column for selection
          {
            id: "selected",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => {
              // console.log(row);
              return (
                <div>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore  */}
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              );
            },
          },
          ...columns,
        ];
      });
    }
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col w-max">
      {children({ selectedFlatRows }) || null}
      <div className="w-full overflow-auto">
        <table {...getTableProps()}>
          <thead className="bg-[#F8F9FD]">
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
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
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
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
    </div>
  );
};

export default SelectionRowTable;
