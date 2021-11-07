import React, { FC, ReactNode } from 'react'

import { Snackbar, Alert, AlertProps } from '@mui/material'

const MuiAlert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <Alert ref={ref} elevation={6} variant='filled' {...props} />
))

export interface SnackProps {
  open: boolean
  onClose: () => void
  duration?: number
  children: string | ReactNode
  type?: string
  rest?: any[]
}

const Snack: FC<SnackProps> = ({
  duration,
  open,
  onClose,
  children,
  type = 'info',
  ...rest
}) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    onClose?.()
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={duration || 6000}
      onClose={handleClose}
      open={open}
      {...rest}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <MuiAlert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {children}
      </MuiAlert>
    </Snackbar>
  )
}

export default Snack
