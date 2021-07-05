import cn from 'classnames'
import { FC } from 'react'

export type FormControlProps = {
  error?: string
  helperText?: string
  htmlFor?: string
  inlineHelperText?: boolean
  helperTextClassName?: string
  className?: string
  subClassName?: string
}

export const FormControl: FC<FormControlProps> = ({
  children,
  error,
  className,
  subClassName,
  htmlFor,
  helperText,
  inlineHelperText,
  helperTextClassName,
}) => {
  const hint = error || helperText
  return (
    <>
      <div className={cn('w-full', className)}>
        <div className={cn({ 'flex items-center': inlineHelperText }, subClassName)}>
          {children}
          <label
            className={cn(helperTextClassName ? helperTextClassName : 'h-4 text-xs block mt-1 px-4 overflow-hidden', {
              'ml-2': inlineHelperText,
              'text-red-500': error,
              'text-grey-400': !error,
              'opacity-0': !hint,
            })}
            htmlFor={htmlFor}
          >
            {hint}
          </label>
        </div>
      </div>
    </>
  )
}
