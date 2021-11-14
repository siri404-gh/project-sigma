import React, { useState, MouseEvent, FC, Fragment } from 'react'

import {
  Info,
  GitHub,
  Instagram,
  LinkedIn,
  Twitter,
  SvgIconComponent,
} from '@mui/icons-material'
import { IconButton, Menu, Link, MenuItem } from '@mui/material'

interface InfoMenuLink {
  name: string
  icon: string
  url: string
}

export interface InfoMenuProps {
  links?: InfoMenuLink[]
}

const iconMap: { [key: string]: SvgIconComponent } = {
  github: GitHub,
  instagram: Instagram,
  linkedin: LinkedIn,
  twitter: Twitter,
}

const InfoMenu: FC<InfoMenuProps> = ({ links = [] }) => {
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
          {links.map(link => {
            const Icon = iconMap[link.icon]
            return (
              <MenuItem key={link.name}>
                <Link
                  color='secondary'
                  href={link.url}
                  target='_blank'
                  underline='none'>
                  <Icon />
                </Link>
              </MenuItem>
            )
          })}
        </Menu>
      </IconButton>
    </Fragment>
  )
}

export default InfoMenu
