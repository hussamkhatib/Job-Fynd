import { createColumnHelper } from "@tanstack/react-table";
import { Company } from "../types/company";

const companyColumnHelper = createColumnHelper<Company>();

export const companyColumns = [
  companyColumnHelper.accessor("id", {}),
  companyColumnHelper.accessor("name", {
    header: "Name",
  }),
  companyColumnHelper.accessor("sector", {
    header: "Sector",
  }),
  companyColumnHelper.accessor("offers", {
    header: "Offers",
  }),
];
