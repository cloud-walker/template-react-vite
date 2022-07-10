import {useMutation, useQuery, useQueryClient} from 'react-query'

import {getCount, putCount} from './count'
import {Counter} from './Counter'

export function App() {
  const queryClient = useQueryClient()
  const query = useQuery({queryKey: ['count'], queryFn: getCount})
  const mutation = useMutation(putCount, {
    onSuccess: () => {
      queryClient.invalidateQueries('count')
    },
  })

  if (query.isError) {
    return <p>Something went wrong.</p>
  }

  if (query.isLoading || query.isIdle) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>App</h1>
      <Counter
        value={query.data}
        onDecrement={() => {
          mutation.mutate({count: query.data - 1})
        }}
        onIncrement={() => {
          mutation.mutate({count: query.data + 1})
        }}
      />
    </>
  )
}
