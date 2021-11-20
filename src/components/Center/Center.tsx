import React, { FC, ReactNode } from 'react'

import { Box } from '@mui/material'
import { styled } from '@mui/system'

export interface CenterProps {
  children?: ReactNode
  className?: string
}

const FlexBox = styled(Box)(() => ({
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}))

const Center: FC<CenterProps> = ({ children }) => (
  <FlexBox id='center-box'>{children}</FlexBox>
)

export default Center
