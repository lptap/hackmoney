import { WALLET_TYPES } from 'shared/enums'
import { detectWeb3Object } from 'shared/helpers'
import { BaseWalletService, BaseWalletServiceProps } from './BaseWalletService'

export class MetamaskService extends BaseWalletService {
  constructor(props: BaseWalletServiceProps) {
    super(props)

    const { web3, ethereum } = detectWeb3Object()

    this.ethereum = ethereum
    this.web3 = web3
  }

  subscribeToDisconnect = (clearAccount: any, importAccount: any, wallet: any) => {
    this.getDisconnected(clearAccount, importAccount, wallet)
  }

  getWalletType = () => {
    return WALLET_TYPES.METAMASK
  }
}
