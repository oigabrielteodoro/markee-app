import { useCallback, useState } from 'react'

import { pipe, identity } from 'fp-ts/function'
import { toError, tryCatch } from 'fp-ts/Either'
import { fromNullable, isSome, some, none, fold } from 'fp-ts/Option'

const PREFIX = '@MarkeeApp'

function getStorageValue(key: string) {
  const storagedValue = fromNullable(localStorage.getItem(`${PREFIX}:${key}`))

  if (isSome(storagedValue)) {
    return some(JSON.parse(storagedValue.value))
  }

  return none
}

export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() =>
    pipe(
      getStorageValue(key),
      fold(() => initialValue, identity),
    ),
  )

  const setValue = useCallback(
    (value: T) => {
      tryCatch(() => {
        setState(value)

        if (typeof value === 'undefined') {
          localStorage.removeItem(`${PREFIX}:${key}`)
        } else {
          localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value))
        }
      }, toError)
    },
    [key],
  )

  return [state, setValue]
}
