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
import { useRouter } from 'next/router'
export interface UserMenuProps {
  avatarUrl?: string
  isUserLoggedIn?: boolean
  children?: ReactNode
}

const UserMenu: FC<UserMenuProps> = ({
  avatarUrl,
  isUserLoggedIn,
  children = null,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const onAvatarClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setAnchorEl(!anchorEl ? e.currentTarget : null)
  }

  const router = useRouter()
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
              href={`/api/auth/${
                isUserLoggedIn ? 'logout' : 'login'
              }?returnTo=${router.asPath}`}
              underline='none'>
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
