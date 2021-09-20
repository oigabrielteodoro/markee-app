import React from 'react'
import { FiFileText } from 'react-icons/fi'
import marked from 'marked'

import 'highlight.js/styles/github.css'

import { theme } from 'styles'

import { useContent } from './useContent'

import * as S from './Content.styled'

export function Content() {
  const {
    archive,
    inputRef,
    typeAreaRef,
    typeAreaWidth,
    textAreaRef,
    onMouseDown,
    onUpdateTitle,
    onUpdateContent,
  } = useContent()

  if (!archive) {
    return null
  }

  return (
    <S.Container>
      <S.TypeArea width={typeAreaWidth} ref={typeAreaRef}>
        <S.InputArea>
          <FiFileText size={24} color={theme.colors.blue[500]} />

          <input
            ref={inputRef}
            autoFocus
            placeholder='Nome do arquivo'
            onChange={(event) => onUpdateTitle(event.currentTarget.value)}
          />
        </S.InputArea>

        <textarea
          ref={textAreaRef}
          placeholder='Digite o seu conteúdo aqui'
          onChange={(event) => onUpdateContent(event.currentTarget.value)}
        />
      </S.TypeArea>
      <S.Separator onMouseDown={onMouseDown} />
      <S.Article
        dangerouslySetInnerHTML={{
          __html: marked(archive.content),
        }}
      />
    </S.Container>
  )
}
