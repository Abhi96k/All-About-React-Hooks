import { createContext } from "react";
import type { User } from "./App";

// Define the context value type
export interface DashboardContextValue {
  user: User;
  toggleSubscription: () => void;
  updateName: (newName: string) => void;
}

// Provide a default value to avoid undefined checks
const defaultContextValue: DashboardContextValue = {
  user: {
    isSubscribed: false,
    name: "Guest",
    email: "guest@example.com",
    avatar: "👤",
  },
  toggleSubscription: () => {},
  updateName: () => {},
};

const DashboardContext = createContext<DashboardContextValue>(defaultContextValue);

export default DashboardContext;
 