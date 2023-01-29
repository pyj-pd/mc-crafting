import styled from 'styled-components'
import { sectionStyles } from '../styles'

// We use percentage to implement responsive
// layout of crafting table
//
// I know this feels illegal,
// but it works.

const WIDTH = 176,
  HEIGHT = 88

const CONTAINER_PADDING = {
  top: (1 / WIDTH) * 100,
  left: (1 / WIDTH) * 100,
  bottom: (3 / WIDTH) * 100,
  right: (3 / WIDTH) * 100,
}

const GAP = (7 / WIDTH) * 100

const INPUT_CONTAINER_WIDTH = (54 / WIDTH) * 100
const INPUT_IMAGE_WIDTH = (16 / 18) * 100

const ARROW_WIDTH = (22 / WIDTH) * 100,
  ARROW_HEIGHT = (15 / HEIGHT) * 100

const OUTPUT_CONTAINER_WIDTH = (26 / WIDTH) * 100
const OUTPUT_COUNT_POSITION = (5 / 26) * 100
const OUTPUT_IMAGE_WIDTH = (16 / 26) * 100

export const Container = styled.section`
  ${sectionStyles}

  place-items: start;

  width: 100%;
  max-width: 600px;
`

export const TableContainer = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${GAP}%;

  width: 100%;
  aspect-ratio: 2 / 1;

  padding: ${CONTAINER_PADDING.top}% ${CONTAINER_PADDING.right}%
    ${CONTAINER_PADDING.bottom}% ${CONTAINER_PADDING.left}%;

  background-image: url('/assets/table/crafting-table.png');
  background-size: 100%;
  background-repeat: no-repeat;
  image-rendering: pixelated;

  font-family: var(--f-minecraft), var(--font-family);
`

export const TextContainer = styled.div`
  display: grid;
  place-items: center;

  width: 50%;

  color: black;
`

export const InputContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;

  width: ${INPUT_CONTAINER_WIDTH}%;
  aspect-ratio: 1 / 1;

  background-image: url('/assets/table/input-table.png');
  background-size: 100%;
  background-repeat: no-repeat;
`

interface InputProps {
  $empty?: boolean
}

export const Input = styled.button<InputProps>`
  position: relative;

  display: grid;
  place-items: center;

  width: 100%;
  height: 100%;

  border: none;
  padding: 0;
  margin: 0;

  background: none;

  pointer-events: ${({ $empty }) => ($empty ? 'none' : 'auto')};

  cursor: pointer;
`

export const InputImageContainer = styled.div`
  position: relative;

  width: ${INPUT_IMAGE_WIDTH}%;
  aspect-ratio: 1/ 1;
`

export const Arrow = styled.div`
  width: ${ARROW_WIDTH}%;
  height: ${ARROW_HEIGHT}%;

  background-image: url('/assets/table/arrow.png');
  background-size: 100%;
  background-repeat: no-repeat;
`

export const OutputContainer = styled.div`
  position: relative;

  display: grid;
  place-items: center;

  width: ${OUTPUT_CONTAINER_WIDTH}%;
  aspect-ratio: 1 / 1;

  background-image: url('/assets/table/output-table.png');
  background-size: 100%;
  background-repeat: no-repeat;
`

export const OutputImageContainer = styled.div`
  position: relative;

  width: ${OUTPUT_IMAGE_WIDTH}%;
  aspect-ratio: 1 / 1;

  cursor: pointer;
`

export const OutputCount = styled.span`
  position: absolute;
  right: ${OUTPUT_COUNT_POSITION}%;
  bottom: ${OUTPUT_COUNT_POSITION}%;

  display: block;

  color: white;
  font-family: var(--f-minecraft), var(--font-family);
`
