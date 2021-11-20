import React, { useState } from 'react'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'

import Center from '@/components/Center/Center'
import Snack from '@/components/Snack/Snack'
import StripeCheckout from '@/components/StripeCheckout/StripeCheckout'

const StyledCard = styled(Card)({
  maxWidth: 280,
  padding: 10,
})

const Premium = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentFailure, setPaymentFailure] = useState<
    string | undefined | null
  >(null)
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const cost = Math.floor(
    +(process.env.NEXT_PUBLIC_STRIPE_PAYMENT_VALUE ?? '99900') / 10000,
  )
  return (
    <Center>
      {paymentSuccess && (
        <Snack onClose={() => setPaymentSuccess(false)} type='success' open>
          Payment Success!
        </Snack>
      )}
      {paymentFailure && (
        <Snack onClose={() => setPaymentFailure(null)} type='error' open>
          {paymentFailure || 'Payment failed!'}
        </Snack>
      )}
      <StyledCard color='secondary'>
        <CardMedia
          alt='Sreeram Padmanabhan'
          component='img'
          image='/img/about.svg'
          title='Sreeram Padmanabhan'
        />
        <CardContent>
          <Typography component='h2' variant='h6' gutterBottom>
            Premium Access
            <span style={{ float: 'right' }}>£ {cost}</span>
          </Typography>
          <Typography variant='caption' gutterBottom>
            Get full access to all courses and features.
          </Typography>
        </CardContent>
        <Elements stripe={promise}>
          <StripeCheckout
            onFailure={msg => {
              setPaymentFailure(msg)
            }}
            onSuccess={() => {
              setPaymentSuccess(true)
              window.location.href = `/api/stripe/callback?returnTo=${router.query.returnTo}`
            }}
          />
        </Elements>
      </StyledCard>
    </Center>
  )
}

export default Premium
