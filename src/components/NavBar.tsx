import React, { useState, MouseEvent, FC } from 'react'

import {
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Typography,
  IconButton,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material'
import Link from 'next/link'

import styles from './NavBar.module.css'

interface NavBarProps {
  title?: string
  description?: string
  onToolbarClick?: () => void
  onMenuClick?: () => void
  isUserLoggedIn?: boolean
  loginRedirectUrl?: string
  avatarUrl?: string
}

const NavBar: FC<NavBarProps> = props => {
  const {
    title,
    description,
    onToolbarClick,
    onMenuClick,
    isUserLoggedIn,
    loginRedirectUrl,
    avatarUrl,
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

  return (
    <Box>
      <AppBar position='static' elevation={0}>
        <Toolbar onClick={onToolbarClick}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={onMenuButtonClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Typography
            className={styles.description}
            sx={{ display: { xs: 'none', sm: 'block' } }}
            noWrap
            variant='caption'>
            {description}
          </Typography>
          <div className={styles.right}>
            <IconButton
              aria-controls='simple-menu'
              onClick={onAvatarClick}
              aria-hidden>
              {isUserLoggedIn ? (
                <Avatar alt='avatar' src={avatarUrl} />
              ) : (
                <AccountIcon color={'secondary'} />
              )}
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={onAvatarClick}>
                {isUserLoggedIn ? (
                  <Link href={'/api/auth/logout'}>
                    <a>
                      <MenuItem>Logout</MenuItem>
                    </a>
                  </Link>
                ) : (
                  <Link href={`/api/auth/login?redirectTo=${loginRedirectUrl}`}>
                    <a>
                      <MenuItem>Login</MenuItem>
                    </a>
                  </Link>
                )}
              </Menu>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
