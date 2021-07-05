import cn from 'classnames'
import { ButtonHTMLAttributes, FC } from 'react'
import { hasUtilClass } from 'shared/has-util-class'

const classes = [
  'border-4',
  'border-black',
  'rounded-xl',
  'font-normal',
  'leading-6',
  'focus:outline-none',
  'disabled:bg-box-500',
  'disabled:cursor-not-allowed',
]

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export const Button: FC<ButtonProps> = ({ children, loading, className, ...props }) => {
  return (
    <button className={cn(classes, !hasUtilClass(className, 'text-') && 'text-lg', className)} {...props}>
      {loading ? <span className="spinner text-red-500" /> : children}
    </button>
  )
}
