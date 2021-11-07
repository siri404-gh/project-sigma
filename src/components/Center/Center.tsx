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
  height: 'fill-available',
}))

const Center: FC<CenterProps> = ({ children }) => <FlexBox>{children}</FlexBox>

export default Center
