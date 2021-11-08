import React, { MouseEvent, FC } from 'react'

import { Menu as MenuIcon } from '@mui/icons-material'
import {
  AppBar,
  Box,
  IconButton,
  Link as MuiLink,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import Link from 'next/link'

export interface NavbarProps {
  children?: React.ReactNode
  onMenuClick?: () => void
  title?: string
}

const StyledToolbar = styled(Toolbar)({
  padding: 0,
  justifyContent: 'space-between',
})

const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    maxWidth: 250,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

const Navbar: FC<NavbarProps> = props => {
  const { children, onMenuClick, title } = props

  const onMenuButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onMenuClick?.()
  }

  const appBarColor = 'transparent'
  const otherColor = 'primary'

  return (
    <AppBar color={appBarColor} component='nav' elevation={0} position='sticky'>
      <StyledToolbar>
        <Box sx={{ display: 'flex' }}>
          <IconButton
            aria-label='menu'
            color={otherColor}
            onClick={onMenuButtonClick}
            sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Link href='/' passHref>
            <MuiLink sx={{ alignSelf: 'center' }} underline='hover'>
              <StyledTitle
                className='_shimmer'
                color={otherColor}
                // component='h1'
                variant='h6'
                noWrap>
                {title}
              </StyledTitle>
            </MuiLink>
          </Link>
        </Box>
        {children}
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
