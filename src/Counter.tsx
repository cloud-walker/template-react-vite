import {Count} from './count'

export function Counter({
  value,
  onIncrement,
  onDecrement,
}: {
  value: Count
  onIncrement: () => void
  onDecrement: () => void
}) {
  return (
    <>
      <button onClick={onDecrement}>{'-1'}</button>
      <output>{value}</output>
      <button onClick={onIncrement}>{'+1'}</button>
    </>
  )
}
