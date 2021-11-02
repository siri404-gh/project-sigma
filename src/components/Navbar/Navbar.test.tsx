import * as React from 'react'

import { render, screen } from '@testing-library/react'

import Navbar from '@/components/Navbar/Navbar'

describe('Navbar', () => {
  test('renders', () => {
    const { container } = render(<Navbar />)
    expect(container).toMatchSnapshot()
  })
  test('renders title', () => {
    render(<Navbar title='title' />)
    const titleDiv = screen.getByText(/title/i)
    expect(titleDiv).toHaveTextContent('title')
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
