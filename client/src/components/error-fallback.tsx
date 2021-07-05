import React, { FC } from 'react'
import type { FallbackProps } from 'react-error-boundary'

export const ErrorFallback: FC<FallbackProps> = (props) => (
  <div className="error-fallback">
    <p>Something went wrong</p>
    {props.error && (
      <>
        <pre>{props.error.message}</pre>
      </>
    )}
    <div>
      <button onClick={props.resetErrorBoundary}>Try again</button>
    </div>
  </div>
)
