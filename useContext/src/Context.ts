import { createContext, useContext } from "react";
import type { User } from "./App";

// Define the context value type
export interface DashboardContextValue {
  user: User;
  toggleSubscription: () => void;
  updateName: (newName: string) => void;
}

// Create context with undefined as initial value
const DashboardContext = createContext<DashboardContextValue | undefined>(undefined);

// Custom hook with proper error handling
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardContextProvider");
  }
  return context;
};

export default DashboardContext;
 