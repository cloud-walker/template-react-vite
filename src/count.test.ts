import {describe, expect, it} from 'vitest'

import {getCount, putCount} from './count'
import {makeGetCountMswHandler} from './count.mocks'
import {mswServer} from './mswServer'

describe('getCount', () => {
  it('works properly', async () => {
    await expect(getCount()).resolves.toBe(0)
  })
  it('fails properly', async () => {
    mswServer.use(
      makeGetCountMswHandler((req, res, ctx) =>
        res(ctx.status(500), ctx.json({message: 'Error'})),
      ),
    )

    await expect(() => getCount()).rejects.toHaveProperty('status', 500)
  })
})

describe('putCount', () => {
  it('works properly', async () => {
    await expect(putCount({count: 10})).resolves.toBe(10)
  })
  it('fails properly', async () => {
    await expect(() =>
      putCount({
        // @ts-expect-error We want to intentionally break the call
        foo: 'bar',
      }),
    ).rejects.toHaveProperty('status', 400)
  })
})
