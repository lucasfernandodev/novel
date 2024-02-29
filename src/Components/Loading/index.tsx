import style from './style.module.css'

export const Loading = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className={style.loading}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <style>{"@keyframes spinner_AtaB{to{transform:rotate(360deg)}}"}</style>
        <path
          d="M12 1a11 11 0 1011 11A11 11 0 0012 1zm0 19a8 8 0 118-8 8 8 0 01-8 8z"
          opacity={0.25}
          fill="var(--gray-400)"
        />
        <path
          d="M10.14 1.16a11 11 0 00-9 8.92A1.59 1.59 0 002.46 12a1.52 1.52 0 001.65-1.3 8 8 0 016.66-6.61A1.42 1.42 0 0012 2.69a1.57 1.57 0 00-1.86-1.53z"
          fill="var(--primary)"
          style={{
            transformOrigin: "center",
            animation: "spinner_AtaB .75s infinite linear"
          }}
        />
      </svg>
    </div>
  )
}
