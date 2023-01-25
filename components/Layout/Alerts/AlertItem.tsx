import { forwardRef, useEffect, useState } from 'react'
import { Item } from './styles'
import { Variants } from 'framer-motion'
import { AlertType } from 'contexts/AlertsContext'

const ALERT_LAST_TIME = 5000

const variants: Variants = {
  out: {
    opacity: 0,
    scale: 0.9,
  },
  in: { opacity: 1, scale: 1 },
}

interface AlertItemProps {
  children: string
  alertType: AlertType
  remove: () => unknown
}

const AlertItem = forwardRef<HTMLButtonElement, AlertItemProps>(
  ({ children, remove, alertType }, ref) => {
    const [gettingRemoved, setGettingRemoved] = useState(false)

    useEffect(() => {
      if (gettingRemoved) remove()
    }, [gettingRemoved, remove])

    // Remove alert after time
    useEffect(() => {
      const timeout = setTimeout(() => setGettingRemoved(true), ALERT_LAST_TIME)

      return () => clearInterval(timeout)
    }, [])

    return (
      <Item
        ref={ref}
        layout
        onClick={() => setGettingRemoved(true)}
        initial="out"
        animate="in"
        exit="out"
        $type={alertType}
        variants={variants}
        transition={{
          type: 'spring',
          bounce: 0.4,
          duration: 0.8,
        }}
      >
        {children}
      </Item>
    )
  }
)

AlertItem.displayName = 'AlertItem'

export default AlertItem
