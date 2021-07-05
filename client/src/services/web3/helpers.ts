import BigNumber from 'bignumber.js'
import { AddressZero } from '@ethersproject/constants'
import { getAddress } from '@ethersproject/address'
import { web3 } from './web3'
import * as LxAMM_ABI from '../abis/LxAMM.json'
import * as ERC20_ABI from '../abis/ERC20.json'

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = (value: string) => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// add 10%
export const calculateGasMargin = (value: BigNumber) => {
  return value
    .multipliedBy(new BigNumber(10000).plus(new BigNumber(1000)))
    .div(new BigNumber(10000))
    .decimalPlaces(0)
}

// account is optional
export const getContract = (ABI: any, address: string) => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new web3.eth.Contract(ABI, address)
}

export const getTokenContract = (address: string) => {
  return getContract(ERC20_ABI.abi, address)
}

export const getLxAMMContract = (address: string) => {
  return getContract(LxAMM_ABI.abi, address)
}
