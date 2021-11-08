import React, { useState, MouseEvent, FC, Fragment, ReactNode } from 'react'

import { AccountCircle as AccountIcon } from '@mui/icons-material'
import {
  Avatar,
  Divider,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
} from '@mui/material'

export interface UserMenuProps {
  avatarUrl?: string
  isUserLoggedIn?: boolean
  loginRedirectUrl?: string
  children?: ReactNode
}

const UserMenu: FC<UserMenuProps> = ({
  avatarUrl,
  isUserLoggedIn,
  loginRedirectUrl = '/',
  children = null,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const onAvatarClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setAnchorEl(!anchorEl ? e.currentTarget : null)
  }

  const otherColor = 'primary'

  return (
    <Fragment>
      <IconButton
        aria-controls='simple-menu'
        color={otherColor}
        onClick={onAvatarClick}
        aria-hidden>
        {isUserLoggedIn ? (
          <Avatar alt='avatar' src={avatarUrl} sx={{ height: 24, width: 24 }} />
        ) : (
          <AccountIcon />
        )}
        <Menu
          anchorEl={anchorEl}
          onClose={onAvatarClick}
          open={Boolean(anchorEl)}
          keepMounted>
          <MenuItem>
            <MuiLink
              color='secondary'
              href={
                isUserLoggedIn
                  ? '/api/auth/logout'
                  : `/api/auth/login?returnTo=${loginRedirectUrl}`
              }
              underline={'none'}>
              {isUserLoggedIn ? 'Logout' : 'Login'}
            </MuiLink>
          </MenuItem>
          {children && <Divider />}
          {children}
        </Menu>
      </IconButton>
    </Fragment>
  )
}

export default UserMenu
