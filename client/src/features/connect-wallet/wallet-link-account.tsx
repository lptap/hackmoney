import { FC } from 'react'
import { Button } from 'components'
import { getCurrentNetworkConfig } from 'shared/helpers'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'shared/hooks'
import { WalletConnectService } from 'services'
import { walletSlice } from 'store'
import { SnackbarVariant, WALLET_TYPES } from 'shared/enums'
import WalletImg from 'assets/icons/wallet-link.png'

type WalletLinkAccountProps = {
  onClose: () => void
}

export const WalletLinkAccount: FC<WalletLinkAccountProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  const snackbar = useSnackbar()
  const networkConfig = getCurrentNetworkConfig()

  const connect = async () => {
    const wallet = new WalletConnectService(networkConfig)
    await wallet.openQRCodeModal()

    wallet.getConnected((address: string) => {
      dispatch(
        walletSlice.actions.importAccount({
          address,
          wallet,
          type: WALLET_TYPES.WALLET_CONNECT,
        }),
      )
      onClose()
    }, showError)
  }

  const showError = (errorMessage: string) => {
    onClose()
    snackbar.open(errorMessage, SnackbarVariant.ERROR)
  }

  return (
    <Button
      className="w-full flex flex-row justify-between items-center hover:border-primary-500 px-7 py-2 mb-3"
      onClick={connect}
    >
      <p className="text-lg text-black font-medium leading-6">WalletConnect</p>
      <div className="flex flex-row justify-center items-center bg-wallet-500 rounded-full w-14 h-14">
        <img src={WalletImg} alt="Wallet Link" />
      </div>
    </Button>
  )
}
