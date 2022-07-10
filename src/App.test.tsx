import {expect, test} from 'vitest'

import {Demo} from './App.stories'
import {makeGetCountMswHandler} from './count.mocks'
import {mswServer} from './mswServer'
import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from './testUtils'

test('can increment counter', async () => {
  render(<Demo />)


  await waitForElementToBeRemoved(screen.queryByText('Loading...'))

  const buttonInc = screen.getByRole('button', {name: '+1'})
  const output = screen.getByText('0')

  expect(buttonInc).toBeEnabled()
  expect(buttonInc).toBeVisible()

  expect(output).toBeVisible()

  await userEvent.click(buttonInc)

  await waitFor(() => {
    expect(output).toHaveTextContent('1')
  })
})

test('can decrement counter', async () => {
  render(<Demo />)

  await waitForElementToBeRemoved(screen.queryByText('Loading...'))

  const buttonDec = screen.getByRole('button', {name: '-1'})
  const output = screen.getByText('0')

  expect(buttonDec).toBeEnabled()
  expect(buttonDec).toBeVisible()

  expect(output).toBeVisible()
  expect(output).toHaveTextContent('0')

  await userEvent.click(buttonDec)

  await waitFor(() => {
    expect(output).toHaveTextContent('-1')
  })
})

test('api error', async () => {
  mswServer.use(
    makeGetCountMswHandler((req, res, ctx) =>
      res(ctx.status(400), ctx.json({message: 'Bad error'})),
    ),
  )

  render(<Demo />)

  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

  expect(screen.getByText('Something went wrong.')).toBeVisible()
})
