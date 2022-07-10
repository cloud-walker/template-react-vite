import {DefaultBodyType, PathParams, rest} from 'msw'
import {z} from 'zod'

import {Count, ResponseGetCount, ResponsePutCount} from './count'

const initialCount = 0

let count: Count

export function seedData() {
  count = initialCount
}

export const handlers = [
  rest.get<DefaultBodyType, PathParams, ResponseGetCount>(
    '*/count',
    (req, res, ctx) => res(ctx.json(count)),
  ),
  rest.put<DefaultBodyType, PathParams, ResponsePutCount | {message: string}>(
    '*/count',
    (req, res, ctx) => {
      const parsedBody = z.object({count: z.number().int()}).safeParse(req.body)

      if (!parsedBody.success) {
        return res(ctx.status(400), ctx.json(parsedBody.error))
      }

      count = parsedBody.data.count

      return res(ctx.json(count))
    },
  ),
]
