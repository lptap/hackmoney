import * as React from 'react'
import { noop } from '@reach/utils'

export type LayoutType = 'plain' | 'withNavigation'

const LayoutDispatchContext = React.createContext<React.Dispatch<React.SetStateAction<LayoutType>>>(noop)
LayoutDispatchContext.displayName = 'LayoutDispatch'

const LayoutValueContext = React.createContext<LayoutType>('withNavigation')
LayoutValueContext.displayName = 'LayoutValue'

export const LayoutProvider = (props: { children: React.ReactNode }) => {
  const [layout, setLayout] = React.useState<LayoutType>('withNavigation')

  return (
    <LayoutDispatchContext.Provider value={setLayout}>
      <LayoutValueContext.Provider value={layout}>{props.children}</LayoutValueContext.Provider>
    </LayoutDispatchContext.Provider>
  )
}

export const useLayoutValue = () => React.useContext(LayoutValueContext)

/**
 * add this hooks into your page component to remove the shell
 * (sidebar + header)
 */
export const usePlainLayout = () => {
  const setLayout = React.useContext(LayoutDispatchContext)

  React.useLayoutEffect(() => {
    setLayout('plain')

    return () => {
      setLayout('withNavigation')
    }
  }, [setLayout])
}
