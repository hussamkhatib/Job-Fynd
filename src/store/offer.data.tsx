import { ExternalLinkIcon } from "@heroicons/react/solid";
import { createColumnHelper } from "@tanstack/react-table";
import { Offer, StudentOfferColumns } from "../types/offer";

const offerColumnHelper = createColumnHelper<Offer>();

export const offerColumns = [
  offerColumnHelper.accessor("company", {
    header: "Company",
  }),
  offerColumnHelper.accessor("sector", {
    header: "Sector",
  }),
  offerColumnHelper.accessor("title", {
    header: "Type",
  }),
  offerColumnHelper.accessor("ctc", {
    header: "CTC",
  }),
  offerColumnHelper.accessor("offer_letter", {
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

const studentOfferColumnHelper = createColumnHelper<StudentOfferColumns>();

export const studentOfferColumns = [
  studentOfferColumnHelper.accessor("id", {
    header: "id",
  }),
  studentOfferColumnHelper.accessor("name", {
    header: "Name",
  }),
  studentOfferColumnHelper.accessor("branch", {
    header: "Branch",
  }),
  studentOfferColumnHelper.accessor("usn", {
    header: "USN",
  }),
  studentOfferColumnHelper.accessor("ctc", {
    header: "CTC",
  }),
];
