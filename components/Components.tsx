import styled, { css } from 'styled-components'

export const inputStyles = css`
  display: block;

  border: none;

  border-radius: var(--input-border-radius);

  background-color: rgb(var(--c-gray));
  color: rgb(var(--c-black));

  outline: none;

  width: 100%;

  &:focus {
    outline: solid var(--input-outline-width) rgba(var(--c-black), 0.5);
  }
`

export const Input = styled.input`
  ${inputStyles};

  padding: 10px;
`

export const Button = styled.button`
  ${inputStyles};

  padding: 5px 15px;

  cursor: pointer;

  transition: background-color var(--hover-animation-duration);

  &:hover {
    background-color: rgb(var(--c-dark-gray));
  }
`

export const Anchor = styled.a`
  display: inline-block;

  color: rgb(var(--c-blue));

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const mainStyles = css`
  width: 100%;
  min-height: 900px;

  padding: 50px 30px;
`
