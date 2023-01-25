import { createPortal } from 'react-dom'
import { ReactNode, useEffect, useRef, useState } from 'react'

const Portal = ({ children }: { children: ReactNode }) => {
  const [loaded, setLoaded] = useState(false)
  const portalRef = useRef<HTMLDivElement>()

  useEffect(() => {
    portalRef.current = document.querySelector('#__portal') as HTMLDivElement

    setLoaded(true)
  }, [])

  if (!loaded || !portalRef.current) return null

  const portal = createPortal(children, portalRef.current)
  return portal
}

export default Portal
