import {z} from 'zod'

import {Count, ResponseGetCount, ResponsePutCount} from './count'
import {makeMswRestHandler} from './mocks'

const initialData = 0

let data: Count

export function seedData() {
  data = initialData
}

export const makeGetCountMswHandler = makeMswRestHandler<ResponseGetCount>({
  path: '*/count',
  method: 'get',
})

export const makePutCountMswHandler = makeMswRestHandler<
  ResponsePutCount | {message: string}
>({
  path: '*/count',
  method: 'put',
})

export const handlers = [
  makeGetCountMswHandler((req, res, ctx) => res(ctx.json(data))),
  makePutCountMswHandler((req, res, ctx) => {
    const parsedBody = z.object({count: z.number().int()}).safeParse(req.body)

    if (!parsedBody.success) {
      return res(ctx.status(400), ctx.json(parsedBody.error))
    }

    data = parsedBody.data.count

    return res(ctx.json(data))
  }),
]
