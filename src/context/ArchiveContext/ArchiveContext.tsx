/* eslint-disable no-sparse-arrays */
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 } from 'uuid'

import {
  fold,
  fromNullable,
  isSome,
  none,
  Option,
  some,
  map,
} from 'fp-ts/Option'

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
  archive?: Archive
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
    const storagedValue = getFromStorage()

    return pipe(
      storagedValue,
      fold(() => storageValue(initialValue), identity),
    )
  })

  useEffect(() => {
    pipe(
      getIdFromUrl(),
      map((id) => {
        setArchives((prevState) =>
          prevState.map((archive) => ({
            ...archive,
            active: archive.id === id,
          })),
        )
      }),
    )
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function updateStatus() {
      const archive = archives.find((archive) => archive.active)

      if (!archive || archive.status !== 'editing') return

      timer = setTimeout(() => {
        setArchives((prevState) =>
          prevState.map((archive) => {
            if (archive.active) {
              return {
                ...archive,
                status: 'saving',
              }
            }

            return archive
          }),
        )

        setTimeout(() => {
          setArchives((prevState) =>
            prevState.map((archive) => {
              if (archive.active) {
                return {
                  ...archive,
                  status: 'saved',
                }
              }

              return archive
            }),
          )
        }, 300)
      }, 300)
    }

    updateStatus()

    return () => clearTimeout(timer)
  }, [archives])

  function createArchive() {
    const id = v4()

    setArchives((prevState) => {
      const newArchives: Archive[] = [
        ...prevState.map((archive) => ({
          ...archive,
          active: false,
        })),
        { ...initialValue[0], id, status: 'saved' },
      ]

      return storageValue(newArchives)
    })

    window.history.replaceState(null, '', `/archive/${id}`)
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
      setArchives((prevState) => {
        const newArchives: Archive[] = prevState.map((archive) => {
          const isArchive = archive.id === id

          if (isArchive) {
            return {
              ...archive,
              title: title || archive.title,
              content: content || archive.content,
              status: 'editing',
            }
          }

          return archive
        })

        return storageValue(newArchives)
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
          }
        })

        return storageValue(newArchives)
      })

      window.history.replaceState(null, '', `/archive/${id}`)
    }
  }

  return (
    <ArchiveContext.Provider
      value={{
        archive: archives.find((archive) => archive.active),
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

function getFromStorage(): Option<Archive[]> {
  const storagedValue = fromNullable(
    localStorage.getItem('@MarkeeApp:archives'),
  )

  if (isSome(storagedValue)) {
    return some(JSON.parse(storagedValue.value))
  }

  return none
}

function getIdFromUrl(): Option<string> {
  const id = fromNullable(window.location.pathname.split('/archive/')[1])

  if (isSome(id)) {
    return some(id.value)
  }

  return none
}

function storageValue(archives: Archive[]) {
  localStorage.setItem('@MarkeeApp:archives', JSON.stringify(archives))

  return archives
}

export const useArchive = () => useContext(ArchiveContext)
