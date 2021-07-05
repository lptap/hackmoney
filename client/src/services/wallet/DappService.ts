import { WALLET_TYPES } from 'shared/enums'
import { MetamaskService } from './MetamaskService'

export class DappService extends MetamaskService {
  subscribeToDisconnect = () => {
    return false
  }

  getWalletType = () => {
    return WALLET_TYPES.DAPP
  }
}
