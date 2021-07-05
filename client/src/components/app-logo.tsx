import cn from 'classnames'
import React, { FC } from 'react'
import logo from 'assets/icons/logo.svg'

type LogoProps = {
  logoClassName?: string
} & React.ComponentProps<'img'>

export const AppLogo: FC<LogoProps> = ({ className, logoClassName, ...props }) => (
  <a href="/" className={cn('flex items-center justify-center', className)}>
    <img className={logoClassName} src={logo} alt="Layer Exchange Logo" {...props} />
  </a>
)
