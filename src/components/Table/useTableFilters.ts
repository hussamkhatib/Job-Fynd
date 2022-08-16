import { PaginationState, SortingState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const useTableFilters = (index: number, size: number) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: index,
    pageSize: size,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
    id: sorting[0]?.id,
    desc: sorting[0]?.desc,
  };

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  return {
    pageIndex,
    pageSize,
    setPagination,
    fetchDataOptions,
    pagination,
    sorting,
    setSorting,
  };
};

export default useTableFilters;
