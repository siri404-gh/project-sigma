import * as React from 'react'

import { render } from '@testing-library/react'

import Navlinks from '@/components/Navlinks/Navlinks'

describe('Navlinks', () => {
  test('renders', () => {
    const { container } = render(<Navlinks />)
    expect(container).toMatchSnapshot()
  })
})
