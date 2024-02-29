import { useState } from "react"
import { TabContext } from "./TabContext"

export const TabProvider = ({ children }: { children: JSX.Element }) => {

  const [tab, setTab] = useState<string | null>(null)

  function changeTab(tab: string){
    setTab(tab)
  }
  return (
    <TabContext.Provider value={{ changeTab, tab }}>
      {children}
    </TabContext.Provider>
  )
}