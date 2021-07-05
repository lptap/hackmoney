import Web3 from 'web3'
import { config } from './config'
import { ChainId, DEPOSIT_TYPE } from './enums'
import { AssetCoin } from './types'
import { WBTC, WETH } from 'services'

export function fromNetworkIdToName(networkId: number) {
  let networkName = 'Unknown Network'

  if (networkId === 1) {
    networkName = 'Mainnet'
  } else if (networkId === 3) {
    networkName = 'Ropsten'
  } else if (networkId === 4) {
    networkName = 'Rinkeby'
  } else if (networkId === 5) {
    networkName = 'Goerli Test'
  } else if (networkId === 42) {
    networkName = 'Kovan'
  }

  return networkName
}

export function detectWeb3Object() {
  let web3
  const ethereum = window.ethereum

  if (ethereum) {
    web3 = new Web3(ethereum as any)
  } else {
    const provider = new Web3.providers.HttpProvider(config.PROVIDER)
    web3 = new Web3(provider)
  }

  return { web3, ethereum }
}

export function getCurrentNetworkConfig() {
  return {
    networkId: config.CHAIN_ID,
    chainName: config.CHAIN_NAME,
    nodeUrl: config.PROVIDER,
  }
}

export function getDepositOptions(type: DEPOSIT_TYPE, chainId: ChainId): AssetCoin[] {
  // TODO: will refactor later
  if (type === DEPOSIT_TYPE.ASSET) {
    return [
      {
        label: WETH[chainId].symbol!,
        value: WETH[chainId].address,
        token: WETH[chainId],
      },
      {
        label: WBTC[chainId].symbol!,
        value: WBTC[chainId].address,
        token: WBTC[chainId],
      },
    ]
  } else if (type === DEPOSIT_TYPE.LP_TOKEN) {
    return [
      {
        label: 'V2 LP TOKEN (ER20)',
        value: 'lpV2Token',
      },
      {
        label: 'V3 LP TOKEN (ER20)',
        value: 'lbV3Token',
      },
    ]
  }

  return []
}
