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

import config from '@/pages/config'

import styles from './NavBar.module.css'

interface NavBarProps {
  avatarUrl?: string
  description?: string
  isUserLoggedIn?: boolean
  loginRedirectUrl?: string
  onMenuClick?: () => void
  onToolbarClick?: () => void
  title: string
}

const NavBar: FC<NavBarProps> = props => {
  const { avatarUrl, isUserLoggedIn, loginRedirectUrl, onMenuClick, title } =
    props

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
    <AppBar color='secondary' component='nav' elevation={0} position='static'>
      <Toolbar className={styles.toolbar}>
        <Link href='/' passHref>
          <MuiLink sx={{ width: { sm: 225 } }} underline='none'>
            <Typography component='h1' variant='h6'>
              {title}
            </Typography>
          </MuiLink>
        </Link>
        <Box
          component='ul'
          sx={{
            display: { xs: 'none', sm: 'none', md: 'block' },
            listStyle: 'none',
            p: 0,
            m: 0,
          }}>
          {config.sections.map(({ title, url }) => (
            <li key={title} className={styles.li}>
              <Link href={url} passHref>
                <MuiLink sx={{ ml: 0.5 }} underline='none'>
                  {title}
                </MuiLink>
              </Link>
            </li>
          ))}
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'right', width: { sm: 225 } }}>
          <IconButton
            aria-controls='simple-menu'
            onClick={onAvatarClick}
            sx={{ p: 1, m: 1 }}
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
            edge='start'
            onClick={onMenuButtonClick}
            size='large'>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
