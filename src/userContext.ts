import { createContext } from "react";

export enum UserRole {
  student,
  admin,
}

const userRole = createContext(UserRole.student);
export default userRole;
