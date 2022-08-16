import { ExternalLinkIcon } from "@heroicons/react/solid";
import { createColumnHelper } from "@tanstack/react-table";
import {
  AdminStudentOfferColumns,
  Offer,
  StudentOfferColumns,
} from "../types/offer";

const offerColumnHelper = createColumnHelper<Offer>();

export const offerColumns = [
  offerColumnHelper.accessor("company", {
    header: "Company",
  }),
  offerColumnHelper.accessor("sector", {
    header: "Sector",
  }),
  offerColumnHelper.accessor("type", {
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
  studentOfferColumnHelper.accessor("phoneNumber", {
    header: "Phone Number",
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

const adminOfferColumnHelper = createColumnHelper<AdminStudentOfferColumns>();

export const adminStudentOfferColumns = [
  adminOfferColumnHelper.accessor("id", {
    header: "id",
  }),
  adminOfferColumnHelper.accessor("student.studentRecord.name", {
    header: "Name",
  }),
  adminOfferColumnHelper.accessor("student.studentRecord.phoneNumber", {
    header: "Phone Number",
  }),
  adminOfferColumnHelper.accessor("student.studentRecord.branch", {
    header: "Branch",
  }),
  adminOfferColumnHelper.accessor("student.studentRecord.usn", {
    header: "USN",
  }),
  adminOfferColumnHelper.accessor("ctc", {
    header: "CTC",
  }),
  adminOfferColumnHelper.accessor("offer_letter", {
    header: "Offer Letter",
  }),
  adminOfferColumnHelper.accessor("event.company.name", {
    header: "Company",
  }),
  adminOfferColumnHelper.accessor("event.company.sector", {
    header: "Sector",
  }),
  adminOfferColumnHelper.accessor("event.type", {
    header: "Type",
  }),
];
