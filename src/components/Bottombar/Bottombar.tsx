import React, { FC } from 'react'

import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import CreateIcon from '@mui/icons-material/Create'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PersonIcon from '@mui/icons-material/Person'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { SvgIconProps } from '@mui/material'

import { NavlinksProps } from '../Navlinks/Navlinks'

const iconMap: { [key: string]: (props: SvgIconProps) => JSX.Element } = {
  About: PersonIcon,
  Blog: CreateIcon,
  Tech: CloudQueueIcon,
  Courses: MenuBookIcon,
}

const Bottombar: FC<NavlinksProps> = ({ links = [] }) => (
  <BottomNavigation sx={{ position: 'fixed', bottom: 0, width: '100%' }}>
    {links.map(link => {
      const Icon = iconMap[link.title]
      return (
        <BottomNavigationAction
          key={link.title}
          icon={<Icon color='primary' />}
          label={link.title}
        />
      )
    })}
  </BottomNavigation>
)

export default Bottombar
