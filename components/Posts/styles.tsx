import styled from 'styled-components'
import { mainStyles } from '../Components'

export const Container = styled.div`
  ${mainStyles};

  display: grid;
  gap: 20px;
  grid-template-rows: auto 1fr;
  justify-items: center;

  width: 100%;
`

export const Title = styled.h5`
  display: block;

  font-size: 2rem;

  margin: 0;
  padding: 0;
`

export const Article = styled.main`
  width: 100%;
  max-width: var(--fixed-width);

  text-align: center;

  line-height: 1.5;

  & > p {
    margin: 0 0 10px 0;
  }
`

export const UL = styled.ul`
  text-align: left;
`
