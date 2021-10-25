import * as React from 'react'

import { render, screen } from '@testing-library/react'

import NavBar from '@/components/NavBar'

describe('NavBar', () => {
    test('Should render title', () => {
        render(<NavBar title='web dev' />)
        screen.logTestingPlaygroundURL();
        const title = screen.getByText(/web dev/i)
        // console.log(title)
        // expect(title).toHaveTextContent('web dev')
    })
})

