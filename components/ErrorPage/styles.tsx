import styled from 'styled-components'
import { mainStyles } from '../Components'

export const Container = styled.main`
  ${mainStyles};

  display: grid;
  justify-items: center;

  width: 100%;
`

export const TextContainer = styled.div`
  display: grid;
  gap: 20px;
  justify-items: left;
  align-content: start;
  grid-template-rows: auto auto auto;

  width: 100%;
  max-width: 1000px;
`

export const NotFoundText = styled.h1`
  display: block;

  margin: 0;
  padding: 0;

  font-size: 3rem;

  text-shadow: 3px 3px 0 rgba(var(--c-red), 0.4),
    -3px -3px 0 rgba(var(--c-blue), 0.4);
`

export const Description = styled.p`
  display: block;

  margin: 0;
  padding: 0;

  font-size: 1.2rem;
`
