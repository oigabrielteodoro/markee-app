import styled, { css } from 'styled-components'
import { AiOutlineLoading } from 'react-icons/ai'

import { theme } from 'styles'

type FileListItemProps = {
  isSelected?: boolean
  isLoading?: boolean
}

export const Container = styled.div`
  height: 100vh;
  width: 33.2rem;
  background: ${theme.colors.neutral[900]};
  display: flex;
  flex-direction: column;
  padding: 4.7rem 3.3rem;

  > img {
    margin: 0 auto;
  }
`

export const Title = styled.input`
  border: 0;
  width: 100%;
  max-width: 65%;
  white-space: nowrap;
  background: transparent;
  font-size: ${theme.font.sizes.paragraph};
`

export const NewFileButton = styled.button`
  border: 0;
  height: 4rem;
  display: flex;
  margin-top: 2.4rem;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.input};
  background: ${theme.colors.blue[500]};
  font-size: ${theme.font.sizes.small};
  font-weight: ${theme.font.weights.medium};
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }

  svg {
    margin-right: 1.2rem;
  }
`

export const Separator = styled.div`
  display: flex;
  margin-top: 6rem;
  align-items: center;

  span {
    color: ${theme.colors.white};
    font-size: 1.8rem;
    margin: 0 0.5rem;
  }

  hr {
    position: relative;
    border: 0.2rem solid ${theme.colors.blue[500]};
    border-radius: 0.2rem;
    width: 100%;

    &:first-child {
      max-width: 1.3rem;
    }
  }
`

export const FileList = styled.ul`
  display: grid;
  grid-gap: 1.8rem;
  margin-top: 3.5rem;
`

export const FileListItem = styled.li<FileListItemProps>`
  opacity: 0.65;
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  padding: 1rem 1.6rem;
  border-radius: 0.5rem;
  transition: background 0.2s;
  height: 5rem;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);

    button {
      opacity: 1;
      visibility: visible;
    }
  }

  input {
    color: ${theme.colors.white};
  }

  button {
    background: transparent;
    height: 1.8rem;
    width: 1.8rem;
    border: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s, color 0.2s;
    margin-top: 0.6rem;

    &:hover {
      color: ${theme.colors.white};
    }

    & + svg {
      margin-left: 1rem;
    }
  }

  > svg {
    margin-right: 1rem;
  }

  section {
    margin-left: auto;
  }

  ${({ isLoading, isSelected }) =>
    isSelected &&
    !isLoading &&
    css`
      &::after {
        content: '';
        height: 0.8rem;
        width: 0.8rem;
        background: ${theme.colors.blue[500]};
        border-radius: 50%;
        margin-left: 1rem;
      }
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      opacity: 1;
      background: rgba(255, 255, 255, 0.05);

      input {
        color: ${theme.colors.white};
        opacity: 1;
      }

      svg {
        color: ${theme.colors.blue[500]};
      }
    `}
`

export const SavingIcon = styled(AiOutlineLoading)`
  animation: saving 0.5s infinite;

  @keyframes saving {
    to {
      transform: rotate(0);
    }

    from {
      transform: rotate(360deg);
    }
  }
`
