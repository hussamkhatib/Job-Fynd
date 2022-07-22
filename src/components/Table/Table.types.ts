import { OnChangeFn, PaginationState } from "@tanstack/react-table";

interface CommonProps {
  data: unknown[];
  columns: any;
}
interface Pagination extends CommonProps {
  manualPagination: boolean;
  pageCount: number;
  setPagination: OnChangeFn<PaginationState>;
  state: any;
}
interface Default extends CommonProps {
  state?: any;
  manualPagination?: never;
  pageCount?: never;
  setPagination?: never;
}
export type Props = Pagination | Default;
