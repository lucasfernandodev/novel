import React, { ReactNode } from "react"
import style from './style.module.css';
import { Footer } from "../Footer"
import { Header } from "../Header"
import { RequeireAuth } from "../RequireAuth";

interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  isPrivate?: boolean,
}

const LoadInPrivate = ({ children, className, ...rest }:
  { className?: string | undefined, children?: ReactNode }) => {
  return (
    <RequeireAuth>
      <div {...rest} className={[style.content, className].join(" ")} >
        {children}
      </div>
    </RequeireAuth>
  )
}

const LoadInPublic = ({ children, className, ...rest }:
  { className?: string | undefined, children?: ReactNode }) => {
  return (
    <div {...rest} className={[style.content, className].join(" ")} >
      {children}
    </div>
  )
}


export const Layout: React.FC<ILayoutProps> = ({ isPrivate = false, children, ...rest }) => {
  return (
    <div className={style.layout} >
      <Header />
      {isPrivate === true ?
        <LoadInPrivate {...rest}>{children}</LoadInPrivate> :
        <LoadInPublic {...rest}>{children}</LoadInPublic>
      }
      <Footer />
    </div>
  )
}