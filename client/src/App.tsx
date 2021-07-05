import { ErrorBoundary } from 'react-error-boundary'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import * as routes from './route'
import { ErrorFallback, Snackbar } from 'components'
import { LayoutProvider } from 'shared/hooks'
import { HomeLayout } from 'features/home'
import { ConnectWalletModal } from 'features/connect-wallet'

function App() {
  return (
    <div className="flex flex-col justify-center items-center">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <LayoutProvider>
          <Switch>
            <Route path={routes.homeUrl} component={HomeLayout} />
          </Switch>
        </LayoutProvider>
      </ErrorBoundary>

      <ConnectWalletModal />
      <Snackbar />
    </div>
  )
}

export default App
