

const IconUser = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-filled"
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
        d="M12 2a5 5 0 11-5 5l.005-.217A5 5 0 0112 2zM14 14a5 5 0 015 5v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1a5 5 0 015-5h4z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  )
}

export default IconUser
