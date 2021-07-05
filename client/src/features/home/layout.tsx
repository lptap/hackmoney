import cn from 'classnames'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppHeader, Button, FormDropdown, FormField, FormInput } from 'components'
import { useDepositFormik } from './hooks'
import { getWallet } from './home.selector'
import { VisibilityName } from 'store/visibility'
import { useVisibility } from 'shared/hooks'
import { ApprovalState, DEPOSIT_TYPE } from 'shared/enums'
import { getCurrentNetworkConfig, getDepositOptions } from 'shared/helpers'
import { LxAMM, useApproveCallback, useDepositCallback, useFetchRealBalance } from 'services'

export const HomeLayout: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentType, setCurrentType] = useState<DEPOSIT_TYPE>(DEPOSIT_TYPE.ASSET)
  const connectWalletModal = useVisibility(VisibilityName.CONNECT_WALLET)

  const depositFormik = useDepositFormik({
    onSuccess: () => {},
  })

  const currentNetworkConfig = getCurrentNetworkConfig()
  const assets = getDepositOptions(currentType, currentNetworkConfig.networkId)

  const depositAmount = depositFormik.values.amount
  const selectedToken = assets.find((asset) => asset.value === depositFormik.values.asset)
  const { address, wallet } = useSelector(getWallet)
  const tokenBalance = useFetchRealBalance(selectedToken?.token, address || undefined)
  const [approvalState, approveCallback, refreshCallback] = useApproveCallback(
    selectedToken?.token,
    wallet || undefined,
    address || undefined,
    LxAMM[currentNetworkConfig.networkId],
    depositAmount,
  )

  const [depositCallback] = useDepositCallback(
    currentNetworkConfig.networkId,
    selectedToken?.token,
    wallet || undefined,
    address || undefined,
    depositAmount,
  )

  const switchTab = (type: DEPOSIT_TYPE) => {
    setCurrentType(type)
    depositFormik.resetForm()
  }

  const handleMax = () => {
    if (!tokenBalance || tokenBalance.isEqualTo(0)) {
      depositFormik.setFieldValue('amount', '')
      return
    }
    depositFormik.setFieldValue('amount', tokenBalance.toString())
  }

  const handleApprove = async () => {
    setLoading(true)
    await approveCallback()

    setTimeout(() => {
      refreshCallback()
      setLoading(false)
    }, 3000)
  }

  const handleDeposit = async () => {
    setLoading(true)
    await depositCallback()

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <AppHeader />
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col items-center w-full max-w-3xl py-20">
          {/* tab */}
          <div className="w-max overflow-hidden border-2 border-primary-500 rounded-3xl">
            <Button
              className={cn(
                'w-64 font-black border-none rounded-l-none rounded-r-none py-5 px-6',
                currentType !== DEPOSIT_TYPE.ASSET ? 'text-primary-500' : 'text-white',
                {
                  'bg-primary-500': currentType === DEPOSIT_TYPE.ASSET,
                },
              )}
              onClick={() => switchTab(DEPOSIT_TYPE.ASSET)}
            >
              DEPOSIT ASSET
            </Button>
            <Button
              className={cn(
                'w-64 font-black border-none rounded-l-none rounded-r-none py-5 px-6',
                currentType !== DEPOSIT_TYPE.LP_TOKEN ? 'text-primary-500' : 'text-white',
                {
                  'bg-primary-500': currentType === DEPOSIT_TYPE.LP_TOKEN,
                },
              )}
              onClick={() => switchTab(DEPOSIT_TYPE.LP_TOKEN)}
            >
              DEPOSIT LP TOKEN
            </Button>
          </div>

          {/* input */}
          <div className="w-full border-2 rounded-2xl px-12 py-32 my-20">
            {!!selectedToken && !!tokenBalance && (
              <div className="flex flex-row justify-end mb-4">
                {`Balance: ${tokenBalance?.toString()} ${selectedToken?.token?.symbol}`}
              </div>
            )}
            <form
              onSubmit={() => {
                depositFormik.handleSubmit()
              }}
            >
              <div className="flex flex-row items-start">
                <FormField {...depositFormik} name="amount" placeholder="0.0" type="number" component={FormInput} />

                <Button
                  type="button"
                  className="border-primary-500 text-xs text-primary-500 font-bold leading-4 px-7 h-12"
                  onClick={handleMax}
                >
                  MAX
                </Button>

                <FormField
                  {...depositFormik}
                  name="asset"
                  placeholder="Select One"
                  className="w-max ml-5"
                  useSetValue
                  component={FormDropdown}
                  componentParams={{
                    options: assets.map((opt) => {
                      return {
                        label: opt.label,
                        value: opt.value,
                        icon: opt.icon,
                      }
                    }),
                  }}
                />
              </div>
            </form>
          </div>

          {/* action */}
          <div className="flex justify-center w-full">
            {!address ? (
              <Button
                className="w-full text-white font-semibold bg-primary-500 border-none mx-16 py-5"
                onClick={() => connectWalletModal.open()}
              >
                CONNECT WALLET
              </Button>
            ) : !selectedToken ? (
              <Button className="w-full text-white font-semibold bg-primary-500 border-none mx-16 py-5" disabled>
                SELECT ASSET
              </Button>
            ) : !depositAmount ? (
              <Button className="w-full text-white font-semibold bg-primary-500 border-none mx-16 py-5" disabled>
                INPUT AMOUNT
              </Button>
            ) : !tokenBalance || tokenBalance.isEqualTo(0) ? (
              <Button className="w-full text-white font-semibold bg-primary-500 border-none mx-16 py-5" disabled>
                BALANCE INSUFFICIENT
              </Button>
            ) : approvalState !== ApprovalState.APPROVED ? (
              <Button
                className="w-full text-white font-semibold bg-primary-500 border-none mx-16 py-5"
                loading={loading}
                disabled={loading}
                onClick={handleApprove}
              >{`APPROVE ${selectedToken?.token?.symbol}`}</Button>
            ) : currentType === DEPOSIT_TYPE.ASSET ? (
              <Button
                className="w-full text-white font-semibold bg-primary-500 border-none mx-16 py-5"
                loading={loading}
                disabled={loading}
                onClick={handleDeposit}
              >
                DEPOSIT
              </Button>
            ) : currentType === DEPOSIT_TYPE.LP_TOKEN ? (
              <Button
                className="w-full text-white font-semibold bg-primary-500 border-none mx-16 py-5"
                loading={loading}
                disabled={loading}
              >
                STATE
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
