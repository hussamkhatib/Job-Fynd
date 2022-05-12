import { FC } from "react";
import { StudentCol } from "../../types/student";

interface Props {
  columns: StudentCol[];
  rows: number;
}
const LoadingTable: FC<Props> = ({ columns, rows }) => {
  return (
    <div className="flex flex-col">
      <div className="flex bg-[#F8F9FD] w-max">
        {columns.map((column) => (
          <div key={column.accessor} className="p-2 border-[1px] border-solid">
            {column.Header}
          </div>
        ))}
      </div>
      {[...Array(rows)].map((_, i) => {
        return (
          <div className="flex" key={i}>
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
        );
      })}
    </div>
  );
};

export default LoadingTable;
