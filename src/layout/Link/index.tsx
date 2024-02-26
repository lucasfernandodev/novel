import { FC } from "react"
import { LinkProps, Link as OldLink } from "react-router-dom"

interface IProps extends LinkProps{

}

export const Link: FC<IProps> = ({children, ...rest}) => {
  return <OldLink {...rest}>{children}</OldLink>
}