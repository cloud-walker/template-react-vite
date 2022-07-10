import {setupServer} from 'msw/node'

import {getMockModules} from './mocks'

const mockModules = await getMockModules()

const handlers = mockModules.flatMap((mod) => mod.handlers)
export const mswServer = setupServer(...handlers)

export function seedData() {
  mockModules.forEach((mod) => {
    mod.seedData()
  })
}
