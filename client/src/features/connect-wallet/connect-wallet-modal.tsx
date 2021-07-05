import { FC } from 'react'
import { Modal } from 'components'
import { useVisibility } from 'shared/hooks'
import { VisibilityName } from 'store/visibility'
import { MetamaskAccount } from './metamask-account'
import { WalletLinkAccount } from './wallet-link-account'
import { CoinbaseAccount } from './coinbase-account'
import { PortisAccount } from './portis-account'
import { FortmaticAccount } from './fortmatic-account'

export const ConnectWalletModal: FC = () => {
  const modal = useVisibility(VisibilityName.CONNECT_WALLET)

  return (
    <Modal isOpen={modal.isOpen} onClose={modal.close} shouldCloseOnOverlayClick={true} noContentPadding={true}>
      <div className="flex flex-col p-12">
        <p className="text-lg text-black font-semibold leading-6 mt-3 mb-5">CONNECT TO A WALLET</p>
        <div className="border-2 border-box-500 rounded-xl mb-7 px-4 py-8">
          <p className="text-xs font-normal leading-4">
            By connecting a wallet, you agree to Layer Exchange’s{' '}
            <span className="text-primary-500 font-bold">Terms of Service</span> and acknowledge that you have read and
            understand the <span className="text-primary-500 font-bold">Layer Exchange protocol disclaimer</span>
          </p>
        </div>
        <div>
          <MetamaskAccount onClose={modal.close} />
          <WalletLinkAccount onClose={modal.close} />
          <CoinbaseAccount onClose={modal.close} />
          <FortmaticAccount onClose={modal.close} />
          <PortisAccount onClose={modal.close} />
        </div>
      </div>
    </Modal>
  )
}
