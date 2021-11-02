import React, { FC } from 'react'

import { Box } from '@mui/material'

export interface CenterProps {
  children?: React.ReactNode
  className?: string
}

const Center: FC<CenterProps> = ({ children, className }) => (
  <Box
    sx={{
      position: 'relative',
      height: { xs: 'calc(100% - 57px)', sm: 'calc(100% - 65px)' },
    }}>
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        inset: 0,
      }}>
      <div className={className} style={{ margin: 'auto' }}>
        {children}
      </div>
    </div>
  </Box>
)

export default Center
