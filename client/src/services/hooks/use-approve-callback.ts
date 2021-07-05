import BigNumber from 'bignumber.js'
import { MaxUint256 } from '@ethersproject/constants'
import { useCallback, useMemo, useState } from 'react'
import { calculateGasMargin, getTokenContract } from '../web3'
import { Token } from '../token'
import { BaseWalletService } from '../wallet'
import { useTokenAllowance } from './use-token-allowance'
import { ApprovalState, SnackbarVariant } from 'shared/enums'
import { useSnackbar } from 'shared/hooks'

export function useApproveCallback(
  token?: Token,
  wallet?: BaseWalletService,
  owner?: string,
  spender?: string,
  amountToApprove?: string | number,
): [ApprovalState, () => Promise<void>, () => void] {
  const snackbar = useSnackbar()
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)
  const currentAllowance = useTokenAllowance(token, owner, spender, shouldRefresh)
  const amountToApproveAsUnit = useMemo(() => {
    return !token || !amountToApprove
      ? new BigNumber('0')
      : new BigNumber(amountToApprove).multipliedBy(new BigNumber(10).pow(token.decimals)).decimalPlaces(0)
  }, [token, amountToApprove])

  const approvalState: ApprovalState = useMemo(() => {
    if (!spender || amountToApproveAsUnit.isZero()) {
      return ApprovalState.UNKNOWN
    }

    if (!spender) {
      return ApprovalState.UNKNOWN
    }

    if (!currentAllowance) {
      return ApprovalState.UNKNOWN
    }

    if (currentAllowance.lt(amountToApproveAsUnit)) {
      return ApprovalState.NOT_APPROVED
    }

    return ApprovalState.APPROVED
  }, [currentAllowance, spender, amountToApproveAsUnit])

  const approve = useCallback(async () => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }

    if (!token || !token.address) {
      console.error('invalid token')
      return
    }

    if (!amountToApproveAsUnit) {
      console.error('missing amount to approve')
      return
    }

    if (!spender) {
      console.error('no spender')
      return
    }

    let useExact = false
    const contract = getTokenContract(token.address)
    const estimateGas = await contract?.methods
      .approve(spender, MaxUint256.toString())
      .estimateGas({
        from: owner,
      })
      .catch(() => {
        useExact = true
        return contract.methods.approve(spender, amountToApproveAsUnit.toString()).estimateGas({
          from: owner,
        })
      })

    const data = contract?.methods
      .approve(spender, useExact ? amountToApproveAsUnit.toString() : MaxUint256)
      .encodeABI()
    return wallet
      ?.makeTransaction({
        from: owner,
        to: token.address,
        gasLimit: calculateGasMargin(new BigNumber(estimateGas.toString())).toString(),
        value: '0x0',
        data,
      })
      .then((txHash: string) => {
        snackbar.open(`Approve ${token.symbol} at ${txHash}`, SnackbarVariant.SUCCESS)
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)
        snackbar.open(error.message, SnackbarVariant.ERROR)
      })
  }, [approvalState, token, wallet, owner, spender, amountToApproveAsUnit, snackbar])

  const refresh = useCallback(() => setShouldRefresh(true), [])

  return [approvalState, approve, refresh]
}
