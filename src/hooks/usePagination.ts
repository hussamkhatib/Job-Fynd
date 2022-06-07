import { PaginationState } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const usePagination = (index: number, size: number) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: index,
    pageSize: size,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
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
  };
};

export default usePagination;
