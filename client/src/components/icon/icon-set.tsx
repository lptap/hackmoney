import { FC, SVGProps } from 'react'
import { ReactComponent as LightMode } from 'assets/icons/light-mode.svg'
import { ReactComponent as DarkMode } from 'assets/icons/dark-mode.svg'
import { ReactComponent as Wallet } from 'assets/icons/wallet.svg'
import { ReactComponent as Account } from 'assets/icons/account.svg'
import { ReactComponent as Menu } from 'assets/icons/menu.svg'
import { ReactComponent as NotifyInfo } from 'assets/icons/notify-info.svg'
import { ReactComponent as NotifySuccess } from 'assets/icons/notify-success.svg'
import { ReactComponent as NotifyWarn } from 'assets/icons/notify-warn.svg'
import { ReactComponent as NotifyError } from 'assets/icons/notify-error.svg'
import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down.svg'
import { ReactComponent as CbUncheck } from 'assets/icons/cb-uncheck.svg'
import { ReactComponent as CbChecked } from 'assets/icons/cb-checked.svg'
// import { ReactComponent as WrappedBTC } from 'assets/icons/wrapped-btc.svg'
// import { ReactComponent as WrappedETH } from 'assets/icons/wrapped-eth.svg'

export const ICON_SET: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  'light-mode': LightMode,
  'dark-mode': DarkMode,
  wallet: Wallet,
  account: Account,
  menu: Menu,
  'notify-info': NotifyInfo,
  'notify-success': NotifySuccess,
  'notify-warn': NotifyWarn,
  'notify-error': NotifyError,
  'arrow-down': ArrowDown,
  'cb-uncheck': CbUncheck,
  'cb-checked': CbChecked,
  // 'wrapped-btc': WrappedBTC,
  // 'wrapped-eth': WrappedETH,
}
