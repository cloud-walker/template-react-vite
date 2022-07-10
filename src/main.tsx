import {setupWorker} from 'msw'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from 'react-query'

import {App} from './App'
import {getMockModules} from './mocks'

if (import.meta.env.DEV) {
  const modules = await getMockModules()

  modules.forEach(mod => {
    mod.seedData()
  })

  const handlers = modules.flatMap(mod => mod.handlers)
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
