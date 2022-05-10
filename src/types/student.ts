export interface StudentCol {
  Header: string;
  accessor: string;
}

export interface StudentData {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  usn: string;
  branch_id: string;
  resume: string;
  opted: boolean;
  validated: boolean;
  branch: string;
}
export type branch = "CSE" | "ISE" | "EC" | "EEE";
