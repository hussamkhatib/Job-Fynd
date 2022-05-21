import { createContext } from "react";

export enum UserRole {
  student,
  admin,
}

const userRole = createContext(UserRole.admin);
export default userRole;
