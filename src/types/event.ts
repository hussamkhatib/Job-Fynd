export interface Event {
  id: string;
  company: {
    name: string;
    sector: string;
  };

  title: string;
  ctc: string;
  type: string;
  status: string;
  branchesAllowed: string[];
}

export interface AdminEvent extends Event {
  _count: {
    offers: number;
    students: number;
  };
}

export interface StudentApplicationEvent {
  id: string;
  event: Event;
  result: string;
}
