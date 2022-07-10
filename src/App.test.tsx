import {screen, waitForElementToBeRemoved} from '@testing-library/react'
import {rest} from 'msw'
import {expect, test} from 'vitest'

import {App} from './App'
import {mswServer} from './mswServer'
import {renderWithProviders} from './testUtils'

// test('can increment counter', async () => {
//   renderWithProviders(<App />)

//   await waitForElementToBeRemoved(screen.queryByText('Loading...'))

//   const buttonInc = screen.getByRole('button', {name: '+1'})
//   const output = screen.getByText('0')

//   expect(buttonInc).toBeEnabled()
//   expect(buttonInc).toBeVisible()

//   expect(output).toBeVisible()

//   await userEvent.click(buttonInc)

//   await waitFor(() => {
//     expect(output).toHaveTextContent('1')
//   })
// })

// test('can decrement counter', async () => {
//   renderWithProviders(<App />)

//   await waitForElementToBeRemoved(screen.queryByText('Loading...'))

//   const buttonDec = screen.getByRole('button', {name: '-1'})
//   const output = screen.getByText('0')

//   expect(buttonDec).toBeEnabled()
//   expect(buttonDec).toBeVisible()

//   expect(output).toBeVisible()
//   expect(output).toHaveTextContent('0')

//   await userEvent.click(buttonDec)

//   await waitFor(() => {
//     expect(output).toHaveTextContent('-1')
//   })
// })

test('api error', async () => {
  mswServer.use(
    rest.get('*/count', (req, res, ctx) =>
      res(ctx.status(200), ctx.json({message: 'Server error'})),
    ),
  )

  renderWithProviders(<App />)

  await waitForElementToBeRemoved(screen.queryByText('Loading...'))

  expect(screen.getByText('Something went wrong.')).toBeVisible()
})
