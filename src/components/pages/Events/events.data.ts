export const eventTabs = [
  {
    name: "Active",
    href: "/events/active",
  },
  {
    name: "All",
    href: "/events/all",
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
  columns: [
    {
      Header: "Company",
      accessor: "company",
    },
    {
      Header: "CTC",
      accessor: "ctc",
    },
    {
      Header: "Sector",
      accessor: "sector",
    },
  ],
};
