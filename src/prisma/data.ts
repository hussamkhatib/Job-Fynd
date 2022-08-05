import {
  Board,
  EligibiltyOfferCount,
  Gender,
  ScoreType,
  Branch,
} from "@prisma/client";

const users = [
  {
    id: "cl3s5w3jk000009m81d9j0wv3",
    email: "Rob@gmail.com",
    details: {
      create: {
        offer: {
          create: [
            {
              ctc: "5.4LPA",
              offer_letter: "b",
              event_id: "cl5q9t33d000009jiayn359rh",
            },
            {
              ctc: "9LPA",
              offer_letter: "d",
              event_id: "cl5q9y1tq000309jig5lf1b6p",
            },
            {
              ctc: "7LPA",
              offer_letter: "e",
              event_id: "cl5q9yius000409jid1bd9jek",
            },
          ],
        },
        applied_jobs: {
          create: [
            {
              event_id: "cl5q9t33d000009jiayn359rh",
            },
            {
              event_id: "cl5q9y1tq000309jig5lf1b6p",
            },
            {
              event_id: "cl5q9yius000409jid1bd9jek",
            },
          ],
        },
        studentRecord: {
          create: {
            name: "Rob",
            usn: "4VV18EC01",
            branch: Branch.EC,
            gender: Gender.Male,
            email: "Rob@gmail.com",
            image: "robImage",
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
            sslcmarksSheet: "./some-link to marks sheet",
            pucboard: Board.STATE,
            pucscoreType: ScoreType.Percentage,
            pucscore: "75.12%",
            pucmarksSheet: "./some-link to marks sheet",
            graduationSem1score: "sem1",
            graduationSem1MarksSheet: "sem1marksSheet",
            graduationSem2score: "sem2",
            graduationSem2MarksSheet: "sem2marksSheet",
            graduationSem3score: "sem3",
            graduationSem3MarksSheet: "sem3marksSheet",
            graduationSem4score: "sem4",
            graduationSem4MarksSheet: "sem4marksSheet",
            graduationSem5score: "sem5",
            graduationSem5MarksSheet: "sem5marksSheet",
            graduationSem6score: "sem6",
            graduationSem6MarksSheet: "sem6marksSheet",
            graduationSem7score: "sme7",
            graduationSem7MarksSheet: "sem7marksSheet",
            graduationSem8score: "sem8",
            graduationSem8MarksSheet: "sem8marksSheet",
          },
        },
      },
    },
  },
  {
    id: "cl3s5wva1000109m8gf2k3pmv",
    email: "Mary@gmail.com",
    details: {
      create: {
        offer: {
          create: [
            {
              ctc: "5.4LPA",
              offer_letter: "a",
              event_id: "cl5q9t33d000009jiayn359rh",
            },
            {
              ctc: "6LPA",
              offer_letter: "c",
              event_id: "cl5q9ve0w000109jigyl0a9gw",
            },
            {
              ctc: "4LPA",
              offer_letter: "f",
              event_id: "cl5q9z9c9000509ji2lu88334",
            },
          ],
        },
        applied_jobs: {
          create: [
            {
              event_id: "cl5q9t33d000009jiayn359rh",
            },
            {
              event_id: "cl5q9ve0w000109jigyl0a9gw",
            },
            {
              event_id: "cl5q9z9c9000509ji2lu88334",
            },
          ],
        },
        studentRecord: {
          create: {
            name: "Mary",
            usn: "4VV18IS01",
            branch: Branch.ISE,
            gender: Gender.Female,
            email: "Mary@gmail.com",
            image: "MaryImage",
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
            sslcmarksSheet: "./some-link to marks sheet",
            diplomaSems1score: "marydiplsem1",
            diplomaSems1MarksSheet: "marydiplsem1markssheet",
            diplomaSems2score: "marydiplsem2",
            diplomaSems2MarksSheet: "marydiplsem2markssheet",
            diplomaSems3score: "marydiplsem3",
            diplomaSems3MarksSheet: "marydiplsem3markssheet",
            diplomaSems4score: "marydiplsem4",
            diplomaSems4MarksSheet: "marydiplsem4markssheet",
            diplomaSems5score: "marydiplsem5",
            diplomaSems5MarksSheet: "marydiplsem5markssheet",
            diplomaSems6score: "marydiplsem6",
            diplomaSems6MarksSheet: "marydiplsem6markssheet",
            graduationSem1score: "marygradsem1",
            graduationSem1MarksSheet: "marygradsem1sheet",
            graduationSem2score: "marygradsem2",
            graduationSem2MarksSheet: "marygradsem2sheet",
            graduationSem3score: "marygradsem3",
            graduationSem3MarksSheet: "marygradsem3sheet",
            graduationSem4score: "marygradsem4",
            graduationSem4MarksSheet: "marygradsem4sheet",
            graduationSem5score: "marygradsem5",
            graduationSem5MarksSheet: "marygradsem5sheet",
            graduationSem6score: "marygradsem6",
            graduationSem6MarksSheet: "marygradsem6sheet",
          },
        },
      },
    },
  },
  {
    id: "cl3s5w3jk000009m81d9j0wui",
    email: "EC@gmail.com",
    details: {
      create: {
        offer: {
          create: [
            {
              ctc: "4LPA",
              offer_letter: "ec_offer",
              event_id: "cl5q9yius000409jid1bd9jek",
            },
          ],
        },
        applied_jobs: {
          create: [
            {
              event_id: "cl5q9t33d000009jiayn359rh",
            },
            {
              event_id: "cl5q9yius000409jid1bd9jek",
            },
          ],
        },
        studentRecord: {
          create: {
            name: "EC",
            usn: "4VV18EC02",
            branch: Branch.EC,
            gender: Gender.Male,
            email: "EC@gmail.com",
            image: "ECImage",
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
            sslcmarksSheet: "./some-link",
            pucboard: Board.STATE,
            pucscoreType: ScoreType.Percentage,
            pucscore: "75%",
            pucmarksSheet: "./ec-marks sheet",
            graduationSem1score: "ecsem1",
            graduationSem1MarksSheet: "ecsem1sheet",
            graduationSem2score: "ecsem2",
            graduationSem2MarksSheet: "ecsem2sheet",
            graduationSem3score: "ecsem3",
            graduationSem3MarksSheet: "ecsem3sheet",
            graduationSem4score: "ecsem4",
            graduationSem4MarksSheet: "ecsem4sheet",
            graduationSem5score: "ecsem5",
            graduationSem5MarksSheet: "ecsem5sheet",
            graduationSem6score: "ecsem6",
            graduationSem6MarksSheet: "ecsem6sheet",
            graduationSem7score: "ecsem7",
            graduationSem7MarksSheet: "ecsem7sheet",
            graduationSem8score: "ecsem8",
            graduationSem8MarksSheet: "ecsem8sheet",
          },
        },
      },
    },
  },
  {
    id: "113s5w3jk000009m81d9j0wui",
    email: "CV@gmail.com",
    details: {
      create: {
        applied_jobs: {
          create: [
            {
              event_id: "cl5q9yius000409jid1bd9jek",
            },
          ],
        },
        studentRecord: {
          create: {
            name: "CV",
            usn: "4VV1CV02",
            branch: Branch.CV,
            gender: Gender.Other,
            email: "CV@gmail.com",
            image: "CVImage",
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
            sslcmarksSheet: "./cvsome-link",
            pucboard: Board.STATE,
            pucscoreType: ScoreType.Percentage,
            pucscore: "9%",
            pucmarksSheet: "./cv-marks sheet",
            graduationSem1score: "cvsem1",
            graduationSem1MarksSheet: "cvsem1sheet",
            graduationSem2score: "cvsem2",
            graduationSem2MarksSheet: "cvsem2heet",
            graduationSem3score: "cvsem3",
            graduationSem3MarksSheet: "cvsem3sheet",
            graduationSem4score: "cvsem4",
            graduationSem4MarksSheet: "cvsem4sheet",
            graduationSem5score: "cvsem5",
            graduationSem5MarksSheet: "cvsem5sheet",
            graduationSem6score: "cvsem6",
            graduationSem6MarksSheet: "cvsem6sheet",
            graduationSem7score: "cvsem7",
            graduationSem7MarksSheet: "cvsem7sheet",
            graduationSem8score: "cvsem8",
            graduationSem8MarksSheet: "cvsem8sheet",
          },
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
          id: "cl5q9t33d000009jiayn359rh",
          title: "Software Developement Trainee",
          ctc: "5.4 LPA",
          type: "full-time",
          branches_allowed: {
            create: [
              {
                name: Branch.ISE,
              },
              {
                name: Branch.CSE,
              },
            ],
          },
          eligibilityOfferCount: EligibiltyOfferCount.openforall,
        },
        {
          id: "cl5q9xkej000209jif9r26qbs",
          title: "Software Developer",
          ctc: "6 LPA",
          type: "full-time",
          branches_allowed: {
            create: [
              {
                name: Branch.ISE,
              },
              {
                name: Branch.CSE,
              },
            ],
          },
          eligibilityOfferCount: EligibiltyOfferCount.atmost1,
        },
      ],
    },
  },
  {
    name: "HashedIn",
    sector: "IT",
    events: {
      create: [
        {
          id: "cl5q9ve0w000109jigyl0a9gw",
          title: "Intern Developer",
          ctc: "3.2LPA",
          type: "internship",
          branches_allowed: {
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
          eligibilityOfferCount: EligibiltyOfferCount.atmost1,
        },
        {
          id: "cl5q9y1tq000309jig5lf1b6p",
          title: "Software Developer",
          ctc: "8.1LPA",
          type: "intership + full-time",
          branches_allowed: {
            create: [
              {
                name: Branch.ISE,
              },
              {
                name: Branch.CSE,
              },
            ],
          },
          eligibilityOfferCount: EligibiltyOfferCount.openforall,
        },
      ],
    },
  },
  {
    name: "Prestyn",
    sector: "healthcare",
    events: {
      create: [
        {
          id: "cl5q9yius000409jid1bd9jek",
          title: "Nurse",
          ctc: "16 LPA",
          type: "full-time",
          branches_allowed: {
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
          eligibilityOfferCount: EligibiltyOfferCount.openforall,
        },
      ],
    },
  },
  {
    name: "Goldman Sachs",
    sector: "Information Technology",
    events: {
      create: [
        {
          id: "cl5q9z9c9000509ji2lu88334",
          title: "Graduate Engineer",
          ctc: "7 LPA",
          type: "full-time",
          branches_allowed: {
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
          title: "Graduate Trainee",
          ctc: "4 LPA",
          type: "full-time",
          branches_allowed: {
            create: [
              {
                name: Branch.ISE,
              },
            ],
          },
          eligibilityOfferCount: EligibiltyOfferCount.openforall,
        },
      ],
    },
  },
  {
    name: "P&C Tech",
    sector: "Manufacturing",
  },
  {
    name: "Proxelera powered by AMD",
    sector: "Engineering",
    events: {
      create: [
        {
          id: "cl5qa1sc2000b09jie4foeleq",
          title: "AL Engineer",
          ctc: "6.6 LPA",
          type: "full-time",
          branches_allowed: {
            create: [
              {
                name: Branch.CSE,
              },
            ],
          },
          eligibilityOfferCount: EligibiltyOfferCount.atmost2,
        },
      ],
    },
  },
  {
    name: "Robosoft",
    sector: "Information Technology",
    events: {
      create: [
        {
          id: "cl5qa1jqe000a09jif2r00etu",
          title: "Tech Lead",
          ctc: "10 LPA",
          type: "full-time",
          branches_allowed: {
            create: [
              {
                name: Branch.EEE,
              },
            ],
          },
          eligibilityOfferCount: EligibiltyOfferCount.zero,
        },
        {
          id: "cl5qa19vr000909ji52v66be6",
          title: "PPT Maker",
          ctc: "3 LPA",
          type: "internship",
          branches_allowed: {
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
          eligibilityOfferCount: EligibiltyOfferCount.openforall,
        },
      ],
    },
  },
  {
    name: "Wipro",
    sector: "Information Technology",
    events: {
      create: [
        {
          id: "cl5qa14kx000809jiaim1an2e",
          title: "Generalist",
          ctc: "5 LPA",
          type: "full-time",
          branches_allowed: {
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
          eligibilityOfferCount: EligibiltyOfferCount.zero,
        },
      ],
    },
  },
];

export { users, companies };
