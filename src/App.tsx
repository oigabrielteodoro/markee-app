import React from 'react'

import { Sidebar } from 'ui'
import { GlobalStyle } from 'styles'
import { ArchiveProvider } from 'context'

export function App() {
  return (
    <ArchiveProvider>
      <GlobalStyle />
      <Sidebar />
    </ArchiveProvider>
  )
}
