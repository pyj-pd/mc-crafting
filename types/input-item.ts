export type ClickHandler = (
  id: string,
  index: number,
  instant?: boolean
) => void
export type FocusHandler = (index: number) => void
export type BlurHandler = (index: number) => void
