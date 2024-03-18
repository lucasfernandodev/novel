

const IconTrash = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={14}
      height={15}
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 3.75h12m-7.5 3v4.5m3-4.5v4.5m-6.75-7.5l.75 9a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5l.75-9m-7.5 0V1.5A.75.75 0 015.5.75h3a.75.75 0 01.75.75v2.25"
        stroke="#EFEFEF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconTrash
