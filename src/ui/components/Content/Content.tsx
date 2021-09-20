import React, { useRef } from 'react'
import { FiFileText } from 'react-icons/fi'

import { theme } from 'styles'
import { useArchive } from 'context'

import { useResize } from './useResize'

import * as S from './Content.styled'

export function Content() {
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const { archive, updateArchive } = useArchive()
  const { typeAreaRef, typeAreaWidth, onMouseDown } = useResize()

  function handleUpdateContent(value: string) {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      updateArchive({
        id: archive?.id,
        content: value,
      })
    }, 500)
  }

  if (!archive) {
    return null
  }

  return (
    <S.Container>
      <S.TypeArea width={typeAreaWidth} ref={typeAreaRef}>
        <S.InputArea>
          <FiFileText size={24} color={theme.colors.blue[500]} />

          <input
            autoFocus
            placeholder='Nome do arquivo'
            defaultValue={archive.title}
            onChange={(event) =>
              updateArchive({
                id: archive.id,
                title: event.currentTarget.value,
              })
            }
          />
        </S.InputArea>

        <textarea
          autoFocus
          placeholder='Digite o seu conteúdo aqui'
          onChange={(event) => handleUpdateContent(event.currentTarget.value)}
        />
      </S.TypeArea>
      <S.Separator onMouseDown={onMouseDown} />
      <S.ResultArea>
        <h1>Bootcamp React</h1>
      </S.ResultArea>
    </S.Container>
  )
}
