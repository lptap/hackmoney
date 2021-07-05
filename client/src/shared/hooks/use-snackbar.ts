import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SnackbarVariant } from 'shared/enums'
import { snackbarSlice } from 'store/snackbar'
import { RootState } from 'store'

export const useSnackbar = () => {
  const dispatch = useDispatch()
  const message = useSelector((state: RootState) => state.snackbar.message)
  const isOpen = useSelector((state: RootState) => state.snackbar.isOpen)
  const variant = useSelector((state: RootState) => state.snackbar.variant)

  return {
    message,
    variant,
    isOpen,
    open: (message: string, variant: SnackbarVariant) => {
      dispatch(snackbarSlice.actions.open({ message, variant }))
    },
    close: useCallback(() => {
      dispatch(snackbarSlice.actions.close())
    }, [dispatch]),
  }
}
