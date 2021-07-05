import { FC } from 'react'
import { Button } from 'components'
import WalletImg from 'assets/icons/fortmatic.png'
import { useSnackbar } from 'shared/hooks'
import { SnackbarVariant } from 'shared/enums'

type FortmaticAccountProps = {
  onClose: () => void
}

export const FortmaticAccount: FC<FortmaticAccountProps> = ({ onClose }) => {
  const snackbar = useSnackbar()

  const connect = async () => {
    onClose()
    snackbar.open('The wallet will be support soon.', SnackbarVariant.WARNING)
  }

  return (
    <Button
      className="w-full flex flex-row justify-between items-center hover:border-primary-500 px-7 py-2 mb-3"
      onClick={connect}
    >
      <p className="text-lg text-black font-medium leading-6">Fortmatic</p>
      <div className="flex flex-row justify-center items-center bg-wallet-500 rounded-full w-14 h-14">
        <img src={WalletImg} alt="Wallet Fortmatic" />
      </div>
    </Button>
  )
}
