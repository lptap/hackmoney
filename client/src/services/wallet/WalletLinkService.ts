import Web3 from 'web3'
import WalletLink from 'walletlink'
import { BaseWalletService, BaseWalletServiceProps } from './BaseWalletService'
import { config } from 'shared/config'

export class WalletLinkService extends BaseWalletService {
  walletLink: WalletLink

  constructor(props: BaseWalletServiceProps) {
    super(props)

    const walletLink = new WalletLink({
      appName: 'LayerExchange',
      appLogoUrl: '', // TODO: implement later
    })

    this.ethereum = walletLink.makeWeb3Provider(config.PROVIDER, config.CHAIN_ID)
    this.web3 = new Web3(this.ethereum)
    this.walletLink = walletLink
  }

  clearSession = () => {
    this.walletLink.disconnect()
  }

  getWalletName = () => {
    return 'Coinbase'
  }
}
