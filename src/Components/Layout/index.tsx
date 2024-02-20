import React from "react"
import style from './style.module.css';
import { Footer } from "../Footer"
import { Header } from "../Header"

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement>{
  children?: React.ReactNode
}

export const Layout: React.FC<ILayoutProps> = ({ children, ...rest }) => {
  return (
    <div {...rest} className={[style.layout, rest.className].join(" ")}>
      <Header />
      <div className={style.content}>
        {children}
      </div>
      <Footer />
    </div>
  )
}