import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { getTokenContract } from '../web3'
import { Token } from '../token'

export function useFetchRealBalance(token?: Token, account?: string): BigNumber | null {
  const contract = useMemo(() => {
    return token ? getTokenContract(token.address) : null
  }, [token])
  const [balance, setBalance] = useState<BigNumber | null>(null)

  useEffect(() => {
    const allowance = async () => {
      if (!account) {
        return
      }

      const result = await contract?.methods.balanceOf(account).call()
      setBalance(new BigNumber(!result ? '0' : result.toString()).div(new BigNumber(10).pow(token?.decimals || 0)))
    }

    allowance()
  }, [contract?.methods, token?.decimals, account])

  return useMemo(() => balance, [balance])
}
