export interface Event {
  id: string;
  company: string;
  title: string;
  ctc: string;
  sector: string;
  type: string;
  status: string;
  branches_allowed: string[];
}

export interface AdminEvent extends Event {
  applied: number;
  offers: number;
}
