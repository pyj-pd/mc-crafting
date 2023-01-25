import { Alert, AlertsContext } from 'contexts/AlertsContext'
import { ReactNode, useState } from 'react'
import Alerts from './Alerts'
import Portal from '../Portal'
import Navbar from './Navbar'

const Layout = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  return (
    <AlertsContext.Provider
      value={{ alerts: { state: alerts, setState: setAlerts } }}
    >
      <Portal>
        <Alerts />
      </Portal>
      <Navbar />
      {children}
    </AlertsContext.Provider>
  )
}

export default Layout
