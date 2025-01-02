import { createContext } from "react";
export const anonymosUser = {
  name: "Anonymos",
};
export interface AuthInfo {
  user: {
    name: string;
  };
}
export const AuthContext = createContext<AuthInfo>({ user: anonymosUser });
