import * as React from 'react'

import { render, screen } from '@testing-library/react'

import NavBar from '@/components/NavBar'

describe('NavBar', () => {
  test('renders', () => {
    const { container } = render(<NavBar title='title' />)
    const titleDiv = screen.getByText(/title/i)
    expect(titleDiv).toHaveTextContent('title')
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
