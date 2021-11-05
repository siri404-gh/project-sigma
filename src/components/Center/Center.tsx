import React, { FC, ReactNode } from 'react'

import { Box } from '@mui/material'
import { styled } from '@mui/system'

export interface CenterProps {
  children?: ReactNode
  className?: string
}

const FlexBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // 100vh - navbar height - bottombar height - padding
  height: 'calc(100vh - 56px - 56px - 30px)',
  [theme.breakpoints.up('sm')]: {
    // 100vh - navbar height - bottombar height - padding
    height: 'calc(100vh - 64px - 56px - 30px)',
  },
  [theme.breakpoints.up('md')]: {
    // 100vh - navbar height - bottombar height - padding - margin
    height: 'calc(100vh - 64px - 56px - 30px - 20px)',
  },
}))

const Center: FC<CenterProps> = ({ children }) => <FlexBox>{children}</FlexBox>

export default Center
