import { motion } from 'framer-motion'
import styled from 'styled-components'

export type TooltipSide = 'left' | 'right'

interface TooltipContainerProps {
  side: TooltipSide
}

export const Container = styled(motion.div)<TooltipContainerProps>`
  position: absolute;
  top: 100%;
  ${({ side }) => side ?? 'left'}: 0;
  z-index: var(--z-tooltip);

  display: block;

  pointer-events: none;

  padding: 5px 10px;
  margin: 7px;
  outline: none;

  border-radius: ${({ side }) =>
    side === 'right' ? '10px 3px 10px 10px' : '3px 10px 10px 10px'};

  font-family: var(--font-family);
  font-size: 0.8rem;

  background-color: rgba(var(--c-dark-gray), 0.7);
  color: rgb(var(--c-black));

  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);

  backdrop-filter: blur(7px);
`
