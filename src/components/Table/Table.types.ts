import {
  OnChangeFn,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export default interface Props {
  data: unknown[];
  columns: any[];
  pageCount?: number;
  setPagination?: OnChangeFn<PaginationState>;
  pagination?: PaginationState;
  setSorting?: OnChangeFn<SortingState>;
  sorting?: SortingState;
}
