
import { SVGProps } from "react"
const IconCompass = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="icon icon-tabler icon-tabler-brand-safari"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m8 16 2-6 6-2-2 6-6 2" />
    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0" />
  </svg>
)
export default IconCompass
