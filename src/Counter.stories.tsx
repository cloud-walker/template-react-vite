import {Story} from '@ladle/react'

import {Counter} from './Counter'

export const Demo: Story<Parameters<typeof Counter>[0]> = Counter

Demo.defaultProps = {
  onIncrement: console.log,
  onDecrement: console.log,
}

Demo.args = {
  value: 0,
}
