export type Count = number

type ResponseGetCount = Count

type ResponsePutCount = Count

export async function getCount() {
  const res = await fetch('http://fake-backend.com/count')
  const body: ResponseGetCount = await res.json()
  return body
}

export async function putCount(payload: unknown) {
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
