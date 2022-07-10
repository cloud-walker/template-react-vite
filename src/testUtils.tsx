import {render} from '@testing-library/react'
import {ResponseResolver, rest, RestContext, RestRequest} from 'msw'
import {QueryClient, QueryClientProvider} from 'react-query'

function renderWithProviders(...[ui, options]: Parameters<typeof render>) {
  return render(ui, {
    ...options,
    wrapper: (props) => {
      return (
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                queries: {retry: 0},
              },
            })
          }
        >
          {props.children}
        </QueryClientProvider>
      )
    },
  })
}

export function makeMswHandler<TResponse>({
  path,
  method,
}: {
  path: string
  method: 'get' | 'post' | 'put' | 'delete'
}) {
  function _makeMswHandler(
    handler: ResponseResolver<
      RestRequest,
      RestContext,
      TResponse | {message: string}
    >,
  ) {
    return rest[method](path, handler)
  }
  return _makeMswHandler
}

export * from '@testing-library/react'
export {default as userEvent} from '@testing-library/user-event'
export {renderWithProviders as render}
