import React, { FC } from 'react'

import { BottomNavigation, BottomNavigationAction } from '@mui/material'

import { NavlinksProps } from '../Navlinks/Navlinks'

const Bottombar: FC<NavlinksProps> = ({ links = [] }) => {
  const getIcon = (title: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={title}
      src={'/img/sections/dev.svg'}
      style={{ height: 25, width: 25, borderRadius: '50%' }}
    />
  )

  return (
    <BottomNavigation>
      {links.map(link => (
        <BottomNavigationAction
          key={link.title}
          icon={getIcon(link.title)}
          label={link.title}
        />
      ))}
    </BottomNavigation>
  )
}

export default Bottombar
