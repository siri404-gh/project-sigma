import React, { FC } from 'react'

import { SvgIconComponent } from '@mui/icons-material'
import GitHub from '@mui/icons-material/GitHub'
import Instagram from '@mui/icons-material/Instagram'
import LinkedIn from '@mui/icons-material/LinkedIn'
import Twitter from '@mui/icons-material/Twitter'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'

const iconMap: { [key: string]: SvgIconComponent } = {
  github: GitHub,
  instagram: Instagram,
  linkedin: LinkedIn,
  twitter: Twitter,
}

interface SpeedDialLink {
  name: string
  icon: string
  url: string
}

export interface SpeedDialProps {
  links?: SpeedDialLink[]
}

const _SpeedDial: FC<SpeedDialProps> = ({ links = [] }) => (
  <Box
    sx={{
      height: 320,
      transform: 'translateZ(0px)',
      flexGrow: 1,
      position: 'fixed',
      bottom: { xs: 60, md: 20 },
      right: { xs: 0, md: 30 },
    }}>
    <SpeedDial
      ariaLabel='Sreeram Padmanabhan links'
      FabProps={{
        sx: {
          background: 'white',
        },
      }}
      icon={<SpeedDialIcon color='secondary' />}
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
      }}>
      {links.map(link => {
        if (link.icon in iconMap) {
          const Icon = iconMap[link.icon]
          return (
            <SpeedDialAction
              key={link.name}
              icon={<Icon color='secondary' />}
              tooltipTitle={link.name}
            />
          )
        }
      })}
    </SpeedDial>
  </Box>
)

export default _SpeedDial
