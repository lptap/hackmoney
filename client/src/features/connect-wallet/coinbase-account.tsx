import { FC } from 'react'
import { Button } from 'components'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'shared/hooks'
import { getCurrentNetworkConfig } from 'shared/helpers'
import { WalletLinkService } from 'services'
import { SnackbarVariant, WALLET_TYPES } from 'shared/enums'
import { walletSlice } from 'store'
import WalletImg from 'assets/icons/coinbase.png'

type CoinbaseAccountProps = {
  onClose: () => void
}

export const CoinbaseAccount: FC<CoinbaseAccountProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  const snackbar = useSnackbar()
  const networkConfig = getCurrentNetworkConfig()

  const connect = async () => {
    const wallet = new WalletLinkService(networkConfig)
    const address = await wallet.connect(showConnectError)

    if (!address) {
      return
    }

    dispatch(
      walletSlice.actions.importAccount({
        address,
        wallet,
        type: WALLET_TYPES.WALLET_LINK,
      }),
    )

    onClose()
  }

  const showConnectError = () => {
    onClose()
    snackbar.open('Cannot connect to Coinbase', SnackbarVariant.ERROR)
  }

  return (
    <Button
      className="w-full flex flex-row justify-between items-center hover:border-primary-500 px-7 py-2 mb-3"
      onClick={connect}
    >
      <p className="text-lg text-black font-medium leading-6">Coinbase Wallet</p>
      <div className="flex flex-row justify-center items-center bg-wallet-500 rounded-full w-14 h-14">
        <img src={WalletImg} alt="Wallet Coinbase" />
      </div>
    </Button>
  )
}
