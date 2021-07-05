import BigNumber from 'bignumber.js'
import { useCallback, useMemo } from 'react'
import { BaseWalletService } from '../wallet'
import { Token } from '../token'
import { calculateGasMargin, getLxAMMContract } from '../web3'
import { LxAMM } from '../constants'
import { ChainId, Dex, SnackbarVariant } from 'shared/enums'
import { useSnackbar } from 'shared/hooks'

export function useDepositCallback(
  chainId: ChainId,
  token?: Token,
  wallet?: BaseWalletService,
  account?: string,
  amount?: string | number,
): [() => Promise<void>] {
  const snackbar = useSnackbar()
  const contract = useMemo(() => getLxAMMContract(LxAMM[chainId]), [chainId])

  const deposit = useCallback(async () => {
    if (!token || !wallet || !amount || new BigNumber(amount).isZero()) {
      return
    }

    try {
      const depositAmount = new BigNumber(amount)
        .multipliedBy(new BigNumber(10).pow(token.decimals))
        .decimalPlaces(0)
        .toString()
      const estimateGas = await contract.methods.deposit(token.address, depositAmount, Dex.UNISWAP).estimateGas({
        from: account,
      })
      const data = contract.methods.deposit(token.address, depositAmount, Dex.UNISWAP).encodeABI()
      return wallet
        ?.makeTransaction({
          from: account,
          to: LxAMM[chainId],
          gasLimit: calculateGasMargin(new BigNumber(estimateGas.toString())).toString(),
          value: '0x0',
          data,
        })
        .then((txHash: string) => {
          snackbar.open(`Deposited ${amount.toString()} ${token.symbol} at ${txHash}`, SnackbarVariant.SUCCESS)
        })
        .catch((error: Error) => {
          console.debug('Failed to deposit token', error)
          snackbar.open(error.message, SnackbarVariant.ERROR)
        })
    } catch (error) {
      snackbar.open(error.message, SnackbarVariant.ERROR)
    }
  }, [chainId, contract.methods, token, wallet, account, amount, snackbar])

  return [deposit]
}
