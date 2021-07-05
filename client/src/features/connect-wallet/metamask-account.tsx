import { FC } from 'react'
import { Button } from 'components'
import { fromNetworkIdToName, getCurrentNetworkConfig } from 'shared/helpers'
import { MetamaskService } from 'services'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'shared/hooks'
import { SnackbarVariant, WALLET_TYPES } from 'shared/enums'
import { walletSlice } from 'store'
import WalletImg from 'assets/icons/metamask.png'

type MetamaskAccountProps = {
  onClose: () => void
}

export const MetamaskAccount: FC<MetamaskAccountProps> = ({ onClose }) => {
  const dispatch = useDispatch()
  const snackbar = useSnackbar()
  const networkConfig = getCurrentNetworkConfig()

  const connect = async () => {
    const wallet = new MetamaskService(networkConfig)
    const address = await wallet.connect(showConnectError, showNetworkError)

    if (!address) {
      return
    }

    wallet.getDisconnected(() => dispatch(walletSlice.actions.clearAccount()))

    dispatch(
      walletSlice.actions.importAccount({
        address,
        wallet,
        type: WALLET_TYPES.METAMASK,
      }),
    )

    onClose()
  }

  const showConnectError = () => {
    onClose()
    snackbar.open('Cannot connect to Metamask. Please make sure you have Metamask installed.', SnackbarVariant.ERROR)
  }

  const showNetworkError = (currentNetworkId: number) => {
    onClose()
    snackbar.open(
      `Metamask should be on ${fromNetworkIdToName(networkConfig.networkId)}. Currently it is on ${fromNetworkIdToName(
        currentNetworkId,
      )} instead.`,
      SnackbarVariant.ERROR,
    )
  }

  return (
    <Button
      className="w-full flex flex-row justify-between items-center hover:border-primary-500 px-7 py-2 mb-3"
      onClick={connect}
    >
      <p className="text-lg text-black font-medium leading-6">METAMASK</p>
      <div className="flex flex-row justify-center items-center bg-wallet-500 rounded-full w-14 h-14">
        <img src={WalletImg} alt="Wallet Metamask" />
      </div>
    </Button>
  )
}
