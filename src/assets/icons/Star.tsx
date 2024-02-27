import * as React from "react"

export const  IconStar = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-star-filled"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path
        d="M8.243 7.34l-6.38.925-.113.023a1 1 0 00-.44 1.684l4.622 4.499-1.09 6.355-.013.11a1 1 0 001.464.944l5.706-3 5.693 3 .1.046a1 1 0 001.352-1.1l-1.091-6.355 4.624-4.5.078-.085a1 1 0 00-.633-1.62l-6.38-.926-2.852-5.78a1 1 0 00-1.794 0L8.243 7.34z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}