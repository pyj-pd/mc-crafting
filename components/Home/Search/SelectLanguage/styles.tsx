import styled from 'styled-components'

export const Select = styled.select`
  position: absolute;
  top: 0;
  left: 100%;

  display: block;

  white-space: nowrap;

  padding: 5px 10px;
  margin: 0 0 0 10px;
  border-radius: 5px;
  border: none;

  background-color: rgb(var(--c-darker-gray));
  color: white;

  font-size: 0.8rem;

  @media (max-width: 630px) {
    & {
      top: calc(-100% - 10px);
      left: 0;

      margin: 0 0 0 0;
    }
  }
`
