import React, { FC, ReactNode } from 'react'

import { Box } from '@mui/material'
import { styled } from '@mui/system'

export interface CenterProps {
  children?: ReactNode
  className?: string
}

const RelativeBox = styled(Box)({
  position: 'relative',
  height: '100%',
})

const AbsoluteBox = styled(Box)({
  display: 'flex',
  position: 'absolute',
  inset: 0,
})

const CenterBox = styled(Box)({
  margin: 'auto',
})

const Center: FC<CenterProps> = ({ children }) => (
  <RelativeBox>
    <AbsoluteBox>
      <CenterBox>{children}</CenterBox>
    </AbsoluteBox>
  </RelativeBox>
)

export default Center
