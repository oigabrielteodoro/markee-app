import React from 'react'
import { render, screen } from '@testing-library/react'

import { ArchiveProvider } from 'context'

import { Sidebar } from './Sidebar'

describe('<Sidebar />', () => {
  it('should render correctly', () => {
    const { container } = render(<Sidebar />, {
      wrapper: ({ children }) => <ArchiveProvider>{children}</ArchiveProvider>,
    })

    expect(screen.getByText('Arquivos')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
