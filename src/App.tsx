import React from 'react'

import { Content, Sidebar } from 'ui'
import { GlobalStyle } from 'styles'
import { ArchiveProvider } from 'context'

export function App() {
  return (
    <ArchiveProvider>
      <GlobalStyle />

      <main>
        <Sidebar />
        <Content />
      </main>
    </ArchiveProvider>
  )
}
