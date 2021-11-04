import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
})

export default async function intent(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { client_secret: clientSecret } = await stripe.paymentIntents.create({
      amount: Number(process.env.STRIPE_PAYMENT_VALUE),
      currency: process.env.STRIPE_PAYMENT_CURRENCY || 'usd',
    })
    res.send({
      clientSecret: clientSecret,
    })
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
