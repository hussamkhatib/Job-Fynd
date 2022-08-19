import {
  Board,
  EligibiltyOfferCount,
  Gender,
  ScoreType,
  Branch,
  Status,
  Validation,
} from "@prisma/client";

const users = [
  {
    id: "cl3s5w3jk000009m81d9j0wv3",
    email: "Rob@gmail.com",
    offer: {
      create: [
        {
          ctc: 5.4,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9t33d000009jiayn359rh",
        },
        {
          ctc: 9,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          ctc: 7,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
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
        validated: Validation.validated,
        graduationSem1: {
          score: "8.8",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        graduationSem2: {
          score: "9.0",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        graduationSem3: {
          score: "10",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        graduationSem4: {
          score: "7.3",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        graduationSem5: {
          score: "10",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        graduationSem6: {
          score: "7.3",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        graduationSem7: {
          score: "6",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        graduationSem8: {
          score: "9",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        diplomaSem1: {
          score: "7",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        diplomaSem2: {
          score: "8.4",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        diplomaSem3: {
          score: "7",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        diplomaSem4: {
          score: "7",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        diplomaSem5: {
          score: "5",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
        diplomaSem6: {
          score: "8",
          file: "file",
          url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
        },
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
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9t33d000009jiayn359rh",
        },
        {
          ctc: 6,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9ve0w000109jigyl0a9gw",
        },
        {
          ctc: 4,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
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
        validated: Validation.validated,
      },
    },
  },
  {
    id: "cl3s5w3jk000009m81d9j0wui",
    email: "Jane@gmail.com",
    offer: {
      create: [
        {
          ctc: 4,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
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
        name: "Jane",
        usn: "4VV18EC02",
        branch: Branch.EC,
        gender: Gender.Female,
        personalEmail: "Jane@gmail.com",
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
        validated: Validation.pending,
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
        pucboard: Board.STATE,
        pucscoreType: ScoreType.Percentage,
        pucscore: "9%",
        validated: Validation.notvalidated,
      },
    },
  },
  {
    id: "cl708uf72000009mm8bpsbj9k",
    email: "ervinhowell@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9yius000409jid1bd9jek",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Ervin Howell",
        usn: "4VV18IS99",
        branch: Branch.ISE,
        gender: Gender.Other,
        personalEmail: "ervinhowell@gmail.com",
        image:
          "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/erwin-resume",
        phoneNumber: "7073656442",
        parentsPhoneNumber: "7073656441",
        PermanentAddress: "Kulas Light 92998-3874",
        currentAddress: "Gwenborough 92998-3874",
        pinCode: "92998-3874",
        bloodGroup: "O+",
        panCardNumber: "CVWPadja5809L",
        voterId: "CV31bhfdajsb",
        adharCard: "CVahuadajdh",
        passportNumber: "CV131391931",
        sslcboard: Board.INTERNATIONAL,
        sslcscoreType: ScoreType.Percentage,
        sslcscore: "9",
        pucboard: Board.STATE,
        pucscoreType: ScoreType.Percentage,
        pucscore: "9%",
        validated: Validation.validated,
      },
    },
  },
  {
    id: "cl70a9vc0000e2v6t46xpupay",
    email: "jessica@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5qa19vr000909ji52v66be6",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 3,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5qa19vr000909ji52v66be6",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Jessica",
        usn: "4VV18CV01",
        branch: Branch.CV,
        gender: Gender.Female,
        personalEmail: "jessica@gmail.com",
        image:
          "https://images.unsplash.com/photo-1511135122083-0b9767d85bf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHdvbWVuJTIwYXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/jessica-resume",
        phoneNumber: "9102181818",
        parentsPhoneNumber: "12738181818",
        validated: Validation.pending,
      },
    },
  },
  {
    id: "cl70aligi000o2v6to1xsk5iq",
    email: "ryan@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl6xgg35t000009l04kde254q",
        },
        {
          eventId: "cl5q9z9c9000509ji2lu88334",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 30,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl6xgg35t000009l04kde254q",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Ryan",
        usn: "4VV1AIV01",
        branch: Branch.AIML,
        gender: Gender.Male,
        personalEmail: "ryan@gmail.com",
        image:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/ryan-resume",
        phoneNumber: "912181818",
        parentsPhoneNumber: "1793181818",
        validated: Validation.notvalidated,
      },
    },
  },
  {
    id: "cl70aliya000q2v6tcxvlq9ja",
    email: "scottcarson@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5qa1jqe000a09jif2r00etu",
        },
        {
          eventId: "cl6xguxb0000609l07776en65",
        },
        {
          eventId: "cl6xgsog3000509l0adrhdodt",
        },
        {
          eventId: "cl5q9xkej000209jif9r26qbs",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 3,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl6xguxb0000609l07776en65",
        },
        {
          ctc: 6,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9xkej000209jif9r26qbs",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Scott Carson",
        usn: "4VV1AIV05",
        branch: Branch.AIML,
        gender: Gender.Male,
        personalEmail: "scottcarson@gmail.com",
        image:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/scott-resume",
        phoneNumber: "39710181818",
        parentsPhoneNumber: "13718181818",
      },
    },
  },
  {
    id: "cl70awsy8000s2v6t8rzfl1ky",
    email: "bryan@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5qa14kx000809jiaim1an2e",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 5,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5qa14kx000809jiaim1an2e",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Bryan",
        usn: "4VV1AIV04",
        branch: Branch.AIML,
        gender: Gender.Male,
        personalEmail: "bryan@gmail.com",
        image:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/brayn-resume",
      },
    },
  },
  {
    id: "cl70axv1g000u2v6t78mazi8r",
    email: "isabella@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          eventId: "cl70ohzpu00000al4bxmk6n24",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          ctc: 6,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl70ohzpu00000al4bxmk6n24",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Isabella",
        usn: "4VVIS09",
        branch: Branch.ISE,
        gender: Gender.Female,
        personalEmail: "isabella@gmail.com",
        image:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/isabella-resume",
        validated: Validation.pending,
      },
    },
  },
  {
    id: "cl70ayuc5000w2v6tmlud5tmr",
    email: "Ahmet@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          eventId: "cl70ohzpu00000al4bxmk6n24",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          ctc: 6,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl70ohzpu00000al4bxmk6n24",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Ahmet",
        usn: "4VVIS10",
        branch: Branch.ISE,
        gender: Gender.Male,
        personalEmail: "ahmet@gmail.com",
        phoneNumber: "91032831323",
        image:
          "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/AHMET-resume",
      },
    },
  },
  {
    id: "cl70bge1200102v6ttpgun7xq",
    email: "raza@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          eventId: "cl70ohzpu00000al4bxmk6n24",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Raza",
        usn: "4VV18IS12",
        branch: Branch.ISE,
        gender: Gender.Male,
        personalEmail: "raza@gmail.com",
        image:
          "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/raza-resume",
      },
    },
  },
  {
    id: "cl70b313c000y2v6tw6xvktzp",
    email: "elias@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          eventId: "cl70ohzpu00000al4bxmk6n24",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Elias",
        usn: "4VVEE12",
        branch: Branch.EEE,
        gender: Gender.Male,
        personalEmail: "elias@gmail.com",
        image:
          "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/elias-resume",
      },
    },
  },
  {
    id: "cl70bkaed00122v6t90zhf6by",
    email: "Susan@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          eventId: "cl70ohzpu00000al4bxmk6n24",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5q9y1tq000309jig5lf1b6p",
        },
        {
          ctc: 5,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl70ohzpu00000al4bxmk6n24",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Susan Jacob",
        usn: "4VVEE14",
        branch: Branch.EEE,
        gender: Gender.Female,
        personalEmail: "susan@gmail.com",
        image:
          "https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA3fHxhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        resume: "/susan-resume",
        validated: Validation.notvalidated,
      },
    },
  },
  {
    id: "cl70bku5l00142v6t253zkmx0",
    email: "naresh@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl6xgmppx000309l023ycdfea",
        },
        {
          eventId: "cl5qa02em000709ji33rw8cv3",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5qa02em000709ji33rw8cv3",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Naresh Reddy",
        usn: "4VVCS14",
        branch: Branch.CSE,
        gender: Gender.Male,
        personalEmail: "naresh@gmail.com",
        image:
          "https://images.unsplash.com/photo-1636041282858-351171ff944c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzF8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/naresh-resume",
        validated: Validation.pending,
      },
    },
  },
  {
    id: "cl70by5nt00162v6twz4brc0g",
    email: "suresh@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl6xgmppx000309l023ycdfea",
        },
        {
          eventId: "cl5qa02em000709ji33rw8cv3",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5qa02em000709ji33rw8cv3",
        },
        {
          ctc: 10,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl6xgmppx000309l023ycdfea",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Suresh Reddy",
        usn: "4VVCS15",
        branch: Branch.CSE,
        gender: Gender.Male,
        personalEmail: "sureshh@gmail.com",
        image:
          "https://images.unsplash.com/photo-1626586066636-a1523dd2141b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        resume: "/suresh-resume",
        validated: Validation.notvalidated,
      },
    },
  },
  {
    id: "cl70c0kif00182v6t3orc0ld7",
    email: "reena@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl6xgmppx000309l023ycdfea",
        },
        {
          eventId: "cl5qa02em000709ji33rw8cv3",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5qa02em000709ji33rw8cv3",
        },
        {
          ctc: 10,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl6xgmppx000309l023ycdfea",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Renna",
        usn: "4VVME15",
        branch: Branch.ME,
        gender: Gender.Female,
        personalEmail: "renna@gmail.com",
        image:
          "https://images.unsplash.com/photo-1645378999488-63138abdecd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEwfHxhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        resume: "/renny-resume",
      },
    },
  },
  {
    id: "cl70cbxmr001a2v6ts5ubrs2w",
    email: "jerry@gmail.com",
    appliedJobs: {
      create: [
        {
          eventId: "cl6xgmppx000309l023ycdfea",
        },
        {
          eventId: "cl5qa02em000709ji33rw8cv3",
        },
      ],
    },
    offer: {
      create: [
        {
          ctc: 8.1,
          offerLetter: {
            file: "file",
            url: "https://res.cloudinary.com/dbbunxz2o/image/upload/v1660724587/tap/wbexzvzwbxt8vmqdmo1v.pdf",
          },
          eventId: "cl5qa02em000709ji33rw8cv3",
        },
      ],
    },
    studentRecord: {
      create: {
        name: "Sam Jerry",
        usn: "4VVME88",
        branch: Branch.ME,
        gender: Gender.Male,
        personalEmail: "jacob@gmail.com",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE5fHxhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        resume: "/jacob-resume",
      },
    },
  },
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
    title: "AI Engineer",
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
  {
    id: "cl70ohzpu00000al4bxmk6n24",
    companyId: "cl6yjs10l000409kye15s82vp", // P&C Tech
    title: "Marketing",
    ctc: 5.5,
    type: "full-time",
    branchesAllowed: {
      create: [
        {
          name: Branch.CV,
        },
        {
          name: Branch.ME,
        },
        {
          name: Branch.CSE,
        },
        {
          name: Branch.ISE,
        },
      ],
    },
    status: Status.Open,
    eligibilityOfferCount: EligibiltyOfferCount.atmost1,
  },
];

export { users, events, companies };
