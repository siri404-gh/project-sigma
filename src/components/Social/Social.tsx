import React, { FC } from 'react'

import { SvgIconComponent } from '@mui/icons-material'
import GitHub from '@mui/icons-material/GitHub'
import Instagram from '@mui/icons-material/Instagram'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Twitter from '@mui/icons-material/Twitter'
import { Box, Link } from '@mui/material'

const styles = {
  social: { padding: 1, fontSize: 0 },
  socialIcon: {
    height: 24,
    width: 24,
  },
}

interface SocialLink {
  name: string
  icon: string
  url: string
}

export interface SocialProps {
  links?: SocialLink[]
}

const iconMap: { [key: string]: SvgIconComponent } = {
  github: GitHub,
  instagram: Instagram,
  linkedin: LinkedIn,
  twitter: Twitter,
}

const Social: FC<SocialProps> = ({ links = [] }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
    }}>
    {links.map(link => {
      if (link.icon in iconMap) {
        const Icon = iconMap[link.icon]
        return (
          <Link
            key={link.url}
            component='a'
            href={link.url}
            rel='noreferrer'
            sx={styles.social}
            target='_blank'>
            <Icon color='secondary' sx={styles.socialIcon} />
            {link.name}
          </Link>
        )
      }
    })}
  </Box>
)

export default Social
