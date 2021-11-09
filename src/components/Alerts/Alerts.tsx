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
    query: { slug, type = 'info', ...rest },
  } = router

  const onAlertClose = () => {
    const newQuery = { ...(slug && { slug }) }

    router.replace({ pathname, query: newQuery }, undefined, { shallow: true })
  }

  if (!rest) return null

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

  return (
    <Fragment>
      {Object.keys(rest).map((param, index) => (
        <Alert key={index} num={index} onClose={onAlertClose} type={_type}>
          <span style={{ textTransform: 'capitalize' }}>{param}</span>: &nbsp;
          <span style={{ textTransform: 'capitalize' }}>{rest[param]}</span>
        </Alert>
      ))}
    </Fragment>
  )
}

export default Alerts
