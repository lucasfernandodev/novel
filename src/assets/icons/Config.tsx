
import { SVGProps } from "react"
const IconConfig = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5}
    className="icon icon-tabler icon-tabler-settings-2"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="M19.875 6.27A2.225 2.225 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27A2.225 2.225 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />
    <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />
  </svg>
)
export default IconConfig
