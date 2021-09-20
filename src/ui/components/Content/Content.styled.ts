import styled from 'styled-components'
import { theme } from 'styles'

type TypeAreaProps = {
  width?: number
}

export const Container = styled.div`
  margin-left: 33.2rem;
  display: flex;
  align-items: flex-start;
`

export const TypeArea = styled.div<TypeAreaProps>`
  display: flex;
  flex-direction: column;
  padding: 2.7rem;
  height: 100vh;
  width: ${({ width }) => (width ? `${width}px` : '50%')};

  textarea {
    height: 100%;
    border: 0;
    font-size: ${theme.font.sizes.subtitle};
    background: transparent;
    margin-top: 4.3rem;
    resize: none;
  }
`

export const Separator = styled.div`
  border: 0;
  height: 100vh;
  width: 0.2rem;
  background: rgba(30, 41, 59, 0.12);
  cursor: ew-resize;
`

export const InputArea = styled.div`
  display: flex;
  align-items: center;

  input {
    border: 0;
    width: 100%;
    background: transparent;
    font-size: ${theme.font.sizes.subtitle};
    margin-left: 1.6rem;
  }
`

export const ResultArea = styled.div`
  flex: 1;
`
