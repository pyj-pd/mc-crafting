import {
  AlertType,
  DEFAULT_ALERT_TYPE,
  alertColors,
} from 'contexts/AlertsContext'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-alerts);

  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: start;

  width: 100%;
  max-width: 300px;
  max-height: 100vh;

  padding: 20px;

  pointer-events: none;
`

interface ItemProps {
  $type?: AlertType
}

export const Item = styled(motion.button)<ItemProps>`
  --alert-color: ${({ $type = DEFAULT_ALERT_TYPE }) => alertColors[$type]};

  display: block;

  width: 100%;

  background-color: rgb(var(--alert-color));
  color: rgb(var(--c-black));

  border: none;

  box-shadow: 0px 20px 40px 0px rgba(var(--alert-color), 0.5);

  padding: 15px;
  border-radius: 10px;

  cursor: pointer;

  user-select: none;

  pointer-events: all;
`
