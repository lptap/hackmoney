import cn from 'classnames'
import { FC } from 'react'
import { Icon } from '../icon'

type IconButtonProps = {
  iconName: string
  iconClassName?: string
} & React.ComponentProps<'div'>

export const IconButton: FC<IconButtonProps> = ({ iconName, className, iconClassName, ...props }) => {
  return (
    <div className={cn('border-4 border-black rounded-xl p-3', className)} {...props}>
      <Icon name={iconName} className={cn('h-6 w-6', iconClassName)} />
    </div>
  )
}
