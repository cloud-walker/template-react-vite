import {useMutation, useQuery, useQueryClient} from 'react-query'

import {getCount, putCount} from './count'
import {Counter} from './Counter'

export function hApp() {
  const queryClient = useQueryClient()
  const query = useQuery({queryKey: ['count'], queryFn: getCount})
  const mutation = useMutation(putCount, {
    onSuccess: () => {
      queryClient.invalidateQueries('count')
    },
  })
  console.log(query)

  if (query.isError) {
    console.log('???')
    return <p>Something went wrong.</p>
  }

  if (query.isLoading || query.isIdle) {
    return <p>Loading...</p>
  }

  console.log(query.data)
  return (
    <Counter
      value={query.data}
      onDecrement={() => {
        mutation.mutate({count: query.data - 1})
      }}
      onIncrement={() => {
        mutation.mutate({count: query.data + 1})
      }}
    />
  )
}
