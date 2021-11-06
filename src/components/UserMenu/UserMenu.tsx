import React, { useState, MouseEvent, FC, Fragment } from 'react'

import { AccountCircle as AccountIcon } from '@mui/icons-material'
import {
  Avatar,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
} from '@mui/material'

export interface UserMenuProps {
  avatarUrl?: string
  isUserLoggedIn?: boolean
  loginRedirectUrl?: string
}

const UserMenu: FC<UserMenuProps> = props => {
  const { avatarUrl, isUserLoggedIn, loginRedirectUrl = '/' } = props

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
    </Fragment>
  )
}

export default UserMenu
