/* eslint-disable no-sparse-arrays */
import React, { createContext, ReactNode, useContext, useState } from 'react'
import { v4 } from 'uuid'

import { fold, fromNullable, isSome, none, Option, some } from 'fp-ts/Option'

import { Archive } from 'types'
import { identity, pipe } from 'fp-ts/lib/function'

type ArchiveProviderProps = {
  children: ReactNode
}

type ArchiveUpdateData = {
  id: string
  title?: string
  content?: string
}

type ArchiveContextData = {
  archives: Archive[]
  createArchive: () => void
  deleteArchive: (id: string) => void
  inspectArchive: (id: string) => void
  updateArchive: (data: ArchiveUpdateData) => void
}

const ArchiveContext = createContext({} as ArchiveContextData)

const initialValue: Archive[] = [
  {
    id: v4(),
    title: 'Sem título',
    content: '',
    status: 'editing',
    active: true,
  },
]

export function ArchiveProvider({ children }: ArchiveProviderProps) {
  const [archives, setArchives] = useState<Archive[]>(() => {
    const storagedValue = getStorageValue()

    return pipe(
      storagedValue,
      fold(() => storageValue(initialValue), identity),
    )
  })

  function createArchive() {
    setArchives((prevState) => {
      const newArchives: Archive[] = [
        ...prevState.map((archive) => ({
          ...archive,
          active: false,
          status: 'saved' as 'saved',
        })),
        { ...initialValue[0], id: v4(), status: 'editing' },
      ]

      return storageValue(newArchives)
    })
  }

  function deleteArchive(id: string) {
    setArchives((prevState) => {
      const newArchives = prevState.filter((archive) => archive.id !== id)

      return storageValue(newArchives)
    })
  }

  async function updateArchive({ id, title, content }: ArchiveUpdateData) {
    const archive = getArchive(id)

    if (archive) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setArchives((prevState) => {
            const newArchives = prevState.map((archive) => {
              const isArchive = archive.id === id

              return {
                ...archive,
                status: isArchive ? 'loading' : archive.status,
              }
            })

            return newArchives
          })

          resolve({})
        }, 300)
      })

      await new Promise((resolve) => {
        setTimeout(() => {
          setArchives((prevState) => {
            const newArchives: Archive[] = prevState.map((archive) => {
              const isArchive = archive.id === id

              if (isArchive) {
                return {
                  ...archive,
                  title: title || archive.title,
                  content: content || archive.content,
                  status: 'saved',
                }
              }

              return archive
            })

            return storageValue(newArchives)
          })

          resolve({})
        }, 300)
      })
    }
  }

  function getArchive(id: string) {
    return archives.find((archive) => archive.id === id)
  }

  function inspectArchive(id: string) {
    if (getArchive(id)) {
      setArchives((prevState) => {
        const newArchives: Archive[] = prevState.map((archive) => {
          const isArchive = archive.id === id

          return {
            ...archive,
            active: isArchive,
            status: isArchive ? 'editing' : 'saved',
          }
        })

        return storageValue(newArchives)
      })
    }
  }

  return (
    <ArchiveContext.Provider
      value={{
        archives,
        createArchive,
        inspectArchive,
        deleteArchive,
        updateArchive,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  )
}

function getStorageValue(): Option<Archive[]> {
  const storagedValue = fromNullable(
    localStorage.getItem('@MarkeeApp:archives'),
  )

  if (isSome(storagedValue)) {
    return some(JSON.parse(storagedValue.value))
  }

  return none
}

function storageValue(archives: Archive[]) {
  localStorage.setItem('@MarkeeApp:archives', JSON.stringify(archives))

  return archives
}

export const useArchive = () => useContext(ArchiveContext)
