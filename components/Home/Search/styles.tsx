import styled from 'styled-components'
import { sectionStyles } from '../styles'
import Link from 'next/link'

export const Container = styled.section`
  ${sectionStyles}

  justify-items: center;
  align-content: start;
  grid-template-rows: auto auto;
`

export const TitleContainer = styled.div`
  position: relative;
`

export const Title = styled(Link)`
  display: block;

  margin: 0;
  padding: 0;

  font-size: 2.4rem;
  font-weight: bold;

  text-align: center;

  @media screen and (max-width: 500px) {
    & {
      font-size: 1.5rem;
    }
  }
`

export const Form = styled.form`
  position: relative;

  display: grid;
  gap: 10px;
  place-items: stretch;
  grid-template-rows: auto auto;

  width: 100%;
  max-width: var(--fixed-width);
`

export const ButtonContainer = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr auto;
`
