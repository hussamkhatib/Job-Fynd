export const adminEventTabs = [
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "New Event",
    href: "/events/newevent",
  },
];

export const studentEventTabs = [
  {
    name: "Events",
    href: "/events",
  },
];

export const eventCols = [
  {
    Header: "Company",
    accessor: "company",
  },
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "CTC",
    accessor: "ctc",
  },
  {
    Header: "Sector",
    accessor: "sector",
  },
  {
    Header: "Type",
    accessor: "type",
  },
];

export const allEvents = {
  data: [
    {
      company: "Happiest Minds",
      ctc: "5.4 LPA",
      sector: "IT",
    },
    {
      company: "Bygus",
      ctc: "10 LPA",
      sector: "Sales",
    },
    {
      company: "Goldman sachs",
      ctc: "6 LPA",
      sector: "IT",
    },
  ],
  columns: eventCols,
};
