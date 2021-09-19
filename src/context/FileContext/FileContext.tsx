/* eslint-disable no-new */
import React, { createContext, ReactNode, useCallback, useContext } from 'react'

import { File } from 'types'
import { useLocalStorage } from 'hooks'

type Props = {
  children: ReactNode
}

type FileContextData = {
  files: File[]
  create: (file: File) => void
  update: (data: File) => void
  remove: (id: string) => void
  navigate: (clickedFile: File) => void
}

const FileContext = createContext({} as FileContextData)

export function FileProvider({ children }: Props) {
  const [files, setFiles] = useLocalStorage<File[]>('files', [])

  const create = useCallback(
    (file: File) => {
      setFiles([
        ...files.map((file) => ({
          ...file,
          is_active: false,
        })),
        file,
      ])
    },
    [files, setFiles],
  )

  const update = useCallback(
    async (data: File) => {
      setFiles(
        files.map((file) =>
          file.id === data.id ? { ...data, status: 'saving' } : file,
        ),
      )

      await new Promise((resolve) => {
        setTimeout(() => {
          setFiles(
            files.map((file) =>
              file.id === data.id
                ? { ...data, status: 'saving-completed' }
                : file,
            ),
          )

          resolve(files)
        }, 300)
      })

      await new Promise((resolve) => {
        setTimeout(() => {
          setFiles(
            files.map((file) =>
              file.id === data.id ? { ...data, status: 'saved' } : file,
            ),
          )

          resolve(files)
        }, 300)
      })
    },
    [files, setFiles],
  )

  const remove = useCallback(
    (id: string) => {
      setFiles(files.filter((file) => file.id !== id))
    },
    [files, setFiles],
  )

  const navigate = useCallback(
    (clickedFile: File) => {
      setFiles(
        files.map((file) =>
          file.id === clickedFile.id
            ? { ...clickedFile, is_active: true }
            : { ...clickedFile, is_active: false },
        ),
      )
    },
    [files, setFiles],
  )

  return (
    <FileContext.Provider value={{ files, create, remove, update, navigate }}>
      {children}
    </FileContext.Provider>
  )
}

export const useFile = () => useContext(FileContext)
