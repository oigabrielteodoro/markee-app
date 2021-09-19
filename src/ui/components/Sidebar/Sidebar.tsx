import React, { FormEvent } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { FiFileText, FiPlus, FiX } from 'react-icons/fi'

import { v4 as uuid } from 'uuid'

import { File } from 'types'
import { theme } from 'styles'
import { useFile } from 'context'

import { Logo } from '..'

import * as S from './Sidebar.styled'

export function Sidebar() {
  const { files, createFile, deleteFile, updateFile } = useFile()

  function handleCreate() {
    createFile({
      id: uuid(),
      title: 'Sem título',
      content: '',
      is_active: true,
      is_auto_focus: true,
      status: 'saved',
    })
  }

  function handleChangeTitle(file: File, event: FormEvent<HTMLInputElement>) {
    event.preventDefault()

    const text = event.currentTarget.value

    updateFile({
      ...file,
      title: text,
    })
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
          <S.FileListItem
            key={file.id}
            isSaved={file.status === 'saved'}
            isSelected={file.is_active}
          >
            <FiFileText size={24} strokeWidth={1.5} />

            <S.Title
              onBlur={(event) => handleChangeTitle(file, event)}
              autoFocus={file.is_auto_focus}
              defaultValue={file.title}
            />

            <section>
              <button type='button' onClick={() => deleteFile(file.id)}>
                <FiX size={18} color={theme.colors.white} />
              </button>

              {file.status === 'saving' && (
                <S.SavingIcon
                  size={14}
                  strokeWidth={1.5}
                  color={theme.colors.blue[500]}
                />
              )}
              {file.status === 'saving-completed' && (
                <AiOutlineCheck size={16} color={theme.colors.blue[500]} />
              )}
            </section>
          </S.FileListItem>
        ))}
      </S.FileList>
    </S.Container>
  )
}
