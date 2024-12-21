import { createContext } from "react";
import { User } from "../types";

interface UserContextValue {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  }

export const UserContext = createContext<UserContextValue | undefined>(undefined);


