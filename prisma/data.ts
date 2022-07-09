import { Board, EligibiltyOfferCount, Gender, ScoreType } from "@prisma/client";

const users = [
  {
    id: "cl3s5w3jk000009m81d9j0wv3",
    email: "Rob@gmail.com",
    details: {
      create: {
        name: "Rob",
        usn: "4VV18EC01",
        branch: "EC",
        gender: Gender.Male,
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
        studentRecord: {
          create: {
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
            graduation: {
              create: {
                sem1: "sem1",
                sem1MarksSheet: "sem1marksSheet",
                sem2: "sem2",
                sem2MarksSheet: "sem2marksSheet",
                sem3: "sem3",
                sem3MarksSheet: "sem3marksSheet",
                sem4: "sem4",
                sem4MarksSheet: "sem4marksSheet",
                sem5: "sem5",
                sem5MarksSheet: "sem5marksSheet",
                sem6: "sem6",
                sem6MarksSheet: "sem6marksSheet",
                sem7: "sem7",
                sem7MarksSheet: "sem7marksSheet",
                sem8: "sem8",
                sem8MarksSheet: "sem8marksSheet",
              },
            },
            sslc: {
              create: {
                board: Board.CBSE,
                scoreType: ScoreType.CGPA,
                score: "8.8",
                marksSheet: "./some-link to marks sheet",
              },
            },
            puc: {
              create: {
                board: Board.STATE,
                scoreType: ScoreType.Percentage,
                score: "75.12%",
                marksSheet: "./some-link to marks sheet",
              },
            },
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
        name: "Mary",
        usn: "4VV18IS01",
        branch: "ISE",
        gender: Gender.Female,
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
        studentRecord: {
          create: {
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
            graduation: {
              create: {
                sem1: "sem1",
                sem1MarksSheet: "sem1marksSheet",
                sem2: "sem2",
                sem2MarksSheet: "sem2marksSheet",
                sem3: "sem3",
                sem3MarksSheet: "sem3marksSheet",
                sem4: "sem4",
                sem4MarksSheet: "sem4marksSheet",
                sem5: "sem5",
                sem5MarksSheet: "sem5marksSheet",
                sem6: "sem6",
                sem6MarksSheet: "sem6marksSheet",
              },
            },
            diploma: {
              create: {
                sem1: "sem1",
                sem1MarksSheet: "sem1marksSheet",
                sem2: "sem2",
                sem2MarksSheet: "sem2marksSheet",
                sem3: "sem3",
                sem3MarksSheet: "sem3marksSheet",
                sem4: "sem4",
                sem4MarksSheet: "sem4marksSheet",
                sem5: "sem5",
                sem5MarksSheet: "sem5marksSheet",
                sem6: "sem6",
                sem6MarksSheet: "sem6marksSheet",
              },
            },
            sslc: {
              create: {
                board: Board.CBSE,
                scoreType: ScoreType.CGPA,
                score: "7.2",
                marksSheet: "./some-link to marks sheet",
              },
            },
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
          title: "Software Developement Trainee",
          ctc: "5.4 LPA",
          type: "full-time",
          branches_allowed: ["CSE", "ISE"],
          eligibilityOfferCount: EligibiltyOfferCount.openforall,
        },
        {
          title: "Software Developer",
          ctc: "6 LPA",
          type: "full-time",
          branches_allowed: ["CSE", "ISE"],
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
          title: "Intern Developer",
          ctc: "3.2LPA",
          type: "internship",
          branches_allowed: ["CSE", "ISE", "EEE", "EC"],
          eligibilityOfferCount: EligibiltyOfferCount.atmost1,
        },
        {
          title: "Software Developer",
          ctc: "8.1LPA",
          type: "intership + full-time",
          branches_allowed: ["CSE", "ISE"],
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
          title: "Nurse",
          ctc: "16 LPA",
          type: "full-time",
          branches_allowed: ["CSE", "ISE", "EEE"],
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
          title: "Graduate Engineer",
          ctc: "7 LPA",
          type: "full-time",
          branches_allowed: ["EC"],
          eligibilityOfferCount: EligibiltyOfferCount.openforall,
        },
        {
          title: "Graduate Trainee",
          ctc: "4 LPA",
          type: "full-time",
          branches_allowed: ["ISE"],
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
          title: "AL Engineer",
          ctc: "6.6 LPA",
          type: "full-time",
          branches_allowed: ["CSE"],
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
          title: "Tech Lead",
          ctc: "10 LPA",
          type: "full-time",
          branches_allowed: ["EEE"],
          eligibilityOfferCount: EligibiltyOfferCount.zero,
        },
        {
          title: "PPT Maker",
          ctc: "3 LPA",
          type: "internship",
          branches_allowed: ["CSE", "ISE", "EEE", "EC"],
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
          title: "Generalist",
          ctc: "5 LPA",
          type: "full-time",
          branches_allowed: ["CSE", "ISE", "EEE", "EC"],
          eligibilityOfferCount: EligibiltyOfferCount.zero,
        },
      ],
    },
  },
];

export { users, companies };
