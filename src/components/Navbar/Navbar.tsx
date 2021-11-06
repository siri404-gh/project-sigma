import React, { MouseEvent, FC } from 'react'

import { Menu as MenuIcon } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Container,
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
  padding: '0 6px',
  justifyContent: 'space-between',
})

const StyledTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    maxWidth: 95,
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
      <Container disableGutters>
        <StyledToolbar disableGutters>
          <Box sx={{ display: 'flex' }}>
            <IconButton
              aria-label='menu'
              color={otherColor}
              onClick={onMenuButtonClick}>
              <MenuIcon />
            </IconButton>
            <Link href='/' passHref>
              <MuiLink sx={{ alignSelf: 'center' }} underline='hover'>
                <StyledTitle
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
      </Container>
    </AppBar>
  )
}

export default Navbar
