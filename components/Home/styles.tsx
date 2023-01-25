import styled, { css } from 'styled-components'
import { mainStyles } from '../Components'

export const sectionStyles = css`
  display: grid;
  gap: 20px;

  width: 100%;
  height: 100%;
`

export const Container = styled.main`
  ${mainStyles};

  display: grid;
  gap: 30px;
  justify-items: center;
  align-content: start;
  grid-template-rows: auto auto;
`
