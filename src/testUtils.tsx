import {render} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from 'react-query'

export function renderWithProviders(
  ...[ui, options]: Parameters<typeof render>
) {
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
