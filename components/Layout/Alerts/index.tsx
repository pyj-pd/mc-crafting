import { useContext } from 'react'
import { Container } from './styles'
import { AlertsContext } from 'contexts/AlertsContext'
import AlertItem from './AlertItem'
import { AnimatePresence } from 'framer-motion'

const Alerts = () => {
  const {
    alerts: { state, setState },
  } = useContext(AlertsContext)

  /**
   * Remove item from alert list
   * @param id Alert ID
   */
  const remove = (id: string) => {
    setState((state) => {
      const prevState = [...state]
      const index = state.findIndex((item) => item.id === id)

      prevState.splice(index, 1)

      return prevState
    })
  }

  return (
    <Container>
      <AnimatePresence mode="popLayout">
        {state.map(({ id, message, type }) => (
          <AlertItem
            key={id}
            remove={() => remove(id)}
            alertType={type}
          >
            {message}
          </AlertItem>
        ))}
      </AnimatePresence>
    </Container>
  )
}

export default Alerts
