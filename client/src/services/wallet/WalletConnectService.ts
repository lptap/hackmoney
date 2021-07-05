import WalletConnect from '@walletconnect/browser'
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal'
import { WALLET_TYPES } from 'shared/enums'
import { fromNetworkIdToName } from 'shared/helpers'
import { BaseWalletService, BaseWalletServiceProps } from './BaseWalletService'

export class WalletConnectService extends BaseWalletService {
  walletConnector: WalletConnect | null

  constructor(props: BaseWalletServiceProps) {
    super(props)

    this.walletConnector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
    })
  }

  initiateWalletConnector = () => {
    this.walletConnector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
    })
  }

  openQRCodeModal = async () => {
    if (!this.walletConnector) {
      throw new Error('invalid wallet')
    }

    if (this.walletConnector.connected) {
      await this.clearSession()
      this.initiateWalletConnector()
    }

    this.walletConnector.createSession().then(() => {
      const uri = this.walletConnector!.uri
      WalletConnectQRCodeModal.open(uri, null)
    })
  }

  getConnected = (importAccount: any, openErrorModal: any) => {
    this.walletConnector?.on('connect', (error: any, payload: any) => {
      if (error) {
        openErrorModal(error.message)
        return
      }

      WalletConnectQRCodeModal.close()

      const { accounts, chainId } = payload.params[0]

      if (chainId !== this.networkId) {
        const expectedNetwork = fromNetworkIdToName(this.networkId)

        this.clearSession()

        openErrorModal(`Please make sure that your network is on ${expectedNetwork}`)

        return
      }

      importAccount(accounts[0])
    })
  }

  getDisconnected = (clearAccount: any) => {
    this.walletConnector?.on('disconnect', () => {
      this.handleClearAccount(clearAccount)
    })

    this.walletConnector?.on('session_update', () => {
      this.handleClearAccount(clearAccount)
    })
  }

  handleClearAccount = (clearAccount: any) => {
    WalletConnectQRCodeModal.close()
    this.walletConnector = null
    clearAccount()
  }

  clearSession = async () => {
    await this.walletConnector?.killSession()
  }

  subscribeToDisconnect = (clearAccount: any) => {
    this.getDisconnected(clearAccount)
  }

  sendTransaction = async (txObject: any) => {
    const result = await this.walletConnector?.sendTransaction(txObject)
    return result.transactionHash
  }

  getWalletType = () => {
    return WALLET_TYPES.WALLET_CONNECT
  }
}
