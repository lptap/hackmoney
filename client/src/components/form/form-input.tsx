import cn from 'classnames'
import { FC, forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { defaultClasses } from './constants'
import { After, Before } from './extra'

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  before?: ReactNode
  after?: ReactNode
  inputClass?: string
  beforeClasses?: string
  afterClasses?: string
}

export const FormInput: FC<FormInputProps> = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, before, after, className, inputClass, type, beforeClasses, afterClasses, ...props }, ref) => {
    return (
      <div className={cn('relative', className)}>
        {before && <Before className={beforeClasses}>{before}</Before>}
        {after && <After className={afterClasses}>{after}</After>}
        <input ref={ref} {...props} type={type} className={cn(defaultClasses, inputClass)} />
      </div>
    )
  },
)
