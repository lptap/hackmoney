import cn from 'classnames'
import React, { FC } from 'react'

export enum ExtraPosition {
  RIGHT = 'right',
  LEFT = 'left',
}

type ExtraProps = {
  position: ExtraPosition
} & React.ComponentProps<'div'>

export const Extra: FC<ExtraProps> = ({ position, children, className }) => {
  return (
    <div
      className={cn('absolute flex border border-transparent h-full', className, {
        'right-0': position === ExtraPosition.RIGHT,
      })}
    >
      <div className="text-gray flex items-center justify-center h-full w-full">{children}</div>
    </div>
  )
}

export const Before: FC<React.ComponentProps<'div'>> = (props) => <Extra {...props} position={ExtraPosition.LEFT} />
export const After: FC<React.ComponentProps<'div'>> = (props) => <Extra {...props} position={ExtraPosition.RIGHT} />
