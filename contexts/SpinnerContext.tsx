import { ReactNode, createContext, useEffect, useState } from 'react'

export type SpinnerContext = number

export const initialValue: SpinnerContext = 1

export const SpinnerContext = createContext(initialValue)

export const DOTS_COUNT = 16
export const MAX_DOTS = 9
export const SPINNING_INTERVAL = 80

export const SpinnerContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [index, setIndex] = useState(1)
  const [focused, setFocused] = useState(true)

  useEffect(() => {
    if (!focused) return

    const interval = setInterval(
      () => setIndex((state) => (state + 1 > DOTS_COUNT ? 1 : state + 1)),
      SPINNING_INTERVAL
    )

    return () => clearInterval(interval)
  }, [focused])

  useEffect(() => {
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return (
    <SpinnerContext.Provider value={index}>{children}</SpinnerContext.Provider>
  )
}
