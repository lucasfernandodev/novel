import { createContext } from "react";

export type TabContextType = {
  tab: string | null;
  changeTab: (tab: string) => void
}

export const TabContext = createContext<TabContextType>(null!)