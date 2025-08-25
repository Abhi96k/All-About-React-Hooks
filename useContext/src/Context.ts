import { createContext } from "react";
import type { User } from "./App";
const DashboardContext = createContext<User | undefined>(undefined);

export default DashboardContext;
