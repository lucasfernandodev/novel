import { createContext } from "react";
import { User } from "../../types/user";

export type AuthContextType = {
  user: User | null,
  loading: boolean,
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>(null!)