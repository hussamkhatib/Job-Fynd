import { FC } from "react";
import { StudentCol } from "../../types/student";

interface Props {
  columns: StudentCol[];
  rows: number;
}
const LoadingTable: FC<Props> = ({ columns, rows }) => {
  return (
    <div className="flex flex-col">
      <div className="flex bg-[#F8F9FD] ">
        {columns.map((column) => (
          <div key={column.accessor} className="p-2 border-[1px] border-solid">
            {column.Header}
          </div>
        ))}
      </div>
      {[...Array(rows)].map((row) => (
        <div className="flex" key={row}>
          {columns.map((column) => (
            <div
              key={column.accessor}
              className="p-2 border-[1px] border-solid"
            >
              <span className="text-transparent bg-slate-200 animate-pulse">
                {column.Header}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LoadingTable;
