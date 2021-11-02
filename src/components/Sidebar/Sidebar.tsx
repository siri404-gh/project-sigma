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

const Sidebar: FC<SidebarProps> = ({ children, isOpen, onClose, title }) => (
  <Drawer anchor='right' onClose={onClose} open={isOpen} variant='temporary'>
    <Toolbar>
      <Typography color='textSecondary' variant='h6' noWrap>
        {title}
      </Typography>
    </Toolbar>
    {children}
  </Drawer>
)

export default Sidebar
