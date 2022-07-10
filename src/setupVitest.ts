import 'cross-fetch/polyfill'

import matchers from '@testing-library/jest-dom/matchers'
import {cleanup} from '@testing-library/react'
import {setLogger} from 'react-query'
import {afterAll, afterEach, beforeAll, expect} from 'vitest'

import {mswServer, seedData} from './mswServer'

expect.extend(matchers)

setLogger({log: console.log, warn: console.warn, error: () => {}})

beforeAll(() => {
  mswServer.listen({onUnhandledRequest: 'error'})
  seedData()
})

afterAll(() => {
  mswServer.close()
})

afterEach(() => {
  mswServer.resetHandlers()
  cleanup()
  seedData()
})
