import { AnimatePresence, Variants } from 'framer-motion'
import { Container, TooltipSide } from './styles'
import { getItemIdString } from 'utils/string'
import { useRef } from 'react'

interface TooltipProps {
  hidden?: boolean
  ids: string[]
  side?: TooltipSide
}

const variants: Variants = {
  hidden: { opacity: 0, y: -5 },
  shown: { opacity: 1, y: 0 },
}

const Tooltip = ({ ids, hidden, side = 'left' }: TooltipProps) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <AnimatePresence>
      {!hidden && (
        <Container
          initial="hidden"
          animate="shown"
          exit="hidden"
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.3,
          }}
          side={side}
          variants={variants}
          ref={ref}
        >
          {getItemIdString(ids)}
        </Container>
      )}
    </AnimatePresence>
  )
}

export default Tooltip
