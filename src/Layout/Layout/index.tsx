import React from "react"
import style from './style.module.css';
import { Footer } from "../Footer"
import { Header } from "../Header"

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement>{
  children?: React.ReactNode
}

export const Layout: React.FC<ILayoutProps> = ({ children, ...rest }) => {
  return (
    <div className={style.layout} >
      <Header />
      <div {...rest} className={[style.content, rest.className].join(" ")} >
        {children}
      </div>
      <Footer />
    </div>
  )
}