import React, { FC } from 'react'

import { Box, Link as MuiLink } from '@mui/material'
import Link from 'next/link'

import styles from './Navlinks.module.css'

export interface NavlinkRoute {
  title: string
  route: string
}
export interface NavlinkType {
  title: string
  url: string
  routes?: NavlinkRoute[]
}

export interface NavlinksProps {
  links?: NavlinkType[]
}

const Navlinks: FC<NavlinksProps> = ({ links = [] }) => (
  <Box
    component='ul'
    sx={{
      display: { xs: 'none', sm: 'none', md: 'block' },
      listStyle: 'none',
      p: 0,
      m: 0,
    }}>
    {links.map(({ title, url }) => (
      <li key={title} className={styles.li}>
        <Link href={url} passHref>
          <MuiLink color='secondary' underline='none'>
            {title}
          </MuiLink>
        </Link>
      </li>
    ))}
  </Box>
)
export default Navlinks
