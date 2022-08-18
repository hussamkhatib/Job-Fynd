import { ExternalLinkIcon } from "@heroicons/react/solid";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import Avatar from "../components/ui/Avatar";
import {
  AdminStudentOfferColumns,
  Offer,
  StudentOfferColumns,
} from "../types/offer";
import { branchColors } from "./student.data";

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
    cell: (info) => {
      const ctc = info.getValue();
      return <span>{ctc} LPA</span>;
    },
  }),
  offerColumnHelper.accessor("offerLetter", {
    header: "Offer Letter",
    cell: ({ getValue }) => {
      const value = getValue() as never as { url: string };
      const url = value?.url;
      return url ? (
        <a target="_blank" href={url} rel="noreferrer">
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
    cell: (info) => {
      const branch = info.getValue();
      return (
        <span className={classNames(branchColors.get(branch), "p-1 rounded")}>
          {branch}
        </span>
      );
    },
  }),
  studentOfferColumnHelper.accessor("usn", {
    header: "USN",
  }),
  studentOfferColumnHelper.accessor("ctc", {
    header: "CTC",
    cell: (info) => {
      const ctc = info.getValue();
      return <span>{ctc} LPA</span>;
    },
  }),
];

const adminOfferColumnHelper = createColumnHelper<AdminStudentOfferColumns>();

export const adminStudentOfferColumns = [
  adminOfferColumnHelper.accessor("id", {
    header: "id",
  }),
  adminOfferColumnHelper.accessor("student.studentRecord.name", {
    header: "Name",
    cell: (info) => {
      const name = info.getValue();
      return (
        <div>
          <Avatar
            src={info.cell.row.original?.student.studentRecord.image}
            name={name}
            size={28}
            alt="avatar"
          />
          <span className="ml-2">{name}</span>
        </div>
      );
    },
  }),
  adminOfferColumnHelper.accessor("student.studentRecord.phoneNumber", {
    header: "Phone Number",
  }),
  adminOfferColumnHelper.accessor("student.studentRecord.branch", {
    header: "Branch",
    cell: (info) => {
      const branch = info.getValue();
      return (
        <span className={classNames(branchColors.get(branch), "p-1 rounded")}>
          {branch}
        </span>
      );
    },
  }),
  adminOfferColumnHelper.accessor("student.studentRecord.usn", {
    header: "USN",
  }),
  adminOfferColumnHelper.accessor("ctc", {
    header: "CTC",
    cell: (info) => {
      const ctc = info.getValue();
      return <span>{ctc} LPA</span>;
    },
  }),
  adminOfferColumnHelper.accessor("offerLetter", {
    header: "Offer Letter",
    cell: ({ getValue }) => {
      const value = getValue() as never as { url: string };
      const url = value?.url;
      return url ? (
        <a target="_blank" href={url} rel="noreferrer">
          <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      ) : null;
    },
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
