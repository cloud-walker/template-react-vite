import {RestHandler} from 'msw'

export type MockModule = {
  handlers: Array<RestHandler>
  seedData: () => void
  reseedData: () => void
}

export async function getMockModules(): Promise<Array<MockModule>> {
  const importsMap = import.meta.glob<MockModule>('./**/*.mocks.ts')
  const modules = await Promise.all(
    Object.values(importsMap).map((importModule) => importModule()),
  )
  return modules
}
