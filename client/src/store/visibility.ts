import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum VisibilityName {
  CONNECT_WALLET = 'connectWallet',
}

export type VisibilityState = {
  [VisibilityName.CONNECT_WALLET]: boolean
}

const initialState: Record<VisibilityName, boolean> = {
  [VisibilityName.CONNECT_WALLET]: false,
}

export const visibilitySlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<VisibilityName>) => ({
      ...state,
      [action.payload]: true,
    }),
    close: (state, action: PayloadAction<VisibilityName>) => ({
      ...state,
      [action.payload]: false,
    }),
    closeAll: () => initialState,
    toggle: (state, action: PayloadAction<VisibilityName>) => ({
      ...state,
      [action.payload]: !state[action.payload],
    }),
    set: (state, action: PayloadAction<{ name: VisibilityName; state: boolean }>) => ({
      ...state,
      [action.payload.name]: action.payload.state,
    }),
  },
})
