import * as React from 'react'

import { render } from '@testing-library/react'

import Layout from '@/components/Layout/Layout'

xdescribe('Layout', () => {
  test('renders', () => {
    const { container } = render(<Layout />)
    expect(container).toMatchSnapshot()
  })
})
