const users = [
  {
    image: "fakerImg",
    name: "Admin 1",
    email: "admin1@gmail.com",
  },
  {
    image: "fakerImg",
    name: "Person 1",
    phone: "+9108410511",
    email: "person1@gmail.com",
    usn: "4VV18CS079",
    resume:
      "https://cdn.pixabay.com/photo/2017/10/31/00/23/portfolio-2903909_960_720.png",
    branch: "CSE",
  },
  {
    image: "fakerImg",
    name: "Person 2",
    phone: "+9108410512",
    email: "perosn2@gmail.com",
    usn: "4VV18CS080",
    resume:
      "https://cdn.pixabay.com/photo/2017/05/09/00/15/resume-2296951__340.png",
    branch: "CSE",
  },
  {
    image: "fakerImg",
    name: "person3",
    phone: "+9108410513",
    email: "person3@gmail.com",
    usn: "4VV18CS081",
    resume:
      "https://cdn.pixabay.com/photo/2018/08/13/22/53/resume-3604240__340.jpg",
    branch: "CSE",
  },
  {
    image: "fakerImg",
    name: "person4",
    phone: "+9108410514",
    email: "person4@gmail.com",
    usn: "4VV18CS082",
    resume:
      "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799955__340.png",
    branch: "CSE",
  },
  {
    image: "fakerImg",
    name: "person5",
    phone: "+8108411512",
    email: "person5@gmail.com",
    usn: "4VV18CS083",
    resume:
      "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799954__340.png",
    branch: "CSE",
  },
  {
    image: "fakerImg",
    name: "person6",
    phone: "+810841152121",
    email: "person6@gmail.com",
    usn: "4VV18CS084",
    resume:
      "https://cdn.pixabay.com/photo/2016/11/05/11/15/resume-1799953__340.png",
    branch: "CSE",
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
    student_id: 1,
    event_id: 1,
  },
  {
    ctc: "5.4LPA",
    offer_letter: "b",
    student_id: 2,
    event_id: 1,
  },
  {
    ctc: "6LPA",
    offer_letter: "c",
    student_id: 2,
    event_id: 3,
  },
  {
    ctc: "9LPA",
    offer_letter: "d",
    student_id: 6,
    event_id: 4,
  },
  {
    ctc: "7LPA",
    offer_letter: "e",
    student_id: 6,
    event_id: 5,
  },
  {
    ctc: "4LPA",
    offer_letter: "f",
    student_id: 4,
    event_id: 7,
  },
];

const studentEnrollment = [
  {
    student_id: 1,
    event_id: 1,
  },
  {
    student_id: 2,
    event_id: 1,
  },
  {
    student_id: 2,
    event_id: 3,
  },
  {
    student_id: 6,
    event_id: 4,
  },
  {
    student_id: 6,
    event_id: 5,
  },
  {
    student_id: 4,
    event_id: 7,
  },
  {
    student_id: 3,
    event_id: 8,
  },
  {
    student_id: 1,
    event_id: 9,
  },
  {
    student_id: 2,
    event_id: 9,
  },
  {
    student_id: 6,
    event_id: 9,
  },
  {
    student_id: 2,
    event_id: 6,
  },
];

export { users, companies, events, offers, studentEnrollment };
