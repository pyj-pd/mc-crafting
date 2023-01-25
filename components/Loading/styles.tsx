import styled from 'styled-components'

export const LoadingContainer = styled.div`
  position: relative;

  display: block;

  height: 50px;
  aspect-ratio: 1 / 1;
`

interface SProps {
  $selected?: boolean
}

export const S = styled.span<SProps>`
  position: absolute;
  top: calc(var(--t, 0) * 100% / 7);
  left: calc(var(--l, 0) * 100% / 7);

  display: block;

  width: calc(100% / 7);
  aspect-ratio: 1 / 1;

  background-color: ${({ $selected }) =>
    $selected ? 'currentColor' : 'transparent'};
`
