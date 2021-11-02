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
import Link from 'next/link'

import styles from './Navbar.module.css'

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

const Navbar: FC<NavbarProps> = props => {
  const {
    avatarUrl,
    children,
    isUserLoggedIn,
    loginRedirectUrl,
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

  const appBarColor = 'secondary'
  const otherColor = 'primary'

  return (
    <AppBar
      color={appBarColor}
      component='nav'
      elevation={0}
      position='static'
      sx={theme => ({
        // borderBottom: `solid 1px ${theme.palette.primary.main}`,
      })}>
      <Toolbar className={styles.toolbar}>
        <Link href='/' passHref>
          <MuiLink underline='none'>
            <Typography color={otherColor} component='h1' variant='h6'>
              {title}
            </Typography>
          </MuiLink>
        </Link>
        {children}
        <Box
          sx={{ display: 'flex', justifyContent: 'right', width: { sm: 200 } }}>
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
                <Link href={'/api/auth/logout'} passHref>
                  <MenuItem>Logout</MenuItem>
                </Link>
              ) : (
                <Link
                  href={`/api/auth/login?redirectTo=${loginRedirectUrl}`}
                  passHref>
                  <MenuItem>Login</MenuItem>
                </Link>
              )}
            </Menu>
          </IconButton>
          <IconButton
            aria-label='menu'
            color={otherColor}
            onClick={onMenuButtonClick}
            sx={{ pr: 0 }}>
            <MenuIcon fontSize='large' />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
