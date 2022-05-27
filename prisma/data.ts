const students = [
  {
    name: "Person 1",
    phone: "+9108410511",
    email: "person1@gmail.com",
    usn: "4VV18CS079",
    resume: "1",
    branch: "CSE",
  },
  {
    name: "Person 2",
    phone: "+9108410512",
    email: "perosn2@gmail.com",
    usn: "4VV18CS080",

    resume: "2",
    branch: "ISE",
  },
  {
    name: "person3",
    phone: "+9108410513",
    email: "person3@gmail.com",
    usn: "4VV18CS081",
    resume: "3",
    branch: "EC",
  },
  {
    name: "person4",
    phone: "+9108410514",
    email: "person4@gmail.com",
    usn: "4VV18CS082",

    resume: "4",
    branch: "CSE",
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
    branches_allowed: ["CSE", "ISE"],
  },
  {
    company_id: 2,
    title: "Sofware Enginner",
    ctc: "8.1 LPA",
    type: "intership + fulltime",
    branches_allowed: ["CSE", "EC"],
  },
  {
    company_id: 1,
    title: "Software Developer",
    ctc: "6 LPA",
    type: "full-time",
    branches_allowed: ["CSE", "ISE"],
  },
];

const offers = [
  {
    ctc: "5.4LPA",
    offer_letter: "some-link",
    student_id: 1,
    event_id: 1,
  },
  {
    ctc: "5.4LPA",
    offer_letter: "./some-link",
    student_id: 2,
    event_id: 1,
  },
  {
    ctc: "6LPA",
    offer_letter: ".some-link",
    student_id: 2,
    event_id: 3,
  },
];

const studentEnrollment = [
  {
    student_id: 1,
    event_id: 1,
  },
  {
    student_id: 1,
    event_id: 2,
  },
  {
    student_id: 2,
    event_id: 3,
  },
];

export { students, companies, events, offers, studentEnrollment };
