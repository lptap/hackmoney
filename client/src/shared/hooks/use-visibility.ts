import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { VisibilityName, visibilitySlice } from 'store/visibility'

export const useVisibility = (name: VisibilityName) => {
  const isOpen = useSelector((state: RootState) => state.visibility[name])
  const dispatch = useDispatch()

  return {
    isOpen,
    close: useCallback(() => {
      dispatch(visibilitySlice.actions.close(name))
    }, [dispatch, name]),
    open: useCallback(() => {
      dispatch(visibilitySlice.actions.open(name))
    }, [dispatch, name]),
    toggle: useCallback(() => {
      dispatch(visibilitySlice.actions.toggle(name))
    }, [dispatch, name]),
    set: (state: boolean) => {
      dispatch(visibilitySlice.actions.set({ name, state }))
    },
  }
}
