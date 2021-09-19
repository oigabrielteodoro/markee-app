import React from 'react'
import { FiCheck, FiFileText, FiPlus, FiX } from 'react-icons/fi'

import { theme } from 'styles'
import { useArchive } from 'context'

import { Logo } from '..'

import * as S from './Sidebar.styled'

export function Sidebar() {
  const { archives, createArchive, inspectArchive, deleteArchive } =
    useArchive()

  return (
    <S.Container>
      <Logo />

      <S.Separator>
        <hr />
        <span>Arquivos</span>
        <hr />
      </S.Separator>

      <S.NewFileButton type='button' onClick={createArchive}>
        <FiPlus size={16} />
        Adicionar arquivo
      </S.NewFileButton>

      <S.ArchiveList>
        {archives.map((archive) => {
          const isSaved = archive.status === 'saved'
          const isEditing = archive.status === 'editing'
          const isLoading = archive.status === 'loading'

          return (
            <S.ArchiveListItem
              key={archive.id}
              isEditing={isEditing}
              isSelected={archive.active}
            >
              <FiFileText size={24} strokeWidth={1.5} />

              <a href='/' onClick={() => inspectArchive(archive.id)}>
                {archive.title}
              </a>

              <section>
                {(isSaved || isEditing) && (
                  <button
                    type='button'
                    onClick={() => deleteArchive(archive.id)}
                  >
                    <FiX size={18} color={theme.colors.white} />
                  </button>
                )}

                {isLoading && !isSaved && (
                  <S.SavingIcon
                    size={14}
                    strokeWidth={1.5}
                    color={theme.colors.blue[500]}
                  />
                )}

                {isSaved && !isEditing && (
                  <FiCheck size={16} color={theme.colors.blue[500]} />
                )}
              </section>
            </S.ArchiveListItem>
          )
        })}
      </S.ArchiveList>
    </S.Container>
  )
}
