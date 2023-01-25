import styled, { css } from 'styled-components'

const SEARCH_LIST_HEIGHT = 55

interface ContainerProps {
  $hidden?: boolean
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 100%;
  z-index: var(--z-search-result);

  display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
  flex-direction: column;

  width: 100%;
  max-height: ${SEARCH_LIST_HEIGHT * 5.5}px;

  border-radius: var(--input-border-radius);

  overflow-y: scroll;

  background-color: rgb(var(--c-gray));
  color: rgb(var(--c-black));
`

const listContainerStyles = css`
  position: relative;

  border: none;
  outline: none;

  width: 100%;

  font-size: 0.9rem;

  text-align: left;

  background-color: transparent;
  color: currentColor;
`

export const LoadingContainer = styled.div`
  ${listContainerStyles};

  display: grid;
  place-items: center;

  padding: 30px;
`

export const ListContainer = styled.button`
  ${listContainerStyles}

  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: auto 1fr;

  height: ${SEARCH_LIST_HEIGHT}px;

  padding: 15px;

  cursor: pointer;

  transition: background-color var(--hover-animation-duration);

  &:hover {
    background-color: rgba(var(--c-dark-gray), 0.5);
  }
  &:focus {
    background-color: rgb(var(--c-dark-gray));
  }
`
