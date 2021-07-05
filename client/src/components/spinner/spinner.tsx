import cn from 'classnames'
import React, { FC } from 'react'

export type SpinnerProps = {
  className?: string
}

export const Spinner: FC<SpinnerProps> = ({ className }) => (
  <div className={cn('flex flex-grow justify-center items-center text-primary-500', className)}>
    <div className="spinner-md" />
  </div>
)
