import { ExternalLinkIcon } from "@heroicons/react/solid";

export const offerCols = [
  {
    Header: "Company",
    accessor: "company",
  },
  {
    Header: "Sector",
    accessor: "sector",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Type",
    accessor: "type",
  },
  {
    Header: "CTC",
    accessor: "ctc",
  },
  {
    Header: "Offer Letter",
    accessor: "offer_letter",
    Cell: ({ cell: { value } }: { cell: any }) =>
      value && (
        <a target="_blank" href={value} rel="noreferrer">
          <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      ),
  },
];
export const studentOfferCols = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Branch",
    accessor: "branch",
  },
  {
    Header: "USN",
    accessor: "usn",
  },
  {
    Header: "CTC",
    accessor: "ctc",
  },
];
