import { renderHook, act } from '@testing-library/react-hooks'

import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  it('should return initialValue when localStorage is clean', () => {
    const { result } = renderHook(() =>
      useLocalStorage<string>('tests', 'example@email.com'),
    )

    expect(result.current[0]).toBe('example@email.com')
  })

  it('should be able storage and return storagedValue within localStorage', async () => {
    const { result } = renderHook(() => useLocalStorage<string>('tests'))

    act(() => {
      result.current[1]('example@email.com')
    })

    expect(result.current[0]).toBe('example@email.com')
  })

  it('should return saved value within localStorage', () => {
    Object.defineProperty(
      localStorage,
      'getItem',
      jest.fn().mockReturnValue('example@email.com'),
    )

    const { result } = renderHook(() => useLocalStorage<string>('tests'))

    expect(result.current[0]).toBe('example@email.com')
  })

  it('should remove item when setValue param is undefined', () => {
    Object.defineProperty(
      localStorage,
      'getItem',
      jest.fn().mockReturnValue('example@email.com'),
    )

    const { result } = renderHook(() =>
      useLocalStorage<string | undefined>('tests'),
    )

    act(() => {
      result.current[1](undefined)
    })

    expect(result.current[0]).toBeUndefined()
  })
})
