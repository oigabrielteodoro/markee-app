import React, { createContext, ReactNode, useState, useContext } from 'react'

import { File } from 'types'

type Props = {
  children: ReactNode
}

type FileContextData = {
  files: File[]
  createFile: (file: File) => void
  updateFile: (data: File) => void
  deleteFile: (id: string) => void
}

const FileContext = createContext({} as FileContextData)

export function FileProvider({ children }: Props) {
  const [files, setFiles] = useState<File[]>([])

  function createFile(file: File) {
    setFiles((prevState) => [
      ...prevState.map((file) => ({
        ...file,
        is_active: false,
      })),
      file,
    ])
  }

  function updateFile(data: File) {
    setFiles((prevState) =>
      prevState.map((file) => (file.id === data.id ? data : file)),
    )
  }

  function deleteFile(id: string) {
    setFiles((prevState) => prevState.filter((file) => file.id !== id))
  }

  return (
    <FileContext.Provider value={{ files, createFile, deleteFile, updateFile }}>
      {children}
    </FileContext.Provider>
  )
}

export const useFile = () => useContext(FileContext)
