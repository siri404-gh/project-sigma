import React, { useState, MouseEvent, FC, Fragment, ReactNode } from 'react'

import { Info } from '@mui/icons-material'
import { IconButton, Menu } from '@mui/material'

export interface InfoMenuProps {
  children?: ReactNode
}

const InfoMenu: FC<InfoMenuProps> = ({ children = null }) => {
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
        <Info />
        <Menu
          anchorEl={anchorEl}
          onClose={onAvatarClick}
          open={Boolean(anchorEl)}
          keepMounted>
          {children}
        </Menu>
      </IconButton>
    </Fragment>
  )
}

export default InfoMenu
