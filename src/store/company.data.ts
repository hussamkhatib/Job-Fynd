import { createTable } from "@tanstack/react-table";
import { Company } from "../types/company";

export const CompanyTable = createTable().setRowType<Company>();
export const companyColumns = [
  CompanyTable.createDataColumn("id", {
    header: "id",
  }),
  CompanyTable.createDataColumn("name", {
    header: "name",
  }),
  CompanyTable.createDataColumn("sector", {
    header: "Sector",
  }),
  CompanyTable.createDataColumn("offers", {
    header: "Offers",
  }),
];
