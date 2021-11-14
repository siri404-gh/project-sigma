import React, { FC } from 'react'

import { CameraAlt, Cloud, Create, MenuBook, Person } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { SvgIconProps } from '@mui/material'
import Link from 'next/link'

export interface BottombarLinkType {
  title: string
  url: string
  links?: BottombarLinkType[]
}

export interface BottombarProps {
  links?: BottombarLinkType[]
}

export const iconMap: { [key: string]: (props: SvgIconProps) => JSX.Element } =
  {
    About: Person,
    Blog: Create,
    Photos: CameraAlt,
    Tech: Cloud,
    Interview: MenuBook,
  }

const Bottombar: FC<BottombarProps> = ({ links = [], ...rest }) => (
  <BottomNavigation {...rest}>
    {links.map(link => {
      const Icon = iconMap[link.title]
      return (
        <Link key={link.title} href={link.url} passHref>
          <BottomNavigationAction
            className='hover-up'
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
