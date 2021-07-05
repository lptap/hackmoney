import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit'
import { snackbarSlice } from './snackbar'
import { visibilitySlice } from './visibility'
import { walletSlice } from './wallet'

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    visibility: visibilitySlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
