export type Count = number

export type ResponseGetCount = Count

export type PayloadPutCount = {count: Count}
export type ResponsePutCount = Count

export async function getCount() {
  const res = await fetch('http://fake-backend.com/count')
  const body: ResponseGetCount = await res.json()
  return body
}

export async function putCount(payload: PayloadPutCount) {
  const res = await fetch('http://fake-backend.com/count', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const body: ResponsePutCount = await res.json()
  return body
}
