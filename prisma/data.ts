const users = [
  {
    id: "cl3s5w3jk000009m81d9j0wv3",
    email: "Rob@gmail.com",
  },
  {
    id: "cl3s5wva1000109m8gf2k3pmv",
    email: "Mary@gmail.com",
  },
];

const students = [
  {
    name: "Rob",
    usn: "4VV18EC01",
    branch: "EC",
    gender: "M",
    email: "Rob@gmail.com",
    image: "robImage",
    userId: "cl3s5w3jk000009m81d9j0wv3",
  },
  {
    name: "Mary",
    usn: "4VV18IS01",
    branch: "ISE",
    gender: "F",
    email: "Mary@gmail.com",
    image: "MaryImage",
    userId: "cl3s5wva1000109m8gf2k3pmv",
  },
];

const companies = [
  {
    name: "Happiest Minds",
    sector: "IT",
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
  {
    company_id: 3,
    title: "Analytics",
    ctc: "9 LPA",
    type: "full-time",
    branches_allowed: ["CSE", "ISE"],
  },
  {
    company_id: 4,
    title: "Android Developer",
    ctc: "7 LPA",
    type: "full-time",
    branches_allowed: ["CSE", "ISE", "EC", "EEE"],
  },
  {
    company_id: 5,
    title: "Trainee Engineer",
    ctc: "3 LPA",
    type: "full-time",
    branches_allowed: ["EEE"],
  },
  {
    company_id: 7,
    title: "Software Developer",
    ctc: "4 LPA",
    type: "full-time",
    branches_allowed: ["CSE", "ISE"],
  },
  {
    company_id: 8,
    title: "Hardware Specialist",
    ctc: "3.6 LPA",
    type: "full-time",
    branches_allowed: ["EEE"],
  },
  {
    company_id: 8,
    title: "Graudate Trainee Enginner",
    ctc: "3.6 LPA",
    type: "full-time",
    branches_allowed: ["CSE", "ISE", "EC"],
  },
];

const offers = [
  {
    ctc: "5.4LPA",
    offer_letter: "a",
    studentEmail: "Mary@gmail.com",
    event_id: 1,
  },
  {
    ctc: "5.4LPA",
    offer_letter: "b",
    studentEmail: "Rob@gmail.com",
    event_id: 1,
  },
  {
    ctc: "6LPA",
    offer_letter: "c",
    studentEmail: "Mary@gmail.com",
    event_id: 3,
  },
  {
    ctc: "9LPA",
    offer_letter: "d",
    studentEmail: "Rob@gmail.com",
    event_id: 4,
  },
  {
    ctc: "7LPA",
    offer_letter: "e",
    studentEmail: "Rob@gmail.com",
    event_id: 5,
  },
  {
    ctc: "4LPA",
    offer_letter: "f",
    studentEmail: "Mary@gmail.com",
    event_id: 7,
  },
];
const studentEnrollment = [
  {
    studentEmail: "Mary@gmail.com",
    event_id: 1,
  },
  {
    studentEmail: "Rob@gmail.com",
    event_id: 1,
  },
  {
    studentEmail: "Mary@gmail.com",
    event_id: 3,
  },
  {
    studentEmail: "Rob@gmail.com",
    event_id: 4,
  },
  {
    studentEmail: "Rob@gmail.com",
    event_id: 5,
  },
  {
    studentEmail: "Mary@gmail.com",
    event_id: 7,
  },
];

export { users, students, companies, events, offers, studentEnrollment };
