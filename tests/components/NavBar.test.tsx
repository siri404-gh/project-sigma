import * as React from 'react'

import { render, screen } from '@testing-library/react'

import NavBar from '@/components/NavBar'

describe('NavBar', () => {
  test('Should render title', () => {
    render(<NavBar title='web dev' />)
    const titleDiv = screen.getByText(/web dev/i)
    expect(titleDiv).toHaveTextContent('web dev')
  })
})

