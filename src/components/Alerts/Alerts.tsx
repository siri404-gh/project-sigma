import React, { useState, Fragment, FC } from 'react'

import { useRouter } from 'next/router'

import Snack from '@/components/Snack/Snack'

interface AlertProps {
  num?: number
  children: React.ReactNode
  type?: string
  onClose: () => void
}

const Alert: FC<AlertProps> = ({ children, num = 0, type, onClose }) => {
  const [isSnackOpen, setIsSnackOpen] = useState(true)
  const rest = {
    sx: { mb: num * 7, minWidth: 250 },
  }

  const onSnackClose = () => {
    setIsSnackOpen(false)
    onClose?.()
  }

  return (
    <Snack onClose={onSnackClose} open={isSnackOpen} type={type} {...rest}>
      {children}
    </Snack>
  )
}

const Alerts = () => {
  const router = useRouter()
  const {
    pathname,
    query,
    query: { payment, type = 'info', ...rest },
  } = router

  const onAlertClose = () => {
    router.replace({ pathname, query: rest }, undefined, { shallow: true })
  }

  let _type = type.toString()

  const allowedTypes = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
  }

  if (!(_type in allowedTypes)) {
    _type = 'info'
  }

  const allowedParams = ['payment']

  return (
    <Fragment>
      {allowedParams.map(
        (param, index) =>
          query[param] && (
            <Alert key={index} num={index} onClose={onAlertClose} type={_type}>
              <span style={{ textTransform: 'capitalize' }}>{param}</span>:
              &nbsp;
              <span style={{ textTransform: 'capitalize' }}>
                {query[param]}
              </span>
            </Alert>
          ),
      )}
    </Fragment>
  )
}

export default Alerts
