import React, { useState, SyntheticEvent } from 'react'

import { Alert, Button, CircularProgress } from '@mui/material'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const getIntent = async () => {
  const _res = await fetch('/api/stripe/intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [],
    }),
  })
  return await _res.json()
}

const StripeCheckout = ({
  onSuccess,
  onFailure,
}: {
  onSuccess: () => void
  onFailure: (msg?: string) => void
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '12px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  const handleChange = async (event: any) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    const { clientSecret } = await getIntent()
    const payload = await stripe.confirmCardPayment(clientSecret, {
      // eslint-disable-next-line camelcase
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    })
    if (payload.error) {
      onFailure?.(payload.error.message)
    } else {
      setSucceeded(true)
      onSuccess?.()
    }
    setProcessing(false)
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <CardElement
        id='card-element'
        onChange={handleChange}
        options={cardStyle}
      />
      <Button
        color='secondary'
        disabled={processing || disabled || succeeded}
        id='submit'
        onClick={handleSubmit}
        variant='contained'
        fullWidth>
        {processing ? <CircularProgress size={20} /> : 'Pay'}
      </Button>
      {error && (
        <Alert severity='error' variant='filled'>
          {error}
        </Alert>
      )}
    </form>
  )
}

export default StripeCheckout
