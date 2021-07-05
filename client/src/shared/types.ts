import { AnyAction } from 'redux'
import { ThunkAction as OriThunkAction, ThunkDispatch as OriThunkDispatch } from 'redux-thunk'
import { Token } from 'services/token'
import { RootState } from 'store'
import { ChainId } from './enums'

export type ThunkAction<Result> = OriThunkAction<Result, RootState, void, AnyAction>

export type ThunkDispatch = OriThunkDispatch<RootState, undefined, AnyAction>

export type Config = {
  CHAIN_ID: ChainId
  CHAIN_NAME: string
  PROVIDER: string
}

export type AssetCoin = {
  label: string
  value: string
  icon?: string
  token?: Token
}
