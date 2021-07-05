export enum ChainId {
  MAINNET = 1,
  KOVAN = 42,
  RINKEBY = 4,
}

export enum WALLET_TYPES {
  METAMASK = 'metamask',
  WALLET_CONNECT = 'wallet connect',
  WALLET_LINK = 'wallet link',
  DAPP = 'dapp',
}

export enum DEPOSIT_TYPE {
  ASSET = 'asset',
  LP_TOKEN = 'lp_token',
}

export enum ModalMode {
  REGULAR = 'regular',
  DROPDOWN = 'dropdown',
  BOTTOM_SHEET = 'bottom_sheet',
}

export enum SnackbarPosition {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  TOP_CENTER = 'top-center',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_CENTER = 'bottom-center',
}

export enum SnackbarVariant {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

export enum Dex {
  PANCAKESWAP,
  SUSHISWAP,
  UNISWAP,
}
