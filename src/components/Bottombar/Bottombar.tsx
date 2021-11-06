import React, { FC } from 'react'

import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import CreateIcon from '@mui/icons-material/Create'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PersonIcon from '@mui/icons-material/Person'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { SvgIconProps } from '@mui/material'
import Link from 'next/link'

import { NavlinksProps } from '@/components/Navlinks/Navlinks'

const iconMap: { [key: string]: (props: SvgIconProps) => JSX.Element } = {
  About: PersonIcon,
  Blog: CreateIcon,
  Tech: CloudQueueIcon,
  Courses: MenuBookIcon,
}

const Bottombar: FC<NavlinksProps> = ({ links = [], ...rest }) => (
  <BottomNavigation {...rest}>
    {links.map(link => {
      const Icon = iconMap[link.title]
      return (
        <Link key={link.title} href={link.url} passHref>
          <BottomNavigationAction
            icon={<Icon color='primary' />}
            label={link.title}
            showLabel
          />
        </Link>
      )
    })}
  </BottomNavigation>
)

export default Bottombar
