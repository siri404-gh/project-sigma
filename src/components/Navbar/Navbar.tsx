import React, { useState, MouseEvent, FC } from 'react'

import {
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import Link from 'next/link'

export interface NavbarProps {
  avatarUrl?: string
  children?: React.ReactNode
  description?: string
  isUserLoggedIn?: boolean
  loginRedirectUrl?: string
  onMenuClick?: () => void
  onToolbarClick?: () => void
  title?: string
}

const StyledToolbar = styled(Toolbar)({
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const Navbar: FC<NavbarProps> = props => {
  const {
    avatarUrl,
    children,
    isUserLoggedIn,
    loginRedirectUrl = '/',
    onMenuClick,
    title,
  } = props

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const onMenuButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onMenuClick?.()
  }
  const onAvatarClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setAnchorEl(!anchorEl ? e.currentTarget : null)
  }

  const appBarColor = 'transparent'
  const otherColor = 'primary'

  return (
    <AppBar color={appBarColor} component='nav' position='static'>
      <StyledToolbar>
        <Link href='/' passHref>
          <MuiLink underline='none'>
            <Typography color={otherColor} component='h1' variant='h6' noWrap>
              {title}
            </Typography>
          </MuiLink>
        </Link>
        {children}
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <IconButton
            aria-controls='simple-menu'
            color={otherColor}
            onClick={onAvatarClick}
            aria-hidden>
            {isUserLoggedIn ? (
              <Avatar alt='avatar' src={avatarUrl} />
            ) : (
              <AccountIcon />
            )}
            <Menu
              anchorEl={anchorEl}
              onClose={onAvatarClick}
              open={Boolean(anchorEl)}
              keepMounted>
              {isUserLoggedIn ? (
                <MenuItem>
                  <MuiLink
                    color='secondary'
                    href={'/api/auth/logout'}
                    underline={'none'}>
                    Logout
                  </MuiLink>
                </MenuItem>
              ) : (
                <MenuItem>
                  <MuiLink
                    color='secondary'
                    href={`/api/auth/login?returnTo=${loginRedirectUrl}`}
                    underline={'none'}>
                    Login
                  </MuiLink>
                </MenuItem>
              )}
            </Menu>
          </IconButton>
          <IconButton
            aria-label='menu'
            color={otherColor}
            onClick={onMenuButtonClick}>
            <MenuIcon />
          </IconButton>
        </Box>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
