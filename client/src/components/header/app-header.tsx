import { FC } from 'react'
import { AppLogo, Button, Icon, IconButton } from 'components'
import { useSelector } from 'react-redux'
import { getWallet } from 'features/home/home.selector'
import { useVisibility } from 'shared/hooks'
import { VisibilityName } from 'store/visibility'

export const AppHeader: FC = () => {
  const modal = useVisibility(VisibilityName.CONNECT_WALLET)
  const { address } = useSelector(getWallet)

  return (
    <div className="flex flex-row justify-between border-b border-line-500 pl-12 pr-6 py-9">
      <div className="flex flex-row items-center">
        <AppLogo logoClassName="h-9" />
        <p className="text-xl font-normal leading-7 ml-8">
          Layer <strong>Exchange</strong>
        </p>
      </div>

      <div className="flex flex-row">
        {!address && (
          <Button className="flex flex-row justify-center items-center font-bold px-4 mr-4" onClick={modal.open}>
            <Icon name="wallet" className="mr-5" />
            <p className="text-base font-bold leading-5 uppercase">Connect</p>
          </Button>
        )}
        {!!address && (
          <Button className="flex flex-row justify-between items-center font-bold px-4 mr-4">
            <p className="text-base font-bold leading-5 uppercase">{`${address.substr(0, 8)}...${address.substr(
              address.length - 4,
              4,
            )}`}</p>
            <Icon name="account" className="ml-5" />
          </Button>
        )}
        <IconButton iconName="light-mode" className="cursor-pointer mr-4" />
        <IconButton iconName="menu" className="cursor-pointer" />
      </div>
    </div>
  )
}
