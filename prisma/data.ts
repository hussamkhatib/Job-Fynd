const users = [
  {
    id: "cl3s5w3jk000009m81d9j0wv3",
    email: "Rob@gmail.com",
    details: {
      create: {
        name: "Rob",
        usn: "4VV18EC01",
        branch: "EC",
        gender: "M",
        email: "Rob@gmail.com",
        image: "robImage",
        offer: {
          create: [
            {
              ctc: "5.4LPA",
              offer_letter: "b",
              event_id: 1,
            },
            {
              ctc: "9LPA",
              offer_letter: "d",
              event_id: 4,
            },
            {
              ctc: "7LPA",
              offer_letter: "e",
              event_id: 5,
            },
          ],
        },
        applied_jobs: {
          create: [
            {
              event_id: 1,
            },
            {
              event_id: 4,
            },
            {
              event_id: 5,
            },
          ],
        },
      },
    },
  },
  {
    id: "cl3s5wva1000109m8gf2k3pmv",
    email: "Mary@gmail.com",
    details: {
      create: {
        name: "Mary",
        usn: "4VV18IS01",
        branch: "ISE",
        gender: "F",
        email: "Mary@gmail.com",
        image: "MaryImage",
        offer: {
          create: [
            {
              ctc: "5.4LPA",
              offer_letter: "a",
              event_id: 1,
            },
            {
              ctc: "6LPA",
              offer_letter: "c",
              event_id: 3,
            },
            {
              ctc: "4LPA",
              offer_letter: "f",
              event_id: 7,
            },
          ],
        },
        applied_jobs: {
          create: [
            {
              event_id: 1,
            },
            {
              event_id: 3,
            },
            {
              event_id: 7,
            },
          ],
        },
      },
    },
  },
];

const companies = [
  {
    name: "Happiest Minds",
    sector: "IT",
    events: {
      create: [
        {
          title: "Software Developement Trainee",
          ctc: "5.4 LPA",
          type: "full-time",
          branches_allowed: ["CSE", "ISE"],
        },
        {
          title: "Software Developer",
          ctc: "6 LPA",
          type: "full-time",
          branches_allowed: ["CSE", "ISE"],
        },
      ],
    },
  },
  {
    name: "HashedIn",
    sector: "IT",
  },
  {
    name: "Prestyn",
    sector: "healthcare",
  },
  {
    name: "Goldman Sachs",
    sector: "Information Technology",
  },
  {
    name: "P&C Tech",
    sector: "Manufacturing",
  },
  {
    name: "Proxelera powered by AMD",
    sector: "Engineering",
  },
  {
    name: "Robosoft",
    sector: "Information Technology",
  },
  {
    name: "Wipro",
    sector: "Information Technology",
  },
];

export { users, companies };
