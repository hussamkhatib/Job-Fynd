const students = [
  {
    name: "Hussam",
    phone: "+9108410511",
    email: "hussam@gmail.com",
    usn: "4VV18CS079",
    opted: true,
    validated: true,
    resume: "1",
    branch_id: 1,
  },
  {
    name: "Nouman ",
    phone: "+9108410512",
    email: "nouman@gmail.com",
    usn: "4VV18CS080",
    opted: false,
    validated: false,
    resume: "2",
    branch_id: 2,
  },
  {
    name: "Roshan",
    phone: "+9108410513",
    email: "roshan@gmail.com",
    usn: "4VV18CS081",
    opted: true,
    validated: true,
    resume: "3",
    branch_id: 3,
  },
  {
    name: "Saqlain",
    phone: "+9108410514",
    email: "saqlain@gmail.com",
    usn: "4VV18CS082",
    opted: false,
    validated: true,
    resume: "4",
    branch_id: 4,
  },
];

const companies = [
  {
    name: "Happiest Minds",
    logo: "https:dkanda",
    sector: "IT",
  },
  {
    name: "HashedIn",
    logo: "https:dkandaa",
    sector: "IT",
  },
  {
    name: "Prestyn",
    logo: "asadaduau",
    sector: "healthcare",
  },
];

const events = [
  {
    company_id: 1,
    title: "Software Developement Trainee",
    ctc: "5.4 LPA",
    type: "full-time",
    last_date_to_apply: "2022-05-09T11:14:35.440Z",
  },
  {
    company_id: 2,
    title: "Sofware Enginner",
    ctc: "8.1 LPA",
    type: "intership + fulltime",
    last_date_to_apply: "2022-05-09T11:14:35.440Z",
  },
];

const offers = [
  {
    ctc: "5.4LPA",
    offer_letter: "./some-link",
    student_id: 2,
    company_id: 1,
  },
];
const branches = [
  {
    name: "CSE",
  },
  {
    name: "ISE",
  },
  {
    name: "EC",
  },
  {
    name: "EEE",
  },
];

export { students, companies, events, offers, branches };
