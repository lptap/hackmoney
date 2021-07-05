import { Token } from './token'
import { ChainId } from 'shared/enums'

export const LxAMM = {
  [ChainId.MAINNET]: '',
  [ChainId.RINKEBY]: '0xBCbF787Dd52d79bD071a57516CeD8060C9a7A32B',
  [ChainId.KOVAN]: '',
}

export const WETH = {
  [ChainId.MAINNET]: new Token('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'Wrapped ETH', 'WETH'),
  [ChainId.RINKEBY]: new Token('0xc778417e063141139fce010982780140aa0cd5ab', 18, 'Wrapped ETH', 'WETH'),
  [ChainId.KOVAN]: new Token('0x517281B6F8f98704A830863c5D0bfa209514AD3b', 18, 'Wrapped ETH', 'WETH'),
}

export const WBTC = {
  [ChainId.MAINNET]: new Token('0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', 8, 'Wrapped BTC', 'WBTC'),
  [ChainId.RINKEBY]: new Token('0x577d296678535e4903d59a4c929b718e1d575e0a', 8, 'Wrapped BTC', 'WBTC'),
  [ChainId.KOVAN]: new Token('', 8, 'Wrapped BTC', 'WBTC'),
}
