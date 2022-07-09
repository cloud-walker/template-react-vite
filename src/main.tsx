import React from 'react'
import ReactDOM from 'react-dom/client'
import {RestHandler, setupWorker} from 'msw'
import {QueryClient, QueryClientProvider} from 'react-query'

import {App} from './App'

if (import.meta.env.DEV) {
  type MSWModule = {handlers: Array<RestHandler>}

  const importsMap = import.meta.glob<MSWModule>('./**/*.mocks.ts')
  const modules = await Promise.all(
    Object.values(importsMap).map((importModule) => importModule()),
  )
  const handlers = modules.flatMap((mod) => mod.handlers)

  const worker = setupWorker(...handlers)

  worker.start({onUnhandledRequest: 'error'})
}

const rootElement = document.getElementById('root')

if (rootElement == null) {
  throw Error('#root element not found')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
