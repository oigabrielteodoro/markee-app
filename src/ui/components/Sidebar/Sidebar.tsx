import React, { FormEvent, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { FiFileText, FiPlus, FiX } from 'react-icons/fi'

import { v4 as uuid } from 'uuid'

import { File } from 'types'
import { theme } from 'styles'

import { Logo } from '..'

import * as S from './Sidebar.styled'

export function Sidebar() {
  const [files, setFiles] = useState<File[]>([])

  function handleCreate() {
    setFiles((prevState) => [
      ...prevState,
      {
        id: uuid(),
        title: '',
        content: '',
        created_at: new Date(),
        updated_at: new Date(),
        is_saved: true,
        is_saving: false,
        is_saving_completed: true,
        is_auto_focus: true,
      },
    ])
  }

  function handleDelete(id: string) {
    setFiles((prevState) => prevState.filter((file) => file.id !== id))
  }

  function handleChangeTitle(event: FormEvent<HTMLDivElement>) {
    event.preventDefault()

    const text = event.currentTarget.innerText

    window.console.log(text)
  }

  return (
    <S.Container>
      <Logo />

      <S.Separator>
        <hr />
        <span>Arquivos</span>
        <hr />
      </S.Separator>

      <S.NewFileButton type='button' onClick={handleCreate}>
        <FiPlus size={16} />
        Adicionar arquivo
      </S.NewFileButton>

      <S.FileList>
        {files.map((file) => (
          <S.FileListItem key={file.id} isSaved={file.is_saved}>
            <FiFileText size={24} strokeWidth={1.5} />

            <S.Title
              onChange={handleChangeTitle}
              autoFocus={file.is_auto_focus}
            />

            <section>
              <button type='button' onClick={() => handleDelete(file.id)}>
                <FiX size={18} color={theme.colors.white} />
              </button>

              {file.is_saving && (
                <S.SavingIcon
                  size={14}
                  strokeWidth={1.5}
                  color={theme.colors.blue[500]}
                />
              )}
              {file.is_saving_completed && (
                <AiOutlineCheck size={16} color={theme.colors.blue[500]} />
              )}
            </section>
          </S.FileListItem>
        ))}
      </S.FileList>
    </S.Container>
  )
}
