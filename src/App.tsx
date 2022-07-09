import {useState} from 'react'

import {Counter} from './Counter'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <Counter
      value={count}
      onDecrement={() => {
        setCount(count - 1)
      }}
      onIncrement={() => {
        setCount(count + 1)
      }}
    />
  )
}
