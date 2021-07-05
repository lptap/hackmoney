import { FC } from 'react'
import { ICON_SET } from './icon-set'

type IconProp = {
  name: keyof typeof ICON_SET
  className?: string
  onClick?: () => void
}

export const Icon: FC<IconProp> = ({ name, className, onClick }) => {
  const I = ICON_SET[name]
  return <I className={className} onClick={onClick} />
}
