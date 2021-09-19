import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { FiFileText, FiPlus, FiX } from 'react-icons/fi'

import { v4 as uuid } from 'uuid'

import { theme } from 'styles'
import { useFile } from 'context'

import { Logo } from '..'

import * as S from './Sidebar.styled'

export function Sidebar() {
  const { files, navigate, create, remove } = useFile()

  function handleCreate() {
    create({
      id: uuid(),
      title: 'Sem título',
      content: '',
      is_active: true,
      is_auto_focus: true,
      status: 'saved',
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
        {files.map((file) => {
          const isSaved = file.status === 'saved'
          const isSaving = file.status === 'saving'
          const isSavingCompleted = file.status === 'saving-completed'

          return (
            <S.FileListItem
              key={file.id}
              isSelected={file.is_active}
              onClick={() => navigate(file)}
            >
              <FiFileText size={24} strokeWidth={1.5} />

              {file.title}

              <section>
                {isSaved && (
                  <button type='button' onClick={() => remove(file.id)}>
                    <FiX size={18} color={theme.colors.white} />
                  </button>
                )}

                {isSaving && (
                  <S.SavingIcon
                    size={14}
                    strokeWidth={1.5}
                    color={theme.colors.blue[500]}
                  />
                )}

                {isSavingCompleted && (
                  <AiOutlineCheck size={14} color={theme.colors.blue[500]} />
                )}
              </section>
            </S.FileListItem>
          )
        })}
      </S.FileList>
    </S.Container>
  )
}
