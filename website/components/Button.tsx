import { MouseEventHandler } from "react"

type ButtonProps = {
  className?: string

  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ className = "", onClick = () => {}, children }) => {
  return (
    <button
      className={
        "inline-block text-sm font-thin border border-primary rounded mx-2 px-2 pb-px cursor-pointer hover:bg-primary/20 active:bg-primary/50 " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
