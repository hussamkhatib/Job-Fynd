export interface Offer {
  company: string;
  sector: string;
  title: string;
  type: string;
  ctc: string;
  offerLetter: string;
}

export interface StudentOfferColumns {
  id: string;
  name: string;
  branch: string;
  usn: string;
  ctc: string;
  phoneNumber: string;
}

export interface AdminStudentOfferColumns {
  id: string;
  ctc: string;
  offerLetter: string;
  student: {
    studentRecord: {
      name: string;
      phoneNumber: string;
      branch: string;
      usn: string;
      image: string;
    };
  };
  event: {
    type: string;
    company: {
      name: string;
      sector: string;
    };
  };
}
