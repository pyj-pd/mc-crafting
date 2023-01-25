import styled, { css } from 'styled-components'

export const NAVBAR_OPTION_ID = 'navbar-option'
export const LINK_CONTAINER_ID = 'link-container'

export const NavbarContainer = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: var(--z-navbar);

  display: grid;
  gap: 10px;
  place-items: center;

  width: 100%;

  padding: 10px;

  background-color: rgb(var(--c-white));
  color: rgb(var(--c-black));

  & > #${NAVBAR_OPTION_ID} {
    display: none;
  }

  @media (max-width: 500px) {
    & {
      position: relative;
    }

    & > #${NAVBAR_OPTION_ID} {
      display: flex;
    }

    & > #${LINK_CONTAINER_ID} {
      position: absolute;
      top: 100%;
      left: 0;

      display: none;
      align-items: center;
      flex-direction: column;

      padding: 20px 10px;
    }

    &:focus-within > #${LINK_CONTAINER_ID} {
      display: flex;
    }
  }
`

export const NavbarOptionContainer = styled.div`
  display: flex;
  gap: 10px;
`

export const LinkContainer = styled.nav`
  position: relative;

  display: flex;
  gap: 10px;
  justify-content: center;

  width: 100%;

  background-color: rgb(var(--c-white));
  color: rgb(var(--c-black));

  & > a {
    position: relative;
  }
`

interface ButtonProps {
  $current?: boolean
}

export const Button = styled.button<ButtonProps>`
  position: relative;
  z-index: 1;

  display: block;

  border: none;
  border-radius: var(--input-border-radius);
  padding: 10px 20px;
  margin: 0;

  cursor: pointer;

  white-space: nowrap;

  transition: background-color var(--hover-animation-duration);

  ${({ $current }) =>
    $current
      ? css`
          background-color: rgb(var(--c-black));
          color: rgb(var(--c-white));
        `
      : css`
          background-color: transparent;
          color: rgb(var(--c-black));

          @media (hover: none) {
            & {
              background-color: rgb(var(--c-light-gray));
            }
          }

          &:hover {
            background-color: rgb(var(--c-gray));
          }
        `}
`
