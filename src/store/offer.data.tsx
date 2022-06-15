import { ExternalLinkIcon } from "@heroicons/react/solid";
import { createTable } from "@tanstack/react-table";
import { Offer, StudentOfferColumns } from "../types/offer";

export const offerTable = createTable().setRowType<Offer>();
export const offerColumns = [
  offerTable.createDataColumn("company", {
    header: "Company",
  }),
  offerTable.createDataColumn("sector", {
    header: "Sector",
  }),
  offerTable.createDataColumn("title", {
    header: "Type",
  }),
  offerTable.createDataColumn("ctc", {
    header: "CTC",
  }),
  offerTable.createDataColumn("offer_letter", {
    header: "Offer Letter",
    cell: ({ getValue }) => {
      const value = getValue();
      return value ? (
        <a target="_blank" href={getValue()} rel="noreferrer">
          <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      ) : null;
    },
  }),
];

export const studentOfferTable =
  createTable().setRowType<StudentOfferColumns>();

export const studentOfferColumns = [
  studentOfferTable.createDataColumn("id", {
    header: "id",
  }),
  studentOfferTable.createDataColumn("name", {
    header: "Name",
  }),
  studentOfferTable.createDataColumn("branch", {
    header: "Branch",
  }),
  studentOfferTable.createDataColumn("usn", {
    header: "USN",
  }),
  studentOfferTable.createDataColumn("ctc", {
    header: "CTC",
  }),
];
