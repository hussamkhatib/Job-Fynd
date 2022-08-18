export interface Offer {
  company: string;
  sector: string;
  title: string;
  type: string;
  ctc: number;
  offerLetter: string;
}

export interface StudentOfferColumns {
  id: string;
  name: string;
  branch: string;
  usn: string;
  ctc: number;
  phoneNumber: string;
}

export interface AdminStudentOfferColumns {
  id: string;
  ctc: number;
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
