import { createContext, useCallback, useContext } from 'react'

export type AlertType = 'warning' | 'error' | 'info'
export const DEFAULT_ALERT_TYPE = 'error'
export const alertColors: Record<AlertType, string> = {
  error: 'var(--c-red)',
  info: 'var(--c-dark-gray)',
  warning: 'var(--c-orange)',
}

export interface Alert {
  id: string
  message: string
  type: AlertType
}

export interface AlertsContextData {
  alerts: {
    state: Alert[]
    setState: React.Dispatch<React.SetStateAction<Alert[]>>
  }
}

export const initialValue: AlertsContextData = {
  alerts: {
    state: [],
    setState: () => null,
  },
}

export const AlertsContext = createContext(initialValue)

/**
 * Hook for adding message to alert
 * @returns Function for adding alert
 */
export const useAlerts = () => {
  const {
    alerts: { setState },
  } = useContext(AlertsContext)

  /**
   * Add message to alert
   * @param message Alert message
   * @param type Alert type
   */
  const addAlert = useCallback(
    (message: string, type: AlertType = DEFAULT_ALERT_TYPE) => {
      const id = new Date().getTime().toString(36)

      setState((state) => [...state, { id, message, type }])
    },
    [setState]
  )

  return { addAlert }
}
