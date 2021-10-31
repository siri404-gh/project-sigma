import React, { FC } from 'react'

import { Drawer, Typography, Toolbar } from '@mui/material'

export interface SidebarProps {
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
  title?: string
  children?: JSX.Element
  logo?: JSX.Element
}

const Sidebar: FC<SidebarProps> = ({
  children,
  isOpen,
  onClose,
  title,
  logo,
}) => (
  <Drawer anchor='left' onClose={onClose} open={isOpen} variant='temporary'>
    <Toolbar>
      {logo}
      <Typography color='textSecondary' variant='h6' noWrap>
        {title}
      </Typography>
    </Toolbar>
    {children}
  </Drawer>
)

export default Sidebar
