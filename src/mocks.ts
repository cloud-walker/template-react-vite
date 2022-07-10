import {
  ResponseResolver,
  rest,
  RestContext,
  RestHandler,
  RestRequest,
} from 'msw'

export type MockModule = {
  handlers: Array<RestHandler>
  seedData: () => void
}

export async function getMockModules(): Promise<Array<MockModule>> {
  const importsMap = import.meta.glob<MockModule>('./**/*.mocks.ts')
  const modules = await Promise.all(
    Object.values(importsMap).map((importModule) => importModule()),
  )
  return modules
}

export function makeMswRestHandler<TResponse>({
  path,
  method,
}: {
  path: string
  method: 'get' | 'post' | 'put' | 'delete'
}) {
  return function _makeMswRestHandler(
    handler: ResponseResolver<
      RestRequest,
      RestContext,
      TResponse | {message: string}
    >,
  ) {
    return rest[method](path, handler)
  }
}
