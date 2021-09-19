import React from 'react'
import { render, screen } from '@testing-library/react'

import { Logo } from '.'

describe('<Logo />', () => {
  it('should render correctly', () => {
    const { container } = render(<Logo />)

    expect(screen.getByRole('img')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
