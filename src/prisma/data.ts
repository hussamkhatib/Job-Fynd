import {
  Board,
  EligibiltyOfferCount,
  Gender,
  ScoreType,
  Branch,
  Status,
} from "@prisma/client";

const users = [
  {
    id: "cl3s5w3jk000009m81d9j0wv3",
    email: "Rob@gmail.com",
    offer: {
      create: [
        {
          ctc: 5.4,
          offerLetter: {},
          eventId: "cl5q9t33d000009jiayn359rh",
        },
        {
          ctc: 9,
          offerLetter: {},
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          ctc: 7,
          offerLetter: {},
          eventId: "cl5q9yius000409jid1bd9jek",
        },
      ],
    },
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9t33d000009jiayn359rh",
        },
        {
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          eventId: "cl5q9yius000409jid1bd9jek",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Rob",
        usn: "4VV18EC01",
        branch: Branch.EC,
        gender: Gender.Male,
        personalEmail: "Rob@gmail.com",
        image:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/some-resume",
        phoneNumber: "9103283232",
        parentsPhoneNumber: "9103283231",
        PermanentAddress:
          "Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.",
        currentAddress:
          "Cecilia Chapman 711-2880 Nulla St.Mankato Mississippi 96522 (257) 563-7401",
        pinCode: "570001",
        bloodGroup: "O+",
        panCardNumber: "ALWPG5809L",
        voterId: "1231bhfsb",
        adharCard: "aiahudh",
        passportNumber: "19731391931",
        sslcboard: Board.CBSE,
        sslcscoreType: ScoreType.CGPA,
        sslcscore: "8.8",
        pucboard: Board.STATE,
        pucscoreType: ScoreType.Percentage,
        pucscore: "75.12%",
      },
    },
  },

  {
    id: "cl3s5wva1000109m8gf2k3pmv",
    email: "Mary@gmail.com",
    offer: {
      create: [
        {
          ctc: 5.4,
          offerLetter: {},
          eventId: "cl5q9t33d000009jiayn359rh",
        },
        {
          ctc: 6,
          offerLetter: {},
          eventId: "cl5q9ve0w000109jigyl0a9gw",
        },
        {
          ctc: 4,
          offerLetter: {},
          eventId: "cl5q9z9c9000509ji2lu88334",
        },
      ],
    },
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9t33d000009jiayn359rh",
        },
        {
          eventId: "cl5q9ve0w000109jigyl0a9gw",
        },
        {
          eventId: "cl5q9z9c9000509ji2lu88334",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Mary",
        usn: "4VV18IS01",
        branch: Branch.ISE,
        gender: Gender.Female,
        personalEmail: "Mary@gmail.com",
        image:
          "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/maries-resume",
        phoneNumber: "9103283233",
        parentsPhoneNumber: "9103283234",
        PermanentAddress:
          "Calista Wise 7292 Dictum Av.San Antonio MI 47096(492) 709-6392",
        currentAddress:
          "Keefe Sellers 347-7666 Iaculis St.Woodruff SC 49854(468) 353-2641",
        pinCode: "570001",
        bloodGroup: "A",
        panCardNumber: "ALWPG580912",
        voterId: "12adabhfsb",
        adharCard: "ai1213vsfudh",
        passportNumber: "3240248272",

        sslcboard: Board.CBSE,
        sslcscoreType: ScoreType.CGPA,
        sslcscore: "7.2",
        // sslcmarksSheet: "./some-link to marks sheet",
        // diplomaSems1score: "marydiplsem1",
        // diplomaSems1MarksSheet: "marydiplsem1markssheet",
        // diplomaSems2score: "marydiplsem2",
        // diplomaSems2MarksSheet: "marydiplsem2markssheet",
        // diplomaSems3score: "marydiplsem3",
        // diplomaSems3MarksSheet: "marydiplsem3markssheet",
        // diplomaSems4score: "marydiplsem4",
        // diplomaSems4MarksSheet: "marydiplsem4markssheet",
        // diplomaSems5score: "marydiplsem5",
        // diplomaSems5MarksSheet: "marydiplsem5markssheet",
        // diplomaSems6score: "marydiplsem6",
        // diplomaSems6MarksSheet: "marydiplsem6markssheet",
        // graduationSem1score: "marygradsem1",
        // graduationSem1MarksSheet: "marygradsem1sheet",
        // graduationSem2score: "marygradsem2",
        // graduationSem2MarksSheet: "marygradsem2sheet",
        // graduationSem3score: "marygradsem3",
        // graduationSem3MarksSheet: "marygradsem3sheet",
        // graduationSem4score: "marygradsem4",
        // graduationSem4MarksSheet: "marygradsem4sheet",
        // graduationSem5score: "marygradsem5",
        // graduationSem5MarksSheet: "marygradsem5sheet",
        // graduationSem6score: "marygradsem6",
        // graduationSem6MarksSheet: "marygradsem6sheet",
      },
    },
  },

  {
    id: "cl3s5w3jk000009m81d9j0wui",
    email: "EC@gmail.com",
    offer: {
      create: [
        {
          ctc: 4,
          offerLetter: {},
          eventId: "cl5q9yius000409jid1bd9jek",
        },
      ],
    },
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9t33d000009jiayn359rh",
        },
        {
          eventId: "cl5q9yius000409jid1bd9jek",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "EC",
        usn: "4VV18EC02",
        branch: Branch.EC,
        gender: Gender.Male,
        personalEmail: "EC@gmail.com",
        image:
          "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/ec-resume",
        phoneNumber: "01381392",
        parentsPhoneNumber: "19316393",
        PermanentAddress:
          "EC Address, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.",
        currentAddress:
          "EC Address 711-2880 Nulla St.Mankato Mississippi 96522 (257) 563-7401",
        pinCode: "570002",
        bloodGroup: "O+",
        panCardNumber: "ALWPadja5809L",
        voterId: "1231bhfdajsb",
        adharCard: "aiahuadajdh",
        passportNumber: "19131391931",
        sslcboard: Board.CBSE,
        sslcscoreType: ScoreType.CGPA,
        sslcscore: "9",
        // sslcmarksSheet: "./some-link",
        pucboard: Board.STATE,
        pucscoreType: ScoreType.Percentage,
        pucscore: "75%",
        // pucmarksSheet: "./ec-marks sheet",
        // graduationSem1score: "ecsem1",
        // graduationSem1MarksSheet: "ecsem1sheet",
        // graduationSem2score: "ecsem2",
        // graduationSem2MarksSheet: "ecsem2sheet",
        // graduationSem3score: "ecsem3",
        // graduationSem3MarksSheet: "ecsem3sheet",
        // graduationSem4score: "ecsem4",
        // graduationSem4MarksSheet: "ecsem4sheet",
        // graduationSem5score: "ecsem5",
        // graduationSem5MarksSheet: "ecsem5sheet",
        // graduationSem6score: "ecsem6",
        // graduationSem6MarksSheet: "ecsem6sheet",
        // graduationSem7score: "ecsem7",
        // graduationSem7MarksSheet: "ecsem7sheet",
        // graduationSem8score: "ecsem8",
        // graduationSem8MarksSheet: "ecsem8sheet",
      },
    },
  },

  {
    id: "113s5w3jk000009m81d9j0wui",
    email: "CV@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9yius000409jid1bd9jek",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "CV",
        usn: "4VV1CV02",
        branch: Branch.CV,
        gender: Gender.Other,
        personalEmail: "CV@gmail.com",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/CV-resume",
        phoneNumber: "CV381392",
        parentsPhoneNumber: "CV316393",
        PermanentAddress:
          "CV Address, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678.",
        currentAddress:
          "CV Address 711-2880 Nulla St.Mankato Mississippi 96522 (257) 563-7401",
        pinCode: "CV0002",
        bloodGroup: "C+",
        panCardNumber: "CVWPadja5809L",
        voterId: "CV31bhfdajsb",
        adharCard: "CVahuadajdh",
        passportNumber: "CV131391931",
        sslcboard: Board.INTERNATIONAL,
        sslcscoreType: ScoreType.Percentage,
        sslcscore: "9",
        // sslcmarksSheet: "./cvsome-link",
        pucboard: Board.STATE,
        pucscoreType: ScoreType.Percentage,
        pucscore: "9%",
        // pucmarksSheet: "./cv-marks sheet",
        // graduationSem1score: "cvsem1",
        // graduationSem1MarksSheet: "cvsem1sheet",
        // graduationSem2score: "cvsem2",
        // graduationSem2MarksSheet: "cvsem2heet",
        // graduationSem3score: "cvsem3",
        // graduationSem3MarksSheet: "cvsem3sheet",
        // graduationSem4score: "cvsem4",
        // graduationSem4MarksSheet: "cvsem4sheet",
        // graduationSem5score: "cvsem5",
        // graduationSem5MarksSheet: "cvsem5sheet",
        // graduationSem6score: "cvsem6",
        // graduationSem6MarksSheet: "cvsem6sheet",
        // graduationSem7score: "cvsem7",
        // graduationSem7MarksSheet: "cvsem7sheet",
        // graduationSem8score: "cvsem8",
        // graduationSem8MarksSheet: "cvsem8sheet",
      },
    },
  },
  // {
  //   id: "07fcf3d3-3d20-45ab-9be7-9e9c559d021e",
  //   email: "ervinhowell@gmail.com",
  //   appliedJobs: {
  //     create: [
  //       {
  //         eventId: "cl5q9yius000409jid1bd9jek",
  //       },
  //     ],
  //   },
  //   studentRecord: {
  //     create: {
  //       name: "Ervin Howell",
  //       usn: "4VV18IS99",
  //       branch: Branch.ISE,
  //       gender: Gender.Other,
  //       personalEmail: "ervinhowell@gmail.com",
  //       image:
  //         "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  //       resume: "/CV-resume",
  //       phoneNumber: "7073656442",
  //       parentsPhoneNumber: "7073656441",
  //       PermanentAddress: "Kulas Light 92998-3874",
  //       currentAddress: "Gwenborough 92998-3874",
  //       pinCode: "92998-3874",
  //       bloodGroup: "O+",
  //       panCardNumber: "CVWPadja5809L",
  //       voterId: "CV31bhfdajsb",
  //       adharCard: "CVahuadajdh",
  //       passportNumber: "CV131391931",
  //       sslcboard: Board.INTERNATIONAL,
  //       sslcscoreType: ScoreType.Percentage,
  //       sslcscore: "9",
  //       pucboard: Board.STATE,
  //       pucscoreType: ScoreType.Percentage,
  //       pucscore: "9%",
  //     },
  //   },
  // },
];

const companies = [
  {
    id: "cl6yjj4n2000009ky0onu6fr8",
    name: "Happiest Minds",
    sector: "IT",
  },
  {
    id: "cl6yjqco7000109kygze3604l",
    name: "HashedIn",
    sector: "IT",
  },
  {
    id: "cl6yjqxgd000209kyedfa85kq",
    name: "Prestyn",
    sector: "healthcare",
  },
  {
    id: "cl6yjr5ey000309kyf9w65rm4",
    name: "Goldman Sachs",
    sector: "Consultancy",
  },
  {
    id: "cl6yjs10l000409kye15s82vp",
    name: "P&C Tech",
    sector: "Manufacturing",
  },
  {
    id: "cl6yjs3kd000509ky4wazdi6m",
    name: "Proxelera powered by AMD",
    sector: "Engineering",
  },
  {
    id: "cl6yjsgu9000609ky11do1ka4",
    name: "Robosoft",
    sector: "Consultancy",
  },
  {
    id: "cl6yjsmi5000709kybhteh093",
    name: "Wipro",
    sector: "Consultancy",
  },
  {
    id: "cl6yjuewq000809kye4ot7uur",
    name: "Atlassian",
    sector: "Productivity",
  },
  {
    id: "cl6yjujsg000909ky5tn85yqp",
    name: "Hopstack",
    sector: "AI",
  },
  {
    id: "cl6yjuore000a09ky2w93667o",
    name: "Commutatus",
    sector: "hardware",
  },
  {
    id: "cl6yjuubt000b09ky9kr6bpm9",
    name: "Brigade",
    sector: "Construction",
  },
];

const events = [
  {
    id: "cl5q9t33d000009jiayn359rh",
    companyId: "cl6yjj4n2000009ky0onu6fr8", // Happiest Minds
    title: "Software Developement Trainee",
    ctc: 5.4,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl5q9xkej000209jif9r26qbs",
    companyId: "cl6yjj4n2000009ky0onu6fr8", // Happiest Minds
    title: "Software Developer",
    ctc: 6,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
      ],
    },
    status: Status.Close,
    eligibilityOfferCount: EligibiltyOfferCount.atmost1,
  },
  {
    id: "cl5q9ve0w000109jigyl0a9gw",
    companyId: "cl6yjqco7000109kygze3604l", // HashedIn
    title: "Intern Developer",
    ctc: 3.2,
    type: "internship",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
        {
          name: Branch.EEE,
        },
        {
          name: Branch.EC,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.atmost1,
  },
  {
    id: "cl5q9y1tq000309jig5lf1b6p",
    companyId: "cl6yjqco7000109kygze3604l", // HashedIn
    title: "Software Developer",
    ctc: 8.1,
    type: "intership + full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl5q9yius000409jid1bd9jek",
    companyId: "cl6yjqxgd000209kyedfa85kq", //Prestyn
    title: "Nurse",
    ctc: 16,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
        {
          name: Branch.EEE,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl5q9z9c9000509ji2lu88334",
    companyId: "cl6yjr5ey000309kyf9w65rm4", // Goldman Sachs
    title: "Graduate Engineer",
    ctc: 7,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.EC,
        },
      ],
    },
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl5qa02em000709ji33rw8cv3",
    companyId: "cl6yjr5ey000309kyf9w65rm4", // Goldman Sachs
    title: "Graduate Trainee",
    ctc: 4,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
      ],
    },
    status: Status.Close,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl5qa1sc2000b09jie4foeleq",
    companyId: "cl6yjs3kd000509ky4wazdi6m", // Proxelera powered by AMD
    title: "AL Engineer",
    ctc: 6.6,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.CSE,
        },
      ],
    },
    eligibilityOfferCount: EligibiltyOfferCount.atmost2,
  },
  {
    id: "cl5qa1jqe000a09jif2r00etu",
    companyId: "cl6yjsgu9000609ky11do1ka4", // Robosoft
    title: "Tech Lead",
    ctc: 10,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.EEE,
        },
      ],
    },
    status: Status.Close,
    eligibilityOfferCount: EligibiltyOfferCount.zero,
  },
  {
    id: "cl5qa19vr000909ji52v66be6",
    companyId: "cl6yjsgu9000609ky11do1ka4", // Robosoft
    title: "PPT Maker",
    ctc: 3,
    type: "internship",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
        {
          name: Branch.EEE,
        },
        {
          name: Branch.EC,
        },
      ],
    },
    status: Status.Close,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl5qa14kx000809jiaim1an2e",
    companyId: "cl6yjsmi5000709kybhteh093", // Wipro
    title: "Generalist",
    ctc: 5,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
        {
          name: Branch.EEE,
        },
        {
          name: Branch.EC,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.zero,
  },
  {
    id: "cl6xgg35t000009l04kde254q",
    companyId: "cl6yjuewq000809kye4ot7uur", // Atlassian
    title: "Senior Data Scientist",
    ctc: 30,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
      ],
    },
    status: Status.Close,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl6xgl0ow000109l0ci5n4sob",
    companyId: "cl6yjujsg000909ky5tn85yqp", // Hopstack
    title: "Sales Development Intern",
    ctc: 3,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
        {
          name: Branch.EEE,
        },
        {
          name: Branch.EC,
        },
        {
          name: Branch.ME,
        },
        {
          name: Branch.AIML,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl6xgl5gj000209l04cr4a5ep",
    companyId: "cl6yjujsg000909ky5tn85yqp", // Hopstack
    title: "Founder's Office Intern",
    ctc: 0.5,
    type: "intership",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
        {
          name: Branch.EEE,
        },
        {
          name: Branch.EC,
        },
        {
          name: Branch.ME,
        },
        {
          name: Branch.AIML,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl6xgmppx000309l023ycdfea",
    companyId: "cl6yjujsg000909ky5tn85yqp", // Hopstack
    title: "Software Engineer - SDE 1",
    ctc: 12,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.ISE,
        },
        {
          name: Branch.CSE,
        },
        {
          name: Branch.AIML,
        },
      ],
    },
    status: Status.Close,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl6xgpwrw000409l00syc3pxt",
    companyId: "cl6yjuore000a09ky2w93667o", // Commutatus
    title: "Electrical Engineer",
    ctc: 5,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.EEE,
        },
        {
          name: Branch.EC,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.zero,
  },
  {
    id: "cl6xguxb0000609l07776en65",
    companyId: "cl6yjuore000a09ky2w93667o", // Commutatus
    title: "Electrical Engineer Trainee",
    ctc: 3,
    type: "intership",
    branchesAllowed: {
      create: [
        {
          name: Branch.EEE,
        },
        {
          name: Branch.EC,
        },
        {
          name: Branch.ME,
        },
      ],
    },
    status: Status.Close,
    eligibilityOfferCount: EligibiltyOfferCount.openforall,
  },
  {
    id: "cl6xgsog3000509l0adrhdodt",
    companyId: "cl6yjuubt000b09ky9kr6bpm9", // Brigade
    title: "Civil Engineer",
    ctc: 3.3,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.CV,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.atmost1,
  },
];

export { users, events, companies };
