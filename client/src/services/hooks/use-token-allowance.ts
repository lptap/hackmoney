import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { getTokenContract } from '../web3'
import { Token } from '../token'

export function useTokenAllowance(
  token?: Token,
  account?: string,
  spender?: string,
  shouldRefresh?: boolean,
): BigNumber | null {
  const contract = useMemo(() => {
    return token ? getTokenContract(token.address) : null
  }, [token])
  const [approveBalance, setApproveBalance] = useState<BigNumber | null>(null)

  useEffect(() => {
    const allowance = async () => {
      if (!account || !spender) {
        return
      }

      const result = await contract?.methods.allowance(account, spender).call()
      setApproveBalance(new BigNumber(!result ? '0' : result.toString()))
    }

    allowance()
  }, [contract?.methods, account, spender, shouldRefresh])

  return useMemo(() => approveBalance, [approveBalance])
}
