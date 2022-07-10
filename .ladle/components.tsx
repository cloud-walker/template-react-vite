import {GlobalProvider} from '@ladle/react'
import {setupWorker} from 'msw'
import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'

import {getMockModules} from '../src/mocks'

const mockModules = await getMockModules()

mockModules.forEach((mod) => {
  mod.seedData()
})

const handlers = mockModules.flatMap((mod) => mod.handlers)

const worker = setupWorker(...handlers)

worker.start({
  onUnhandledRequest: (req) => {
    if (req.url.pathname.includes('@fs')) {
      return
    }

    console.warn(`Unhandled request ${req.url}`)
  },
})

export const Provider: GlobalProvider = ({children}) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  )
}
