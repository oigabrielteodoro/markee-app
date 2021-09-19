import React from 'react'

import { Sidebar } from 'ui'
import { GlobalStyle } from 'styles'
import { FileProvider } from 'context'

export function App() {
  return (
    <FileProvider>
      <GlobalStyle />
      <Sidebar />
    </FileProvider>
  )
}
