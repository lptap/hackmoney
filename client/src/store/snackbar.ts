import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SnackbarVariant } from 'shared/enums'

export type SnackbarState = {
  message: string
  variant: SnackbarVariant
  isOpen: boolean
}

const initialState: SnackbarState = {
  message: '',
  variant: SnackbarVariant.INFO,
  isOpen: false,
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<{ message: string; variant: SnackbarVariant }>) => ({
      ...state,
      message: action.payload.message,
      variant: action.payload.variant,
      isOpen: true,
    }),
    close: () => initialState,
  },
})
