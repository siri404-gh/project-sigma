import React from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Center from '@/components/Center/Center'
import StripeCheckout from '@/components/StripeCheckout/StripeCheckout'

const StyledCard = styled(Card)({
  maxWidth: 280,
  padding: 10,
})

const Premium = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

  return (
    <Center>
      <StyledCard color='secondary'>
        <CardActionArea>
          <CardMedia
            alt='Sreeram Padmanabhan'
            component='img'
            image='/img/sections/about.svg'
            title='Sreeram Padmanabhan'
          />
          <CardContent>
            <Typography component='h2' variant='h6' gutterBottom>
              Membership <span style={{ float: 'right' }}>£49</span>
            </Typography>
          </CardContent>
        </CardActionArea>
        <Elements stripe={promise}>
          <StripeCheckout
            onSuccess={() => {
              window.location.href = '/api/stripe/callback'
            }}
          />
        </Elements>
      </StyledCard>
    </Center>
  )
}

export default Premium
