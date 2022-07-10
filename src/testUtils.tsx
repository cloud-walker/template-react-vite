import {render} from '@testing-library/react'
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

export * from '@testing-library/react'
export {default as userEvent} from '@testing-library/user-event'
export {renderWithProviders as render}
