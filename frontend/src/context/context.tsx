import { createContext } from "react";
import { ExpenseContextType } from "../@types/types";
export const AppContext = createContext<ExpenseContextType | null>(null);
